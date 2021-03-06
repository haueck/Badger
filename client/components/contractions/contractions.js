const table = {
  "ain't": [ "am not", "are not", "is not", "has not", "have not" ],
  "aren't": [ "are not" ],
  "can't": [ "cannot" ],
  "could've": [ "could have" ],
  "couldn't've": [ "could not have" ],
  "couldn't": [ "could not" ],
  "didn't": [ "did not" ],
  "doesn't": [ "does not" ],
  "don't": [ "do not" ],
  "gonna": [ "going to" ],
  "gotta": [ "got a", "got an", "got to" ],
  "hadn't've": [ "had not have" ],
  "hadn't": [ "had not" ],
  "hasn't": [ "has not" ],
  "haven't": [ "have not" ],
  "he'd've": [ "he would have" ],
  "he'd": [ "he had", "he would" ],
  "he'll": [ "he shall", "he will" ],
  "he's": [ "he has", "he is" ],
  "how'd": [ "how did", "how would" ],
  "how'll": [ "how will" ],
  "how's": [ "how does", "how has", "how is" ],
  "i'd've": [ "i would have" ],
  "i'd": [ "i had", "i would" ],
  "i'll": [ "i shall", "i will" ],
  "i'm": [ "i am" ],
  "i've": [ "i have" ],
  "i'ven't": [ "i have not" ],
  "isn't": [ "is not" ],
  "it'd've": [ "it would have" ],
  "it'd": [ "it would" ],
  "it'll": [ "it shall", "it will" ],
  "it's": [ "it has", "it is" ],
  "let's": [ "let us" ],
  "might've": [ "might have" ],
  "mightn't've": [ "might not have" ],
  "mightn't": [ "might not" ],
  "must've": [ "must have" ],
  "mustn't": [ "must not" ],
  "needn't": [ "need not" ],
  "not've": [ "not have" ],
  "ol'": [ "old" ],
  "oughtn't": [ "ought not" ],
  "shan't": [ "shall not" ],
  "she'd've": [ "she would have" ],
  "she'd": [ "she had", "she would" ],
  "she'll": [ "she shall", "she will" ],
  "she's": [ "she has", "she is" ],
  "should've": [ "should have" ],
  "shouldn't've": [ "should not have" ],
  "shouldn't": [ "should not" ],
  "somebody'd've": [ "somebody would have" ],
  "somebody'd": [ "somebody would", "someone had" ],
  "somebody'll've": [ "somebody will have" ],
  "somebody'll": [ "somebody will" ],
  "somebody's": [ "somebody has", "somebody is" ],
  "someone'd've": [ "someone would have" ],
  "someone'd": [ "someone had", "someone would" ],
  "someone'll": [ "someone will" ],
  "someone's": [ "someone is", "someone has" ],
  "something'd've": [ "something would have" ],
  "something'd": [ "someone would", "something had" ],
  "something'll": [ "something will" ],
  "something's": [ "something has", "something is" ],
  "that'd": [ "that had", "that would" ],
  "that'll": [ "that shall", "that will" ],
  "that's": [ "that has", "that is" ],
  "there'd've": [ "there would have" ],
  "there'd": [ "there had", "there would" ],
  "there're": [ "there are" ],
  "there's": [ "there has", "there is" ],
  "they'd've": [ "they would have" ],
  "they'd": [ "they had", "they would" ],
  "they'll": [ "they shall", "they will" ],
  "they're": [ "they are" ],
  "they've": [ "they have" ],
  "they'ven't": [ "they have not" ],
  "wanna": [ "want a", "want an", "want to" ],
  "wasn't": [ "was not" ],
  "we'd've": [ "we would have" ],
  "we'd": [ "we had", "we would" ],
  "we'dn't've": [ "we would not have" ],
  "we'll": [ "we will" ],
  "we're": [ "we are" ],
  "we've": [ "we have" ],
  "weren't": [ "were not" ],
  "what'd": [ "what did" ],
  "what'll": [ "what shall", "what will" ],
  "what're": [ "what are" ],
  "what's": [ "what does", "what has", "what is" ],
  "what've": [ "what have" ],
  "when's": [ "when has", "when is" ],
  "where'd": [ "where did" ],
  "where're": [ "where are" ],
  "where's": [ "where does", "where has", "where is" ],
  "where've": [ "where have" ],
  "who'd've": [ "who would have" ],
  "who'd": [ "who did", "who had", "who would" ],
  "who'll": [ "who shall", "who will" ],
  "who're": [ "who are" ],
  "who's": [ "who does", "who has", "who is" ],
  "who've": [ "who have" ],
  "why'd": [ "why did" ],
  "why'll": [ "why will" ],
  "why're": [ "why are" ],
  "why's": [ "why does", "why has", "why is" ],
  "why've": [ "why have" ],
  "will've": [ "will have" ],
  "won't've": [ "will not have" ],
  "won't": [ "will not" ],
  "would've": [ "would have" ],
  "wouldn't've": [ "would not have" ],
  "wouldn't": [ "would not" ],
  "y'all'd've": [ "you all would have" ],
  "y'all'dn't've": [ "you all would not have" ],
  "y'all'll've": [ "you all will have" ],
  "y'all'll": [ "you all will" ],
  "y'all've": [ "you all have" ],
  "y'all'ven't": [ "you all have not" ],
  "y'all": [ "you all" ],
  "you'd've": [ "you would have" ],
  "you'd": [ "you had", "you would" ],
  "you'll": [ "you shall", "you will" ],
  "you're": [ "you are" ],
  "you'ren't": [ "you are not" ],
  "you've": [ "you have" ],
  "you'ven't": [ "you have not" ]
}

function findContractions(text) {
  let found = []
  let result = []
  for (let contraction in table) {
    let indices = []
    let index = 0
    while ((index = text.indexOf(contraction, index)) > -1) {
      indices.push(index)
      index = index + contraction.length
    }
    for (let i = 0; i < indices.length; ++i) {
      found.push({ "Index": indices[i], "Contraction": contraction, "Length": contraction.length })
    }
  }
  found.sort((a, b) => (100 * a["Index"] - a["Length"]) - (100 * b["Index"] - b["Length"]))
  for (let i = 0; i < found.length;) {
    result.push(found[i])
    let next = i + 1
    // Take the longest contraction at the current index, e.g. [ "y'all'll've", "y'all'll", "y'all" ]
    while (next < found.length && found[next]["Index"] == found[i]["Index"]) {
      ++next
    }
    // Skip contractions that are substrings of other contractions, e.g. he'll and she'll
    while (next < found.length && found[next]["Index"] < found[i]["Index"] + found[i]["Length"]) {
      ++next
    }
    i = next
  }
  return result
}

function buildGraph(text, indices) {
  let graph = []
  let offset = 0
  for (let i = 0; i < indices.length; ++i) {
    let current = graph.length
    let contractions = table[indices[i]["Contraction"]]
    graph.push({ "Text": text.slice(offset, indices[i]["Index"]), "Edges": [ ] })
    for (let j = 0; j < contractions.length; ++j) {
      graph[current]["Edges"].push(graph.length)
      graph.push({ "Text": contractions[j], "Edges": [ current + contractions.length + 1 ] })
    }
    offset = indices[i]["Index"] + indices[i]["Contraction"].length
  }
  graph.push({ "Text": text.slice(offset), "Edges": [ ] })
  return graph
}

function dfsExpand(graph) {
  let stack = [ 0 ]
  let parents = { 0: null }
  let expanded = []
  while (stack.length > 0) {
    let current = stack.pop()
    if (graph[current]["Edges"].length == 0) {
      let pieces = []
      let node = current
      while (node != null) {
        pieces.push(graph[node]["Text"])
        node = parents[node]
      }
      pieces.reverse()
      expanded.push(pieces.join(""))
    } else {
      for (let node of graph[current]["Edges"]) {
        stack.push(node)
        parents[node] = current
      }
    }
  }
  return expanded
}

export default {
  methods: {
    expand(input) {
      let text = String(input).toLowerCase()
      let indices = findContractions(text)
      let graph = buildGraph(text, indices)
      let expanded = dfsExpand(graph)
      return expanded
    }
  }
}
