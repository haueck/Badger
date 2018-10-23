export default {
  methods: {
    contractions(text) {
      if (!text) {
        return ""
      }
      let phrases = []
      for (let pronoun of [ "you", "they", "we" ]) {
        phrases.push([ pronoun + " are not", pronoun + " aren't", pronoun + "'re not" ])
        phrases.push([ pronoun + " are", pronoun + "'re" ])
      }
      for (let pronoun of [ "he", "she", "it", "this", "that", "there" ]) {
        phrases.push([ pronoun + " is not", pronoun + " isn't", pronoun + "'s not" ])
        phrases.push([ pronoun + " is", pronoun + "'s" ])
      }
      for (let pronoun of [ "i", "you", "they", "we" ]) {
        phrases.push([ pronoun + " have not", pronoun + " haven't", pronoun + "'ve not" ])
        phrases.push([ pronoun + " have", pronoun + "'ve" ])
      }
      for (let pronoun of [ "he", "she", "it" ]) {
        phrases.push([ pronoun + " has not", pronoun + " hasn't", pronoun + "'s not" ])
        phrases.push([ pronoun + " has", pronoun + "'s" ])
      }
      for (let pronoun of [ "i", "you", "he", "she", "it", "they", "we" ]) {
        phrases.push([ pronoun + " had not", pronoun + " hadn't", pronoun + "'d not" ])
        phrases.push([ pronoun + " had", pronoun + "'d" ])
      }
      for (let pronoun of [ "i", "you", "he", "she", "it", "they", "we" ]) {
        phrases.push([ pronoun + " will not", pronoun + " won't", pronoun + "'ll not" ])
        phrases.push([ pronoun + " will", pronoun + "'ll" ])
      }
      for (let pronoun of [ "i", "you", "he", "she", "it", "they", "we" ]) {
        phrases.push([ pronoun + " would not", pronoun + " wouldn't", pronoun + "'d not" ])
        phrases.push([ pronoun + " would", pronoun + "'d" ])
      }
      phrases.push(
        [ "I am", "I'm" ],
        [ "are not", "aren't" ],
        [ "will not", "won't" ],
        [ "shall not", "shan't" ],
        [ "do not", "don't" ],
        [ "does not", "doesn't" ],
        [ "did not", "didn't" ],
        [ "have not", "haven't" ],
        [ "has not", "hasn't" ],
        [ "had not", "hadn't" ],
        [ "can not", "can't", "cannot" ],
        [ "cannot", "can't", "can not" ],
        [ "could not", "couldn't" ],
        [ "must not", "mustn't" ],
        [ "need not", "needn't" ],
        [ "would not", "wouldn't" ],
        [ "should not", "shouldn't" ],
        [ "ought not to", "oughtn't to" ],
        [ "was not", "wasn't" ],
        [ "were not", "weren't" ]
      )
      for (let phrase of phrases) {
        let re = new RegExp("(?<!\\{)\\b" + phrase[0] + "\\b(?!\\})", "gi")
        text = text.replace(re, "{" + phrase.join("}/{") + "}")
      }
      return text.replace(/{/g, "(").replace(/}/g, ")")
    }
  }
}
