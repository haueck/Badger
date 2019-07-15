import natural from "natural"
import irregularverbs from "components/irregularverbs"
import alternatives from "components/alternatives"
import parser from "natural/lib/natural/brill_pos_tagger/lib/TF_Parser.js"
import lexicon from "natural/lib/natural/brill_pos_tagger/data/English/lexicon_from_posjs.json"
import rules from "natural/lib/natural/brill_pos_tagger/data/English/tr_from_posjs.txt"

export default {
  created() {
    let defaultCategory = 'N'
    this.lexicon = new natural.Lexicon(null, defaultCategory)
    this.lexicon.lexicon = lexicon
    this.lexicon.addWord("wading", [ "VBG" ])
    this.lexicon.addWord("lusting", [ "VBG" ])
    this.lexicon.addWord("teasing", [ "VBG" ])
    this.lexicon.addWord("tickling", [ "VBG" ])
    this.lexicon.addWord("thronging", [ "VBG" ])
    this.lexicon.addWord("lusted", [ "VBN", "VBD" ])
    this.lexicon.addWord("copped", [ "VBN", "VBD" ])
    this.lexicon.addWord("preyed", [ "VBN", "VBD" ])
    this.lexicon.addWord("breezed", [ "VBN", "VBD" ])
    this.lexicon.addWord("creeped", [ "VBN", "VBD" ])
    this.lexicon.addWord("scarfed", [ "VBN", "VBD" ])
    this.lexicon.addWord("quarried", [ "VBN", "VBD" ])
    this.lexicon.addWord("thronged", [ "VBN", "VBD" ])
    this.lexicon.addWord("vaccinated", [ "VBN", "VBD" ])
    this.lexicon.addWord("sensationalized", [ "VBN", "VBD" ])
    this.lexicon.addWord("vaccination", [ "NN" ])
    this.lexicon.addWord("enormities", [ "NNS" ])
    this.lexicon.addWord("vaccinations", [ "NNS" ])
    this.lexicon.addWord("sobers", [ "VBZ" ])
    this.rules = new natural.RuleSet()
    this.rules.rules = parser.parse(rules)
    this.tagger = new natural.BrillPOSTagger(this.lexicon, this.rules)
    //this.tokenizer = new natural.WordPunctTokenizer()
    let patterns = []
    patterns.push("(?:[A-zÀ-ÿąćęłńóśźż-]+['’](?=[^A-zÀ-ÿąćęłńóśźż-]|$))")
    patterns.push("(?:[A-zÀ-ÿąćęłńóśźż-]+['’][A-zÀ-ÿąćęłńóśźż-]+)")
    patterns.push("[A-zÀ-ÿąćęłńóśźż-]+")
    patterns.push("[€$]?[0-9._]+[%sdp]?")
    patterns.push("[0-9]+(?:st|nd|rd)\b")
    patterns.push(".|!|\\?|\"|:|;|,|-")
    var re = new RegExp("(" + patterns.join("|") + ")", "i");
    this.tokenizer = new natural.RegexpTokenizer({ pattern: re })
  },
  mixins: [ irregularverbs, alternatives ],
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
      else if (word == "bias") {
        return "bias"
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
        for (let alternative of this.alternatives(phrase)) {
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
      let conceal = words.map(word => word.toLowerCase())//.filter(word => !word.match(/^a|the$/))
      //console.log(tags)
      let concealed = []
      for (let i = 0; i < tags.length; ++i) {
        let matched = false
        let { baseform, irregular } = this.baseform(tags[i].token)
        let stem = this.stem(baseform, tags[i].tag)
        for (let word of conceal) {
          /*if (tags[i].token == "scoffed") {
            console.log(stem, ", ", this.stem(word), ",", irregular)
            console.log(this.stem(tags[i].token, tags[i].tag))
          }*/
          if (tags[i].tag == "PRP$" && word.match(/^(?:someone|one|somebody|sb)'s$/)) {
            concealed.push("~")
          }
          else if (word == "oneself" && tags[i].tag == "PRP" && tags[i].token.match(/sel(?:f|ves)$/)) {
            concealed.push("~")
          }
          else if (tags[i].token == word) {
            concealed.push("~")
          }
          else if (stem == this.stem(word)) {
            if (tags[i].tag == "VBG") {
              concealed.push("~ing")
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
        else if (token == "(" || token == "[" || token == "“") {
          result = result + space + token
          space = ""
        }
        else if (token == "/") {
          result = result + token
          space = ""
        }
        else if (token.match(/^[…?!,.;:)\]”]$/)) {
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

/*
  "!": "Exclamation mark",
  "$": "Dollar sign",
  "(": "Left paren",
  ")": "Right paren",
  ":": "Mid-sent punctuation",
  ",": "Comma",
  ";": "Semicolon",
  ".": "Sent-final punctuation",
  "#": "Pound sign",
  "``": "Quote",
  "SYM": "Symbol",
  "CC": "Coordinating conjunction",
  "DT": "Determiner",
  "EX": "Existential there",
  "FW": "Foreign Word",
  "IN": "Preposition",
  "JJ": "Adjective",
  "JJS": "Adjective, superlative",
  "JJR": "Adjective, comparative",
  "LS": "List item marker",
  "MD": "Modal",
  "NN": "Noun, singular or mass",
  "NNS": "Noun, plural",
  "NNP": "Proper Noun, singular",
  "NNPS": "Proper noun, plural",
  "PDT": "Predeterminer",
  "POS": "Possessive ending",
  "PRP": "Personal pronoun",
  "PRP$": "Possessive pronoun",
  "RB": "Adverb",
  "RBS": "Adverb, superlative",
  "RBR": "Adverb, comparative",
  "RP": "Particle",
  "TO": "\"to\"",
  "UH": "Interjection",
  "VB": "Verb, base form",
  "VBD": "Verb, past tense",
  "VBG": "Verb, present participle/gerund",
  "VBN": "Verb, past participle",
  "VBP": "Verb, non 3rd person, singular, present",
  "VBZ": "Verb, 3rd singular present",
  "WDT": "Wh-determiner",
  "WRB": "Wh-adverb",
  "WP": "Wh-pronoun",
  "WP$": "Possessive-Wh"
*/
