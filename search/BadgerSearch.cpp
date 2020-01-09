#include <spdlog/spdlog.h>
#include "BadgerSearch.hpp"

using namespace web;

BadgerSearch::BadgerSearch() : m_db("/mnt/xapiandb", Xapian::DB_CREATE_OR_OPEN), m_worker(&BadgerSearch::worker, this) {
    m_queryparser.set_default_op(Xapian::Query::OP_AND);
    m_queryparser.add_prefix("id", "Q");
    m_queryparser.add_prefix("tag", "K");
    m_queryparser.set_stemmer(Xapian::Stem("en"));
    m_queryparser.set_stemming_strategy(m_queryparser.STEM_SOME);
}

BadgerSearch::~BadgerSearch() {
    http::http_request sentinel(web::http::methods::GET);
    sentinel.set_request_uri("/quit");
    task(std::move(sentinel));
    m_worker.join();
}

void BadgerSearch::task(http::http_request request) {
    std::lock_guard<std::mutex> lock(m_mutex);
    m_queue.emplace(std::move(request));
    m_cv.notify_one();
}

void BadgerSearch::index(http::http_request& request) {
    Xapian::Document doc;
    Xapian::TermGenerator termgenerator;
    termgenerator.set_stemmer(Xapian::Stem("en"));
    termgenerator.set_document(doc);
    auto json = request.extract_json().get();
    auto id = json.at("CardId").as_string();
    auto user = json.at("User").as_string();
    auto tags = json.at("Tags").as_array();
    auto terms = json.at("Text").as_array();
    for (auto tag : tags) {
        termgenerator.index_text(tag.as_string(), 1, "K");
        termgenerator.increase_termpos();
    }
    for (auto tag : tags) {
        termgenerator.index_text(tag.as_string());
        termgenerator.increase_termpos();
    }
    for (auto term : terms) {
        termgenerator.index_text(term.as_string());
        termgenerator.increase_termpos();
    }
    doc.add_value(0, id);
    doc.add_boolean_term("Q" + id);
    doc.add_boolean_term("O" + user);
    m_db.replace_document(id, doc);
    spdlog::info("Finished index card {} for user {}", id, user);
    request.reply(http::status_codes::OK);
}

void BadgerSearch::search(http::http_request& request) {
    auto json = request.extract_json().get();
    Xapian::doccount offset = json.at("Offset").as_integer();
    Xapian::doccount pagesize = json.at("Pagesize").as_integer();
    auto querystring = json.at("Query").as_string();
    auto user = json.at("User").as_string();

    Xapian::Query subquery = m_queryparser.parse_query(querystring, Xapian::QueryParser::FLAG_DEFAULT);
    Xapian::Query owner("O" + user);
    Xapian::Query query(Xapian::Query::OP_FILTER, subquery, owner);
    Xapian::Enquire enquire(m_db);
    enquire.set_query(query);

    std::vector<json::value> documents;
    auto mset = enquire.get_mset(offset, pagesize);
    for (auto it = mset.begin(); it != mset.end(); ++it) {
        documents.emplace_back(it.get_document().get_value(0));
    }
    json::value result;
    result["Result"] = json::value::array(documents);
    request.reply(http::status_codes::OK, result);
    spdlog::info("User {} searched for {}", user, querystring);
}

void BadgerSearch::worker() {
    while (true) {
        http::http_request request;
        {
            std::unique_lock<std::mutex> lock(m_mutex);
            while (m_queue.empty()) {
                m_cv.wait(lock);
            }
            request = std::move(m_queue.front());
            m_queue.pop();
        }
        auto uri = http::uri::decode(request.relative_uri().path());
        auto paths = http::uri::split_path(uri);
        if (paths.size() == 1 && paths[0] == "index") {
            index(request);
        }
        else if (paths.size() == 1 && paths[0] == "search") {
            search(request);
        }
        else if (paths.size() == 1 && paths[0] == "quit") {
            spdlog::info("Worker quits");
            return;
        }
        else {
            spdlog::error("Unknown request {}", uri);
            request.reply(http::status_codes::BadRequest);
        }
    }
}

