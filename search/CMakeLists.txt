cmake_minimum_required(VERSION 3.0)

project(BadgerSearch)

set(cpprestsdk_DIR /usr/lib/x86_64-linux-gnu/cmake/)
find_package(cpprestsdk REQUIRED)
find_package(xapian REQUIRED)
find_package(spdlog REQUIRED)

add_definitions(-Wall -std=c++17 -g -O0)
add_executable(badger_search main.cpp SearchService.cpp Search.cpp)
target_link_libraries(badger_search cpprestsdk::cpprest xapian spdlog boost_system)
install(TARGETS badger_search DESTINATION /usr/local/bin)

add_executable(search_tests Search.cpp tests/SearchTest.cpp)
target_link_libraries(search_tests gtest pthread gtest_main cpprestsdk::cpprest xapian stdc++fs)

