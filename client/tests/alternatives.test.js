import alternatives from "../components/alternatives"
import { mount } from "@vue/test-utils"

describe("Alternatives", () => {

  it("handles an empty string", () => {
    expect(mount(alternatives).vm.alternatives("").sort()).toEqual([""])
  })

  it("handles 'abc'", () => {
    expect(mount(alternatives).vm.alternatives("abc").sort()).toEqual(["abc"].sort())
  })

  it("handles '(the)'", () => {
    expect(mount(alternatives).vm.alternatives("(the)").sort()).toEqual(["", "the"].sort())
  })

  it("handles '(a) (b)'", () => {
    expect(mount(alternatives).vm.alternatives("(a) (b)").sort()).toEqual(["", "a", "b", "a b"].sort())
  })

  it("handles '(he) was an only child'", () => {
    expect(mount(alternatives).vm.alternatives("(he) was an only child").sort()).toEqual(["was an only child", "he was an only child"].sort())
  })

  it("handles 'Robert Downey (Jr)'", () => {
    expect(mount(alternatives).vm.alternatives("Robert Downey (Jr)").sort()).toEqual(["robert downey", "robert downey jr"].sort())
  })

  it("handles 'Helena (Bonham) Carter'", () => {
    expect(mount(alternatives).vm.alternatives("Helena (Bonham) Carter").sort()).toEqual(["helena bonham carter", "helena carter"].sort())
  })

  it("handles '(Francis) Scott (Key) Fitzgerald'", () => {
    expect(mount(alternatives).vm.alternatives("(Francis) Scott (Key) Fitzgerald").sort()).toEqual(["scott fitzgerald", "scott key fitzgerald", "francis scott key fitzgerald", "francis scott fitzgerald"].sort())
  })

  it("handles '(It was because) it was a bargain I bought it'", () => {
    expect(mount(alternatives).vm.alternatives("(It was because) it was a bargain I bought it").sort()).toEqual(["it was because it was a bargain i bought it", "it was a bargain i bought it"].sort())
  })

  it("handles 'Miles (Dewey) Davis (III)'", () => {
    expect(mount(alternatives).vm.alternatives("Miles (Dewey) Davis (III)").sort()).toEqual(["miles dewey davis", "miles dewey davis iii", "miles davis", "miles davis iii"].sort())
  })

  it("handles 'always/continually interrupting me'", () => {
    expect(mount(alternatives).vm.alternatives("always/continually interrupting me").sort()).toEqual(["always interrupting me", "continually interrupting me"].sort())
  })

  it("handles 'Alpy Pennińskie/Walijskie'", () => {
    expect(mount(alternatives).vm.alternatives("Alpy Pennińskie/Walijskie").sort()).toEqual(["alpy pennińskie", "alpy walijskie"].sort())
  })

  it("handles 'Half the time I get a phone call it's a/the wrong number'", () => {
    expect(mount(alternatives).vm.alternatives("Half the time I get a phone call it's a/the wrong number").sort()).toEqual(["half the time i get a phone call it's a wrong number", "half the time i get a phone call it's the wrong number"].sort())
  })

  it("handles 'suppose/supposing/imagine'", () => {
    expect(mount(alternatives).vm.alternatives("suppose/supposing/imagine").sort()).toEqual(["imagine", "supposing", "suppose"].sort())
  })

  it("handles '(Mount Everest)/Czomolungma'", () => {
    expect(mount(alternatives).vm.alternatives("(Mount Everest)/Czomolungma").sort()).toEqual(["czomolungma", "mount everest"].sort())
  })

  it("handles 'would/(used to) follow'", () => {
    expect(mount(alternatives).vm.alternatives("would/(used to) follow").sort()).toEqual(["would follow", "used to follow"].sort())
  })

  it("handles '(Dolina Aosty)/(Valle d'Aosta)'", () => {
    expect(mount(alternatives).vm.alternatives("(Dolina Aosty)/(Valle d'Aosta)").sort()).toEqual(["dolina aosty", "valle d'aosta"].sort())
  })

  it("handles '(I'm)/(I am) leaving'", () => {
    expect(mount(alternatives).vm.alternatives("(I'm)/(I am) leaving").sort()).toEqual(["i am leaving", "i'm leaving"].sort())
  })

  it("handles 'the film finishes/ends (we will)/we'll have to leave'", () => {
    expect(mount(alternatives).vm.alternatives("the film finishes/ends (we will)/we'll have to leave").sort()).toEqual(["the film ends we will have to leave", "the film ends we'll have to leave", "the film finishes we'll have to leave", "the film finishes we will have to leave"].sort())
  })

  it("handles 'cannot/can't/(can not)'", () => {
    expect(mount(alternatives).vm.alternatives("cannot/can't/(can not)").sort()).toEqual(["cannot", "can not", "can't"].sort())
  })

  it("handles 'establish/develop/build/have/form'", () => {
    expect(mount(alternatives).vm.alternatives("establish/develop/build/have/form").sort()).toEqual(["form", "have", "develop", "build", "establish"].sort())
  })

  it("handles 'because/ as/since/for'", () => {
    expect(mount(alternatives).vm.alternatives("because/ as/since/for").sort()).toEqual(["as", "because", "since", "for"].sort())
  })

  it("handles '(demand for)/(desire for) /(interest in)'", () => {
    expect(mount(alternatives).vm.alternatives("(demand for)/(desire for) /(interest in)").sort()).toEqual(["interest in", "demand for", "desire for"].sort())
  })

  it("handles '(response to) / (view of)/ (line with)'", () => {
    expect(mount(alternatives).vm.alternatives("(response to) / (view of)/ (line with)").sort()).toEqual(["response to", "view of", "line with"].sort())
  })

  it("handles 'firm/fixed/ set views/opinions'", () => {
    expect(mount(alternatives).vm.alternatives("firm/fixed/ set views/opinions").sort()).toEqual(["set views", "firm views", "fixed views", "set opinions", "fixed opinions", "firm opinions"].sort())
  })

  it("handles 'nature /titles of'", () => {
    expect(mount(alternatives).vm.alternatives("nature /titles of").sort()).toEqual(["titles of", "nature of"].sort())
  })

  it("handles 'house / home'", () => {
    expect(mount(alternatives).vm.alternatives("house / home").sort()).toEqual(["house", "home"].sort())
  })

  it("handles 'ideomotor (effect/phenomenon)'", () => {
    expect(mount(alternatives).vm.alternatives("ideomotor (effect/phenomenon)").sort()).toEqual(["ideomotor effect", "ideomotor phenomenon", "ideomotor"].sort())
  })

  it("handles 'I've/(I have) been sneezing (a lot (lately/recently))'", () => {
    expect(mount(alternatives).vm.alternatives("I've/(I have) been sneezing (a lot (lately/recently))").sort()).toEqual(["i've been sneezing a lot recently", "i've been sneezing", "i've been sneezing a lot lately", "i have been sneezing a lot recently", "i have been sneezing", "i have been sneezing a lot", "i have been sneezing a lot lately", "i've been sneezing a lot"].sort())
  })

  it("handles '(I have)/I've visited/(been to) Hungary'", () => {
    expect(mount(alternatives).vm.alternatives("(I have)/I've visited/(been to) Hungary").sort()).toEqual(["i've visited hungary", "i have been to hungary", "i have visited hungary", "i've been to hungary"].sort())
  })

  it("handles '(didn't/(did not) expect)/(wasn't/(was not) expecting)'", () => {
    expect(mount(alternatives).vm.alternatives("(didn't/(did not) expect)/(wasn't/(was not) expecting)").sort()).toEqual(["wasn't expecting", "did not expect", "was not expecting", "didn't expect"].sort())
  })

  it("handles '(didn't/(did not) arrive)/(hadn't/(had not) arrived)'", () => {
    expect(mount(alternatives).vm.alternatives("(didn't/(did not) arrive)/(hadn't/(had not) arrived)").sort()).toEqual(["did not arrive", "didn't arrive", "had not arrived", "hadn't arrived"].sort())
  })

  it("handles '(appears not)/(doesn't/(does not) appear) to have sustained any damage'", () => {
    expect(mount(alternatives).vm.alternatives("(appears not)/(doesn't/(does not) appear) to have sustained any damage").sort()).toEqual(["appears not to have sustained any damage", "doesn't appear to have sustained any damage", "does not appear to have sustained any damage"].sort())
  })

  it("handles 'taking/(having taken) (Sue's calculator)'", () => {
    expect(mount(alternatives).vm.alternatives("taking/(having taken) (Sue's calculator)").sort()).toEqual(["having taken", "taking sue's calculator", "taking", "having taken sue's calculator"].sort())
  })

  it("handles 'to Brian that he went and saw (\"The Sound of Music\" again)'", () => {
    expect(mount(alternatives).vm.alternatives("to Brian that he went and saw (\"The Sound of Music\" again)").sort()).toEqual(["to brian that he went and saw \"the sound of music\" again", "to brian that he went and saw"].sort())
  })

  it("handles 'denied/denies causing/(having caused)/(that he had caused) the accident'", () => {
    expect(mount(alternatives).vm.alternatives("denied/denies causing/(having caused)/(that he had caused) the accident").sort()).toEqual(["denies causing the accident", "denied that he had caused the accident", "denied causing the accident", "denied having caused the accident", "denies having caused the accident", "denies that he had caused the accident"].sort())
  })

  it("handles 'asked (if/whether I was going to the lecture the next day)/(if I'm/(I am) going to the lecture tomorrow)'", () => {
    expect(mount(alternatives).vm.alternatives("asked (if/whether I was going to the lecture the next day)/(if I'm/(I am) going to the lecture tomorrow)").sort()).toEqual(["asked if i'm going to the lecture tomorrow", "asked if i was going to the lecture the next day", "asked whether i was going to the lecture the next day", "asked if i am going to the lecture tomorrow"].sort())
  })

  it("handles 'We/you/I couldn't/(could not) possibly tell Sally the truth'", () => {
    expect(mount(alternatives).vm.alternatives("We/you/I couldn't/(could not) possibly tell Sally the truth").sort()).toEqual(["i could not possibly tell sally the truth", "i couldn't possibly tell sally the truth", "you could not possibly tell sally the truth", "you couldn't possibly tell sally the truth", "we couldn't possibly tell sally the truth", "we could not possibly tell sally the truth"].sort())
  })

  it("handles '(You'd/(You had)) better not wake her up (now)'", () => {
    expect(mount(alternatives).vm.alternatives("(You'd/(You had)) better not wake her up (now)").sort()).toEqual(["you'd better not wake her up", "you had better not wake her up now", "you'd better not wake her up now", "you had better not wake her up", "better not wake her up", "better not wake her up now"].sort())
  })

  it("handles 'cast (an eye)/(one's eye/eyes) over sb/sth'", () => {
    expect(mount(alternatives).vm.alternatives("cast (an eye)/(one's eye/eyes) over sb/sth").sort()).toEqual(["cast one's eye over sb", "cast one's eyes over sth", "cast one's eye over sth", "cast one's eyes over sb", "cast an eye over sb", "cast an eye over sth"].sort())
  })

  it("handles '((to) be) at one's wits' end'", () => {
    expect(mount(alternatives).vm.alternatives("((to) be) at one's wits' end").sort()).toEqual(["at one's wits' end", "be at one's wits' end", "to be at one's wits' end"].sort())
  })

  it("handles 'stick'em (up!)/up'", () => {
    expect(mount(alternatives).vm.alternatives("stick'em (up!)/up").sort()).toEqual(["stick'em up", "stick'em up!"].sort())
  })

  it("handles 'conjure sth up/((up) from/(out of) sth)'", () => {
    expect(mount(alternatives).vm.alternatives("conjure sth up/((up) from/(out of) sth)").sort()).toEqual(["conjure sth out of sth", "conjure sth from sth", "conjure sth up", "conjure sth up from sth", "conjure sth up out of sth"].sort())
  })

  it("handles 'wrap sth (up) (in)'", () => {
    expect(mount(alternatives).vm.alternatives("wrap sth (up) (in)").sort()).toEqual(["wrap sth up", "wrap sth up in", "wrap sth", "wrap sth in"].sort())
  })

  it("handles 'haul sb up (before/(in front of) sb/sth)'", () => {
    expect(mount(alternatives).vm.alternatives("haul sb up (before/(in front of) sb/sth)").sort()).toEqual(["haul sb up before sb", "haul sb up", "haul sb up in front of sb", "haul sb up in front of sth", "haul sb up before sth"].sort())
  })

  it("handles '(be on the lookout)/(keep a lookout) (for sb/sth)'", () => {
    expect(mount(alternatives).vm.alternatives("(be on the lookout)/(keep a lookout) (for sb/sth)").sort()).toEqual(["be on the lookout for sb", "be on the lookout", "keep a lookout", "be on the lookout for sth", "keep a lookout for sth", "keep a lookout for sb"].sort())
  })

  it("handles 'blend in (with sth/sb)'", () => {
    expect(mount(alternatives).vm.alternatives("blend in (with sth/sb)").sort()).toEqual(["blend in with sth", "blend in", "blend in with sb"].sort())
  })

  it("handles '(dibs on (sth))/bags'", () => {
    expect(mount(alternatives).vm.alternatives("(dibs on (sth))/bags").sort()).toEqual(["dibs on", "dibs on sth", "bags"].sort())
  })

  it("handles '(the) happy/golden mean'", () => {
    expect(mount(alternatives).vm.alternatives("(the) happy/golden mean").sort()).toEqual(["the happy mean", "happy mean", "the golden mean", "golden mean"].sort())
  })

  it("handles 'single sb/sth out ((for sth)/(as sb/sth))'", () => {
    expect(mount(alternatives).vm.alternatives("single sb/sth out ((for sth)/(as sb/sth))").sort()).toEqual(["single sth out", "single sb out as sb", "single sth out for sth", "single sb out as sth", "single sth out as sth", "single sb out", "single sth out as sb", "single sb out for sth"].sort())
  })

  it("handles 'run (the risk (of sth/(doing sth)))/risks'", () => {
    expect(mount(alternatives).vm.alternatives("run (the risk (of sth/(doing sth)))/risks").sort()).toEqual(["run the risk of sth", "run the risk", "run the risk of doing sth", "run risks"].sort())
  })

})
