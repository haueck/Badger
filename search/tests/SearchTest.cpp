#include <experimental/filesystem>
#include <spdlog/spdlog.h>
#include <gtest/gtest.h>
#include "../Search.hpp"

using namespace web;

class Fixture : public ::testing::Test {
public:
    Fixture() : directory(mkdtemp(tmpl.data())), search(directory) {
        spdlog::set_level(spdlog::level::err);
    }

    ~Fixture() {
        std::experimental::filesystem::remove_all(directory);
    }

    void query(std::string user, std::string querystring, std::vector<std::string> expected) {
        auto request = prepare_query(user, querystring);
        auto response = search.search(request);
        auto cards = response["Results"].as_array();
        int size = cards.size();
        ASSERT_EQ(size, expected.size());
        std::vector<std::string> received(size);
        for (int i = 0; i < size; ++i) {
            received[i] = cards[i].as_string();
        }
        std::sort(received.begin(), received.end());
        std::sort(expected.begin(), expected.end());
        for (int i = 0; i < size; ++i) {
            EXPECT_EQ(received[i], expected[i]);
        }
    }

    json::value json_array(const std::vector<std::string>& list) {
        std::vector<json::value> result;
        for (auto value : list) {
            result.emplace_back(json::value::string(value));
        }
        return json::value::array(result);
    }

    void index(std::string user, std::string id, std::vector<std::string> tags, std::vector<std::string> text) {
        json::value request;
        request["User"] = json::value::string(user);
        request["CardId"] = json::value::string(id);
        request["Tags"] = json_array(tags);
        request["Text"] = json_array(text);
        search.index(request);
    }

    json::value prepare_query(std::string user, std::string query, int offset = 0, int pagesize = 10) {
        json::value request;
        request["User"] = json::value::string(user);
        request["Query"] = json::value::string(query);
        request["Offset"] = offset;
        request["Pagesize"] = pagesize;
        return request;
    }

    std::string tmpl{"/tmp/tmp.XXXXXX"};
    std::string directory;
    Search search;
};

TEST_F(Fixture, SimpleQuery) {
    index("test", "Ad1r5", {}, { "earth" });
    query("test", "earth", { "Ad1r5" });
}

TEST_F(Fixture, EmptyResults) {
    index("test", "Ad1r5", {}, { "earth" });
    query("test", "globe", {});
}

TEST_F(Fixture, AndOperator) {
    index("test", "Ad1r5", {}, { "clouds in the sky" });
    query("test", "cloud sky", { "Ad1r5" });
    query("test", "cloud rain", {});
}

TEST_F(Fixture, SearchingByTags) {
    index("test", "Ad1r5", { "venus" }, { "mars" });
    index("test", "Ad1r6", {}, { "venus" });
    query("test", "venus", { "Ad1r5", "Ad1r6" });
    query("test", "tag:venus", { "Ad1r5" });
}

TEST_F(Fixture, PhraseMatch) {
    index("test", "Ad1r5", {}, { "mercury venus earth mars" });
    index("test", "Ad1r6", {}, { "mars earth venus mercury" });
    query("test", "\"venus earth\"", { "Ad1r5" });
}

TEST_F(Fixture, TagExactMatch) {
    index("test", "Ad1r5", { "rocky planets" }, { "mercury venus earth mars" });
    index("test", "Ad1r6", { "planets that are rocky" }, { "mars earth venus mercury" });
    query("test", "tag:\"rocky planets\"", { "Ad1r5" });
}

TEST_F(Fixture, Updating) {
    index("test", "[]!@#$%^&*()", {}, { "earth" });
    query("test", "earth", { "[]!@#$%^&*()" });
    index("test", "[]!@#$%^&*()", {}, { "sun" });
    query("test", "earth", {});
    query("test", "sun", { "[]!@#$%^&*()" });
}

TEST_F(Fixture, UsersSeparation) {
    index("tes", "Ad1r0", {}, { "earth" });
    index("test", "Ad1r1", {}, { "earth" });
    index("TEST", "Ad1r2", {}, { "earth" });
    index("Test", "Ad1r3", {}, { "earth" });
    index("tESt", "Ad1r4", {}, { "earth" });
    index("1tESt", "Ad1r5", {}, { "earth" });
    index("tESt0", "Ad1r6", {}, { "earth" });
    index("t1ESt", "Ad1r7", {}, { "earth" });
    index("2tESt", "Ad1r8", {}, { "earth" });
    index("-(&", "Ad1r9", {}, { "earth" });
    index("#abc", "Ad1r10", {}, { "earth" });
    index("@abc", "Ad1r11", {}, { "earth" });
    index("abc(", "Ad1r12", {}, { "earth" });
    index("abc)", "Ad1r13", {}, { "earth" });
    query("tes", "earth", { "Ad1r0" });
    query("test", "earth", { "Ad1r1" });
    query("TEST", "earth", { "Ad1r2" });
    query("Test", "earth", { "Ad1r3" });
    query("tESt", "earth", { "Ad1r4" });
    query("1tESt", "earth", { "Ad1r5" });
    query("tESt0", "earth", { "Ad1r6" });
    query("t1ESt", "earth", { "Ad1r7" });
    query("2tESt", "earth", { "Ad1r8" });
    query("-(&", "earth", { "Ad1r9" });
    query("#abc", "earth", { "Ad1r10" });
    query("@abc", "earth", { "Ad1r11" });
    query("abc(", "earth", { "Ad1r12" });
    query("abc)", "earth", { "Ad1r13" });
}
