#include <xapian.h>
#include <cpprest/http_listener.h>

class BadgerSearch {
public:
    BadgerSearch();
    ~BadgerSearch();
    void task(web::http::http_request request);
    void index(web::http::http_request& request);
    void search(web::http::http_request& request);
    void worker();

private:
    Xapian::WritableDatabase m_db;
    Xapian::QueryParser m_queryparser;
    std::queue<web::http::http_request> m_queue;
    std::condition_variable m_cv;
    std::thread m_worker;
    std::mutex m_mutex;
};

