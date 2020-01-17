FROM ubuntu:bionic

ADD / /badger-search
ADD https://github.com/gabime/spdlog/archive/v1.4.2.tar.gz /
RUN apt-get update && apt-get install -y build-essential cmake libcpprest-dev libxapian-dev libgtest-dev
RUN tar -xzf /v1.4.2.tar.gz && cd `mktemp -d` && cmake /spdlog-1.4.2 && make -j 2 install
RUN cd `mktemp -d` && cmake /usr/src/googletest/googletest && make -j 2 install
RUN cd `mktemp -d` && cmake /badger-search && make -j 2 install && ./search_tests

FROM ubuntu:bionic

RUN apt-get update && apt-get install -y libcpprest2.10 libxapian30 dumb-init
COPY --from=0 /usr/local/bin/badger_search /usr/local/bin/badger_search
ENTRYPOINT [ "dumb-init", "/usr/local/bin/badger_search" ]
EXPOSE 8080

