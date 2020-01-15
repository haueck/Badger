import parse from "parenthesis"

function addEmpty(tokens) {
  for (let i = 0; i + 2 < tokens.length; i = i + 2) {
    addEmpty(tokens[i + 1])
    if (tokens[i].match(/(?:^|[^/])\($/) && tokens[i + 2].match(/^\)(?!\/)/)) {
      tokens.splice(i + 2, 0, ")/(", [ "" ])
    }
  }
}

function unify(text) {
  // smart/tough cookie => (smart)/(tough) cookie
  // a stitch in time (saves nine) => a stitch in time (saves nine)/()
  text = text.replace(/\s*\/\s*/g, "/").replace(/\/([^(][^\s()/]*)/g, "/($1)").replace(/([^\s()/]*[^)])\//g, "($1)/")
  let tokens = parse(text, { brackets: ["()"] })
  addEmpty(tokens)
  return tokens
}

function addNode(graph, value) {
  let text = value.replace(/^\)\s*/, "").replace(/\s*\($/, "")
  graph.push({ "Text": text, "Edges": [ ] })
}

function buildGraph(graph, tokens, previous) {
  let alternatives = []
  for (let i = 0; i < tokens.length; ++i) {
    if ("string" == typeof tokens[i]) {
      if (tokens[i] == ")/(") {
        alternatives.push(graph.length - 1)
      } else {
        addNode(graph, tokens[i])
        if (alternatives.length > 0) {
          while (alternatives.length > 0) {
            graph[alternatives.pop()]["Edges"].push(graph.length - 1)
          }
          graph[graph.length - 2]["Edges"].push(graph.length - 1)
          previous.length = 0
        } else {
          while (previous.length > 0) {
            graph[previous.pop()]["Edges"].push(graph.length - 1)
          }
        }
        previous.push(graph.length - 1)
      }
    } else {
      buildGraph(graph, tokens[i], previous.slice())
    }
  }
}

function dfs(graph, alternatives, path, current) {
  path.push(current)
  if (graph[current]["Edges"].length == 0) {
    let alternative = ""
    for (let node of path) {
      alternative += " " + graph[node]["Text"]
    }
    alternatives.push(alternative)
  } else {
    for (let node of graph[current]["Edges"]) {
      dfs(graph, alternatives, path, node)
    }
  }
  path.pop()
}

function generateAlternatives(graph) {
  let alternatives = []
  let path = []
  dfs(graph, alternatives, path, 0)
  let cleaned = []
  for (let alternative of alternatives) {
    cleaned.push(alternative.replace(/\s{2,}/g, " ").replace(/^\s/, "").replace(/\s$/, "").toLowerCase())
  }
  return cleaned
}

export default {
  methods: {
    alternatives(input) {
      let text = String(input)
      let tokens = unify(text)
      let graph = []
      addNode(graph, "")
      buildGraph(graph, tokens, [ 0 ])
      return generateAlternatives(graph)
    }
  }
}
