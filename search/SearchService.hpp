#include <cpprest/http_listener.h>
#include "Search.hpp"

class SearchService {
public:
    SearchService();
    ~SearchService();
    void task(web::http::http_request request);
    void worker();

private:
    Search m_search;
    std::queue<web::http::http_request> m_queue;
    std::condition_variable m_cv;
    std::thread m_worker;
    std::mutex m_mutex;
};

