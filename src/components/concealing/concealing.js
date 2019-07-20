import natural from "natural"
import dictionary from "components/dictionary"
import alternatives from "components/alternatives"
import parser from "natural/lib/natural/brill_pos_tagger/lib/TF_Parser.js"
import lexicon from "natural/lib/natural/brill_pos_tagger/data/English/lexicon_from_posjs.json"
import rules from "natural/lib/natural/brill_pos_tagger/data/English/tr_from_posjs.txt"

// https://www.ling.upenn.edu/courses/Fall_2003/ling001/penn_treebank_pos.html

export default {
  created() {
    let defaultCategory = "N"
    this.lexicon = new natural.Lexicon(null, defaultCategory)
    this.lexicon.lexicon = lexicon
    this.lexicon.addWord("wading", [ "VBG" ])
    this.lexicon.addWord("lusting", [ "VBG" ])
    this.lexicon.addWord("teasing", [ "VBG" ])
    this.lexicon.addWord("vetting", [ "VBG" ])
    this.lexicon.addWord("cuddling", [ "VBG" ])
    this.lexicon.addWord("tickling", [ "VBG" ])
    this.lexicon.addWord("flogging", [ "VBG" ])
    this.lexicon.addWord("analysing", [ "VBG" ])
    this.lexicon.addWord("thronging", [ "VBG" ])
    this.lexicon.addWord("germinating", [ "VBG" ])
    this.lexicon.addWord("coped", [ "VBN", "VBD" ])
    this.lexicon.addWord("pigged", [ "VBN", "VBD" ])
    this.lexicon.addWord("souped", [ "VBN", "VBD" ])
    this.lexicon.addWord("lusted", [ "VBN", "VBD" ])
    this.lexicon.addWord("copped", [ "VBN", "VBD" ])
    this.lexicon.addWord("ramped", [ "VBN", "VBD" ])
    this.lexicon.addWord("preyed", [ "VBN", "VBD" ])
    this.lexicon.addWord("clammed", [ "VBN", "VBD" ])
    this.lexicon.addWord("breezed", [ "VBN", "VBD" ])
    this.lexicon.addWord("creeped", [ "VBN", "VBD" ])
    this.lexicon.addWord("scarfed", [ "VBN", "VBD" ])
    this.lexicon.addWord("quarried", [ "VBN", "VBD" ])
    this.lexicon.addWord("thronged", [ "VBN", "VBD" ])
    this.lexicon.addWord("mortified", [ "VBN", "VBD" ])
    this.lexicon.addWord("chickened", [ "VBN", "VBD" ])
    this.lexicon.addWord("vaccinated", [ "VBN", "VBD" ])
    this.lexicon.addWord("sensationalized", [ "VBN", "VBD" ])
    this.lexicon.addWord("vaccination", [ "NN" ])
    this.lexicon.addWord("rashers", [ "NNS" ])
    this.lexicon.addWord("enquiries", [ "NNS" ])
    this.lexicon.addWord("enormities", [ "NNS" ])
    this.lexicon.addWord("undulations", [ "NNS" ])
    this.lexicon.addWord("vaccinations", [ "NNS" ])
    this.lexicon.addWord("interrogations", [ "NNS" ])
    this.lexicon.addWord("refurbishments", [ "NNS" ])
    this.lexicon.addWord("sobers", [ "VBZ" ])
    this.lexicon.addWord("meshes", [ "VBZ" ])
    this.lexicon.addWord("rehashes", [ "VBZ" ])
    this.rules = new natural.RuleSet()
    this.rules.rules = parser.parse(rules)
    this.tagger = new natural.BrillPOSTagger(this.lexicon, this.rules)
    let patterns = []
    patterns.push("(?:[A-zÀ-ÿąćęłńóśźż-]+s['’](?=[^A-zÀ-ÿąćęłńóśźż-]|$))")
    patterns.push("(?:[A-zÀ-ÿąćęłńóśźż-]+['’][A-zÀ-ÿąćęłńóśźż-]+)")
    patterns.push("[A-zÀ-ÿąćęłńóśźż-]+")
    patterns.push("[€$£]?[0-9]+[.,%0-9A-zÀ-ÿąćęłńóśźż-]*")
    patterns.push(".|!|\\?|\"|:|;|,|-")
    let re = new RegExp("(" + patterns.join("|") + ")", "i")
    this.tokenizer = new natural.RegexpTokenizer({ pattern: re })
  },
  mixins: [ dictionary, alternatives ],
  methods: {
    stem(word, tag = "") {
      if (word == "goes") {
        return "go"
      }
      else if (word == "does") {
        return "do"
      }
      else if (word == "frolicking") {
        return "frolic"
      }
      else if (word == "interfering") {
        return "interfer"
      }
      else if (word == "bias") {
        return "bias"
      }
      else if (tag == "JJR") {
        return natural.PorterStemmer.stem(word.replace(/r$/, ""))
      }
      else if (tag == "JJS") {
        return natural.PorterStemmer.stem(word.replace(/st$/, ""))
      }
      else if (tag == "RB") {
        return natural.PorterStemmer.stem(word.replace(/ly$/, ""))
      }
      else {
        return natural.PorterStemmer.stem(word)
      }
    },
    prepareWords(phrases) {
      let result = []
      let index = {}
      for (let phrase of phrases) {
        let stripped = phrase.replace(/[…?!,.;:[\]“”‘’]/g, "")
        for (let alternative of this.alternatives(stripped)) {
          for (let word of alternative.split(" ")) {
            if (!(word in index)) {
              result.push(word)
              index[word] = true
            }
          }
        }
      }
      return result
    },
    concealWords(sentence, words) {
      let tokens = this.tokenizer.tokenize(sentence)
      let tags = this.tagger.tag(tokens.map(token => token.toLowerCase())).taggedWords
      let conceal = words.map(word => word.toLowerCase())
      let concealed = []
      for (let i = 0; i < tags.length; ++i) {
        let matched = false
        let { baseform, irregular } = this.baseform(tags[i].token)
        let stem = this.stem(baseform, tags[i].tag)
        for (let word of conceal) {
          if (tags[i].tag == "PRP$" && word.match(/^(?:someone|one|somebody|sb)'s$/)) {
            concealed.push("~")
          }
          else if ((word == "oneself" || word == "yourself") && tags[i].tag == "PRP" && tags[i].token.match(/sel(?:f|ves)$/)) {
            concealed.push("~")
          }
          else if (tags[i].token == word) {
            concealed.push("~")
          }
          else if (stem == this.stem(word)) {
            if (tags[i].tag == "VBG") {
              concealed.push("~ing")
            }
            else if (tags[i].tag == "JJ" && tags[i].token.match(/ing$/)) {
              // Present participle confused with adjective
              concealed.push("~ing")
            }
            else if (tags[i].tag == "JJ" && tags[i].token.match(/ed$/)) {
              // Past tense confused with adjective
              concealed.push("~ed")
            }
            else if (tags[i].tag == "JJR" && tags[i].token.match(/er$/)) {
              concealed.push("~er")
            }
            else if (tags[i].tag == "JJS" && tags[i].token.match(/est$/)) {
              concealed.push("~est")
            }
            else if (!irregular && (tags[i].tag == "VBN" || tags[i].tag == "VBD")) {
              concealed.push("~ed")
            }
            else if (tags[i].tag == "RB" && tags[i].token.match(/ly$/)) {
              concealed.push("~ly")
            }
            else if (tags[i].tag == "VBZ") {
              concealed.push("~s")
            }
            else if (tags[i].tag == "NNS") {
              concealed.push("~s")
            }
            else {
              concealed.push("~")
            }
          }
          else {
            continue
          }
          matched = true
          break
        }
        if (!matched) {
          concealed.push(tokens[i])
        }
      }
      let space = ""
      let result = ""
      let counters = { "'": 0, "\"": 0 }
      for (let token of concealed) {
        if (token.length == 1) {
          if (token == "'" || token == "\"") {
            counters[token]++
            if (counters[token] % 2 == 1) {
              result = result + space + token
              space = ""
            }
            else {
              result = result + token
              space = " "
            }
          }
          else if (token == "/") {
            result = result + token
            space = ""
          }
          else if (token.match(/[([“‘]/)) {
            result = result + space + token
            space = ""
          }
          else if (token.match(/[…?!,.;:)\]”’]/)) {
            result = result + token
            space = " "
          }
          else {
            result = result + space + token
            space = " "
          }
        }
        else if (token == "...") {
          result = result + token
          space = " "
        }
        else {
          result = result + space + token
          space = " "
        }
      }
      return result
    }
  }
}
