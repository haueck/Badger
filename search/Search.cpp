#include <spdlog/spdlog.h>
#include "Search.hpp"

Search::Search(const std::string& path) : m_db(path, Xapian::DB_CREATE_OR_OPEN) {
    m_queryparser.set_default_op(Xapian::Query::OP_AND);
    m_queryparser.add_prefix("tag", "K");
    m_queryparser.set_stemmer(Xapian::Stem("en"));
    m_queryparser.set_stemming_strategy(m_queryparser.STEM_SOME);
}

void Search::index(const web::json::value& json) {
    Xapian::Document doc;
    Xapian::TermGenerator termgenerator;
    termgenerator.set_stemmer(Xapian::Stem("en"));
    termgenerator.set_document(doc);
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
    doc.add_boolean_term("O" + user);
    auto docid = m_db.get_metadata(id);
    if (docid.empty()) {
        auto did = m_db.add_document(doc);
        m_db.set_metadata(id, std::to_string(did));
    }
    else {
        m_db.replace_document(std::stoul(docid), doc);
    }
    m_db.commit();
    spdlog::info("Finished indexing card {} for user {}", id, user);
}

web::json::value Search::search(const web::json::value& json) {
    Xapian::doccount offset = json.at("Offset").as_integer();
    Xapian::doccount pagesize = json.at("Pagesize").as_integer();
    auto querystring = json.at("Query").as_string();
    auto user = json.at("User").as_string();

    Xapian::Query subquery = m_queryparser.parse_query(querystring, Xapian::QueryParser::FLAG_DEFAULT);
    Xapian::Query owner("O" + user);
    Xapian::Query query(Xapian::Query::OP_FILTER, subquery, owner);
    Xapian::Enquire enquire(m_db);
    enquire.set_query(query);

    std::vector<web::json::value> documents;
    auto mset = enquire.get_mset(offset, pagesize);
    for (auto it = mset.begin(); it != mset.end(); ++it) {
       documents.emplace_back(it.get_document().get_value(0));
    }
    web::json::value results;
    results["Matches"] = mset.get_matches_estimated();
    results["Results"] = web::json::value::array(documents);
    spdlog::info("User {} searched for {}", user, querystring);
    return results;
}
