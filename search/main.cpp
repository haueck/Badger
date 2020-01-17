#include <csignal>
#include <spdlog/spdlog.h>
#include <spdlog/sinks/stdout_sinks.h>
#include <cpprest/http_listener.h>
#include "SearchService.hpp"

int main() {
    auto logger = spdlog::stdout_logger_mt("logger");
    spdlog::set_default_logger(logger);
    spdlog::set_level(spdlog::level::info);
    std::signal(SIGINT, [](int){});
    std::signal(SIGTERM, [](int){});
    try {
        spdlog::info("Starting Search Service");
        SearchService service;
        web::http::experimental::listener::http_listener listener("http://0.0.0.0:8080");
        listener.support(web::http::methods::GET, [&service](web::http::http_request request) { service.task(std::move(request)); });
        listener.support(web::http::methods::POST, [&service](web::http::http_request request) { service.task(std::move(request)); });
        listener.open().wait();
        pause();
        listener.close().wait();
    } catch (std::exception& e) {
        spdlog::critical("Search Service crashed: {}", e.what());
        return 1;
    }
    spdlog::info("Closing Search Service");
}

