import learn from "../components/question/learn.vue"
import { mount } from "@vue/test-utils"

function verify(testcase) {
  const wrapper = mount(learn, {
    propsData: {
      card: {
        "Type": "Question",
        "Question": testcase["Question"],
        "Answers": testcase["Answers"]
      }
    }
  })
  for (let i = 0; i < testcase["Input"].length; ++i) {
    wrapper.vm.answers[i] = testcase["Input"][i]
  }
  wrapper.vm.verify()
  for (let j = 0; j < testcase["Expected"].length; ++j) {
    let c = wrapper.findAll(".feedback-row-" + j + " .correct")
    let p = wrapper.findAll(".feedback-row-" + j + " .possible")
    let w = wrapper.findAll(".feedback-row-" + j + " .wrong")
    expect(c.length).toBe(testcase["Expected"][j]["Correct"].length)
    expect(p.length).toBe(testcase["Expected"][j]["Possible"].length)
    expect(w.length).toBe(testcase["Expected"][j]["Wrong"].length)
    for (let i = 0; i < c.length; ++i) {
      expect(testcase["Expected"][j]["Correct"].includes(c.at(i).text())).toBe(true)
    }
    for (let i = 0; i < p.length; ++i) {
      expect(testcase["Expected"][j]["Possible"].includes(p.at(i).text())).toBe(true)
    }
    for (let i = 0; i < w.length; ++i) {
      expect(testcase["Expected"][j]["Wrong"].includes(w.at(i).text())).toBe(true)
    }
  }
  expect(wrapper.contains(".correct-answer")).toBe(testcase["Pass"])
  expect(wrapper.contains(".wrong-answer")).not.toBe(testcase["Pass"])
}

describe("Question", () => {

  it("properly handles a successful attempt", () => {
    verify({
      "Question": "1+1?",
      "Answers": [{ "Value": "2" }],
      "Input": [ 2 ],
      "Expected": [{
        "Correct": [ "2" ],
        "Possible": [],
        "Wrong": []
      }],
      "Pass": true
    })
  })

  it("properly handles a successful attempt", () => {
    verify({
      "Question": "Empty",
      "Answers": [{ "Value": "" }],
      "Input": [ "" ],
      "Expected": [{
        "Correct": [],
        "Possible": [],
        "Wrong": []
      }],
      "Pass": true
    })
  })

  it("properly handles an unsuccessful attempt", () => {
    verify({
      "Question": "1+1?",
      "Answers": [{ "Value": "2" }],
      "Input": [ 3 ],
      "Expected": [{
        "Correct": [],
        "Possible": [ "2" ],
        "Wrong": [ "3" ]
      }],
      "Pass": false
    })
  })

  it("properly handles an unsuccessful attempt", () => {
    verify({
      "Question": "1+1?",
      "Answers": [{ "Value": "2" }],
      "Input": [ "" ],
      "Expected": [{
        "Correct": [],
        "Possible": [ "2" ],
        "Wrong": [ "" ]
      }],
      "Pass": false
    })
  })

  it("properly handles optional answer", () => {
    verify({
      "Question": "1+1?",
      "Answers": [{ "Value": "(2)" }],
      "Input": [ "2" ],
      "Expected": [{
        "Correct": [ "2" ],
        "Possible": [],
        "Wrong": []
      }],
      "Pass": true
    })
  })

  it("properly handles optional answer", () => {
    verify({
      "Question": "1+1?",
      "Answers": [{ "Value": "(2)" }],
      "Input": [ "" ],
      "Expected": [{
        "Correct": [],
        "Possible": [ "2" ],
        "Wrong": []
      }],
      "Pass": true
    })
  })

  it("properly handles simple alternatives", () => {
    verify({
      "Question": "What is he doing?",
      "Answers": [{ "Value": "He is always/continually interrupting me" }],
      "Input": [ "He is continually interrupting me" ],
      "Expected": [{
        "Correct": [ "he is continually interrupting me" ],
        "Possible": [ "he is always interrupting me" ],
        "Wrong": []
      }],
      "Pass": true
    })
  })

  it("properly handles simple alternatives", () => {
    verify({
      "Question": "What is he doing?",
      "Answers": [{ "Value": "He is always/continually interrupting me" }],
      "Input": [ "He is always interrupting me" ],
      "Expected": [{
        "Correct": [ "he is always interrupting me" ],
        "Possible": [ "he is continually interrupting me" ],
        "Wrong": []
      }],
      "Pass": true
    })
  })

  it("properly handles simple alternatives", () => {
    verify({
      "Question": "What is he doing?",
      "Answers": [{ "Value": "He is always/continually interrupting me" }],
      "Input": [ "He is continually/always interrupting me" ],
      "Expected": [{
        "Correct": [ "he is always interrupting me", "he is continually interrupting me" ],
        "Possible": [],
        "Wrong": []
      }],
      "Pass": true
    })
  })

  it("properly handles simple alternatives", () => {
    verify({
      "Question": "What is he doing?",
      "Answers": [{ "Value": "He is always/continually interrupting me" }],
      "Input": [ "He is always/always interrupting me" ],
      "Expected": [{
        "Correct": [ "he is always interrupting me" ],
        "Possible": [ "he is continually interrupting me" ],
        "Wrong": []
      }],
      "Pass": true
    })
  })

  it("properly handles simple alternatives", () => {
    verify({
      "Question": "What is he doing?",
      "Answers": [{ "Value": "He is always/continually interrupting me" }],
      "Input": [ "He is neverly interrupting me" ],
      "Expected": [{
        "Correct": [],
        "Possible": [ "he is always interrupting me", "he is continually interrupting me" ],
        "Wrong": [ "he is neverly interrupting me" ]
      }],
      "Pass": false
    })
  })

  it("properly handles simple alternatives", () => {
    verify({
      "Question": "What is he doing?",
      "Answers": [{ "Value": "He is always/continually interrupting me" }],
      "Input": [ "He is always/continualy interrupting me" ],
      "Expected": [{
        "Correct": [ "he is always interrupting me" ],
        "Possible": [ "he is continually interrupting me" ],
        "Wrong": [ "he is continualy interrupting me" ]
      }],
      "Pass": false
    })
  })

  it("properly handles complex alternatives", () => {
    verify({
      "Question": "To choose somebody/something from a group for special attention?",
      "Answers": [{ "Value": "single sb/sth out ((for sth)/(as sb/sth))" }],
      "Input": [ "single sth out for sth" ],
      "Expected": [{
        "Correct": [ "single sth out for sth" ],
        "Possible": [ "single sb out", "single sb out as sb", "single sth out", "single sb out as sth", "single sth out as sth", "single sth out as sb", "single sb out for sth" ],
        "Wrong": []
      }],
      "Pass": true
    })
  })

  it("properly handles complex alternatives", () => {
    verify({
      "Question": "To choose somebody/something from a group for special attention?",
      "Answers": [{ "Value": "single sb/sth out ((for sth)/(as sb/sth))" }],
      "Input": [ "single sb out (as sb)" ],
      "Expected": [{
        "Correct": [ "single sb out", "single sb out as sb" ],
        "Possible": [ "single sth out", "single sth out for sth", "single sb out as sth", "single sth out as sth", "single sth out as sb", "single sb out for sth" ],
        "Wrong": []
      }],
      "Pass": true
    })
  })

  it("properly handles complex alternatives", () => {
    verify({
      "Question": "To choose somebody/something from a group for special attention?",
      "Answers": [{ "Value": "single sb/sth out ((for sth)/(as sb/sth))" }],
      "Input": [ "single sb/sth out ((for sth)/(as sb/sth))" ],
      "Expected": [{
        "Correct": [ "single sb out", "single sb out as sb", "single sth out", "single sth out for sth", "single sb out as sth", "single sth out as sth", "single sth out as sb", "single sb out for sth" ],
        "Possible": [],
        "Wrong": []
      }],
      "Pass": true
    })
  })

  it("properly handles complex alternatives", () => {
    verify({
      "Question": "To choose somebody/something from a group for special attention?",
      "Answers": [{ "Value": "single sb/sth out ((for sth)/(as sb/sth))" }],
      "Input": [ "single sb/sth out ((for sb)/(as sb/sth))" ],
      "Expected": [{
        "Correct": [ "single sb out", "single sb out as sb", "single sth out", "single sb out as sth", "single sth out as sth", "single sth out as sb" ],
        "Possible": [ "single sth out for sth", "single sb out for sth" ],
        "Wrong": [ "single sth out for sb", "single sb out for sb" ]
      }],
      "Pass": false
    })
  })

  it("properly handles contractions", () => {
    verify({
      "Question": "Who is leaving?",
      "Answers": [{ "Value": "I'm leaving" }],
      "Input": [ "I am leaving" ],
      "Expected": [{
        "Correct": [ "i am leaving" ],
        "Possible": [],
        "Wrong": []
      }],
      "Pass": true
    })
  })

  it("properly handles contractions", () => {
    verify({
      "Question": "Who is leaving?",
      "Answers": [{ "Value": "I'm leaving" }],
      "Input": [ "I'm leaving" ],
      "Expected": [{
        "Correct": [ "i'm leaving" ],
        "Possible": [],
        "Wrong": []
      }],
      "Pass": true
    })
  })

  it("properly handles contractions", () => {
    verify({
      "Question": "Who is leaving?",
      "Answers": [{ "Value": "I'm (leaving)" }],
      "Input": [ "I am" ],
      "Expected": [{
        "Correct": [ "i am" ],
        "Possible": [ "i'm leaving" ],
        "Wrong": []
      }],
      "Pass": true
    })
  })

  it("properly handles multiple answers", () => {
    verify({
      "Question": "Who are they?",
      "Answers": [ { "Value": "(Francis) Scott (Key) Fitzgerald" }, { "Value": "Umberto Eco"} ],
      "Input": [ "Scott Key Fitzgerald", "Umberto Eco" ],
      "Expected": [{
        "Correct": [ "scott key fitzgerald" ],
        "Possible": [ "francis scott key fitzgerald", "francis scott fitzgerald", "scott fitzgerald" ],
        "Wrong": []
      }, {
        "Correct": [ "umberto eco" ],
        "Possible": [],
        "Wrong": []
      }],
      "Pass": true
    })
  })

  it("properly handles multiple answers", () => {
    verify({
      "Question": "Who are they?",
      "Answers": [ { "Value": "(Francis) Scott (Key) Fitzgerald" }, { "Value": "Umberto Eco"} ],
      "Input": [ "Scott (Brian) Fitzgerald", "Umberto Eco" ],
      "Expected": [{
        "Correct": [ "scott fitzgerald" ],
        "Possible": [ "francis scott key fitzgerald", "francis scott fitzgerald", "scott key fitzgerald" ],
        "Wrong": [ "scott brian fitzgerald" ]
      }, {
        "Correct": [ "umberto eco" ],
        "Possible": [],
        "Wrong": []
      }],
      "Pass": false
    })
  })

})
