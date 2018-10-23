import alternatives from "../components/alternatives"
import { shallowMount } from "@vue/test-utils"

let testcases = [
  { "Input": "", "Expected": [""] },
  { "Input": "abc", "Expected": ["abc"] },
  { "Input": "(the)", "Expected": ["", "the"] },
  { "Input": "(a) (b)", "Expected": ["", "a", "b", "a b"] },
  { "Input": "(he) was an only child", "Expected": ["was an only child", "he was an only child"] },
  { "Input": "Robert Downey (Jr)", "Expected": ["robert downey", "robert downey jr"] },
  { "Input": "Helena (Bonham) Carter", "Expected": ["helena bonham carter", "helena carter"] },
  { "Input": "(Francis) Scott (Key) Fitzgerald", "Expected": ["scott fitzgerald", "scott key fitzgerald", "francis scott key fitzgerald", "francis scott fitzgerald"] },
  { "Input": "(It was because) it was a bargain I bought it", "Expected": ["it was because it was a bargain i bought it", "it was a bargain i bought it"] },
  { "Input": "Miles (Dewey) Davis (III)", "Expected": ["miles dewey davis", "miles dewey davis iii", "miles davis", "miles davis iii"] },
  { "Input": "always/continually interrupting me", "Expected": ["always interrupting me", "continually interrupting me"] },
  { "Input": "Alpy Pennińskie/Walijskie", "Expected": ["alpy pennińskie", "alpy walijskie"] },
  { "Input": "Half the time I get a phone call it's a/the wrong number", "Expected": ["half the time i get a phone call it's a wrong number", "half the time i get a phone call it's the wrong number"] },
  { "Input": "suppose/supposing/imagine", "Expected": ["imagine", "supposing", "suppose"] },
  { "Input": "(Mount Everest)/Czomolungma", "Expected": ["czomolungma", "mount everest"] },
  { "Input": "would/(used to) follow", "Expected": ["would follow", "used to follow"] },
  { "Input": "(Dolina Aosty)/(Valle d'Aosta)", "Expected": ["dolina aosty", "valle d'aosta"] },
  { "Input": "(I'm)/(I am) leaving", "Expected": ["i am leaving", "i'm leaving"] },
  { "Input": "the film finishes/ends (we will)/we'll have to leave", "Expected": ["the film ends we will have to leave", "the film ends we'll have to leave", "the film finishes we'll have to leave", "the film finishes we will have to leave"] },
  { "Input": "cannot/can't/(can not)", "Expected": ["cannot", "can not", "can't"] },
  { "Input": "establish/develop/build/have/form", "Expected": ["form", "have", "develop", "build", "establish"] },
  { "Input": "because/ as/since/for", "Expected": ["as", "because", "since", "for"] },
  { "Input": "(demand for)/(desire for) /(interest in)", "Expected": ["interest in", "demand for", "desire for"] },
  { "Input": "(response to) / (view of)/ (line with)", "Expected": ["response to", "view of", "line with"] },
  { "Input": "firm/fixed/ set views/opinions", "Expected": ["set views", "firm views", "fixed views", "set opinions", "fixed opinions", "firm opinions"] },
  { "Input": "nature /titles of", "Expected": ["titles of", "nature of"] },
  { "Input": "house / home", "Expected": ["house", "home"] },
  { "Input": "ideomotor (effect/phenomenon)", "Expected": ["ideomotor effect", "ideomotor phenomenon", "ideomotor"] },
  { "Input": "I've/(I have) been sneezing (a lot (lately/recently))", "Expected": ["i've been sneezing a lot recently", "i've been sneezing", "i've been sneezing a lot lately", "i have been sneezing a lot recently", "i have been sneezing", "i have been sneezing a lot", "i have been sneezing a lot lately", "i've been sneezing a lot"] },
  { "Input": "(I have)/I've visited/(been to) Hungary", "Expected": ["i've visited hungary", "i have been to hungary", "i have visited hungary", "i've been to hungary"] },
  { "Input": "(didn't/(did not) expect)/(wasn't/(was not) expecting)", "Expected": ["wasn't expecting", "did not expect", "was not expecting", "didn't expect"] },
  { "Input": "(didn't/(did not) arrive)/(hadn't/(had not) arrived)", "Expected": ["did not arrive", "didn't arrive", "had not arrived", "hadn't arrived"] },
  { "Input": "(appears not)/(doesn't/(does not) appear) to have sustained any damage", "Expected": ["appears not to have sustained any damage", "doesn't appear to have sustained any damage", "does not appear to have sustained any damage"] },
  { "Input": "taking/(having taken) (Sue's calculator)", "Expected": ["having taken", "taking sue's calculator", "taking", "having taken sue's calculator"] },
  { "Input": "to Brian that he went and saw (\"The Sound of Music\" again)", "Expected": ["to brian that he went and saw \"the sound of music\" again", "to brian that he went and saw"] },
  { "Input": "denied/denies causing/(having caused)/(that he had caused) the accident", "Expected": ["denies causing the accident", "denied that he had caused the accident", "denied causing the accident", "denied having caused the accident", "denies having caused the accident", "denies that he had caused the accident"] },
  { "Input": "asked (if/whether I was going to the lecture the next day)/(if I'm/(I am) going to the lecture tomorrow)", "Expected": ["asked if i'm going to the lecture tomorrow", "asked if i was going to the lecture the next day", "asked whether i was going to the lecture the next day", "asked if i am going to the lecture tomorrow"] },
  { "Input": "We/you/I couldn't/(could not) possibly tell Sally the truth", "Expected": ["i could not possibly tell sally the truth", "i couldn't possibly tell sally the truth", "you could not possibly tell sally the truth", "you couldn't possibly tell sally the truth", "we couldn't possibly tell sally the truth", "we could not possibly tell sally the truth"] },
  { "Input": "(You'd/(You had)) better not wake her up (now)", "Expected": ["you'd better not wake her up", "you had better not wake her up now", "you'd better not wake her up now", "you had better not wake her up", "better not wake her up", "better not wake her up now"] },
  { "Input": "cast (an eye)/(one's eye/eyes) over sb/sth", "Expected": ["cast one's eye over sb", "cast one's eyes over sth", "cast one's eye over sth", "cast one's eyes over sb", "cast an eye over sb", "cast an eye over sth"] },
  { "Input": "((to) be) at one's wits' end", "Expected": ["at one's wits' end", "be at one's wits' end", "to be at one's wits' end"] },
  { "Input": "stick'em (up!)/up", "Expected": ["stick'em up", "stick'em up!"] },
  { "Input": "conjure sth up/((up) from/(out of) sth)", "Expected": ["conjure sth out of sth", "conjure sth from sth", "conjure sth up", "conjure sth up from sth", "conjure sth up out of sth"] },
  { "Input": "wrap sth (up) (in)", "Expected": ["wrap sth up", "wrap sth up in", "wrap sth", "wrap sth in"] },
  { "Input": "haul sb up (before/(in front of) sb/sth)", "Expected": ["haul sb up before sb", "haul sb up", "haul sb up in front of sb", "haul sb up in front of sth", "haul sb up before sth"] },
  { "Input": "(be on the lookout)/(keep a lookout) (for sb/sth)", "Expected": ["be on the lookout for sb", "be on the lookout", "keep a lookout", "be on the lookout for sth", "keep a lookout for sth", "keep a lookout for sb"] },
  { "Input": "blend in (with sth/sb)", "Expected": ["blend in with sth", "blend in", "blend in with sb"] },
  { "Input": "(dibs on (sth))/bags", "Expected": ["dibs on", "dibs on sth", "bags"] },
  { "Input": "(the) happy/golden mean", "Expected": ["the happy mean", "happy mean", "the golden mean", "golden mean"] },
  { "Input": "single sb/sth out ((for sth)/(as sb/sth))", "Expected": ["single sth out", "single sb out as sb", "single sth out for sth", "single sb out as sth", "single sth out as sth", "single sb out", "single sth out as sb", "single sb out for sth"] },
  { "Input": "run (the risk (of sth/(doing sth)))/risks", "Expected": ["run the risk of sth", "run the risk", "run the risk of doing sth", "run risks"] },
]

describe("Alternatives", () => {
  it("creates a proper list of alternatives", () => {
    const wrapper = shallowMount(alternatives)
    for (let tc of testcases) {
      expect(wrapper.vm.alternatives(tc["Input"]).sort()).toEqual(tc["Expected"].sort())
    }
  })
})
