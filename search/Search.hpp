#include <xapian.h>
#include <cpprest/json.h>

class Search {
public:
    Search(const std::string& path);
    void index(const web::json::value& json);
    web::json::value search(const web::json::value& json);

private:
    Xapian::WritableDatabase m_db;
    Xapian::QueryParser m_queryparser;
};

