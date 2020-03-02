#include <spdlog/spdlog.h>
#include "SearchService.hpp"

using namespace web;

SearchService::SearchService() : m_search("/mnt/xapiandb"), m_worker(&SearchService::worker, this) {}

SearchService::~SearchService() {
    http::http_request sentinel(web::http::methods::GET);
    sentinel.set_request_uri("/quit");
    task(std::move(sentinel));
    m_worker.join();
}

void SearchService::task(http::http_request request) {
    std::lock_guard<std::mutex> lock(m_mutex);
    m_queue.emplace(std::move(request));
    m_cv.notify_one();
}

void SearchService::worker() {
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
            try {
                auto json = request.extract_json().get();
                m_search.index(json);
                request.reply(http::status_codes::OK);
            }
            catch (std::exception& e) {
                spdlog::error("Indexing failed: {}", e.what());
                request.reply(http::status_codes::BadRequest);
            }
        }
        else if (paths.size() == 1 && paths[0] == "remove") {
            try {
                auto json = request.extract_json().get();
                m_search.remove(json);
                request.reply(http::status_codes::OK);
            }
            catch (std::exception& e) {
                spdlog::error("Failed to remove a card: {}", e.what());
                request.reply(http::status_codes::BadRequest);
            }
        }
        else if (paths.size() == 1 && paths[0] == "search") {
            try {
                auto json = request.extract_json().get();
                auto response = m_search.search(json);
                request.reply(http::status_codes::OK, response);
            }
            catch (std::exception& e) {
                spdlog::error("Searching failed: {}", e.what());
                request.reply(http::status_codes::BadRequest);
            }
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
