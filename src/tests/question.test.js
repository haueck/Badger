import learn from "../components/question/learn.vue"
import { mount } from "@vue/test-utils"

function verify(testcase) {
  let $bus = {
    $emit() { }
  }
  const wrapper = mount(learn, {
    propsData: {
      card: {
        "Type": "Question",
        "Question": testcase["Question"],
        "Answers": testcase["Answers"],
        "Unordered": testcase["Unordered"],
        "Raw": testcase["Raw"]
      }
    },
    mocks: {
      $bus
    }
  })
  for (let i = 0; i < testcase["Input"].length; ++i) {
    wrapper.vm.answers[i] = testcase["Input"][i]
  }
  wrapper.vm.verify()
  for (let j = 0; j < testcase["Expected"].length; ++j) {
    for (let field of [ "Correct", "Possible", "Wrong" ]) {
      if (!(field in testcase["Expected"][j])) {
        testcase["Expected"][j][field] = []
      }
    }
    let c = wrapper.vm.feedback[j]["Correct"]
    let p = wrapper.vm.feedback[j]["Possible"]
    let w = wrapper.vm.feedback[j]["Wrong"]
    expect(c.length).toBe(testcase["Expected"][j]["Correct"].length)
    expect(p.length).toBe(testcase["Expected"][j]["Possible"].length)
    expect(w.length).toBe(testcase["Expected"][j]["Wrong"].length)
    for (let i = 0; i < c.length; ++i) {
      expect(testcase["Expected"][j]["Correct"]).toContain(c[i])
    }
    for (let i = 0; i < p.length; ++i) {
      expect(testcase["Expected"][j]["Possible"]).toContain(p[i])
    }
    for (let i = 0; i < w.length; ++i) {
      expect(testcase["Expected"][j]["Wrong"]).toContain(w[i])
    }
  }
  expect(wrapper.vm.pass).toBe(testcase["Pass"])
}

describe("Question", () => {

  it("properly handles a successful attempt", () => {
    verify({
      "Question": "1+1?",
      "Answers": [{ "Value": "2" }],
      "Input": [ 2 ],
      "Expected": [{
        "Correct": [ "2" ]
      }],
      "Pass": true
    })
  })

  it("properly handles a successful attempt", () => {
    verify({
      "Question": "Empty",
      "Answers": [{ "Value": "" }],
      "Input": [ "" ],
      "Expected": [ { "Correct": [ "" ] } ],
      "Pass": true
    })
  })

  it("properly handles an unsuccessful attempt", () => {
    verify({
      "Question": "1+1?",
      "Answers": [{ "Value": "2" }],
      "Input": [ 3 ],
      "Expected": [{
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
        "Possible": [ "2" ],
        "Wrong": [ "" ]
      }],
      "Pass": false
    })
  })

  it("properly handles answers with brackets", () => {
    verify({
      "Question": "What is you favorite equation?",
      "Answers": [{ "Value": "sin(x) + 1/2" }],
      "Input": [ "sin(x) + 1/2" ],
      "Raw": true,
      "Expected": [{
        "Correct": [ "sin(x) + 1/2" ]
      }],
      "Pass": true
    })
  })

  it("properly handles optional answer", () => {
    verify({
      "Question": "1+1?",
      "Answers": [{ "Value": "(2)" }],
      "Input": [ "2" ],
      "Expected": [{
        "Correct": [ "2" ],
        "Possible": [ "" ]
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
        "Correct": [ "" ],
        "Possible": [ "2" ]
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
        "Possible": [ "he is always interrupting me" ]
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
        "Possible": [ "he is continually interrupting me" ]
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
        "Correct": [ "he is always interrupting me", "he is continually interrupting me" ]
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
        "Possible": [ "he is continually interrupting me" ]
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
        "Possible": [ "single sb out", "single sb out as sb", "single sth out", "single sb out as sth", "single sth out as sth", "single sth out as sb", "single sb out for sth" ]
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
        "Possible": [ "single sth out", "single sth out for sth", "single sb out as sth", "single sth out as sth", "single sth out as sb", "single sb out for sth" ]
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
        "Correct": [ "single sb out", "single sb out as sb", "single sth out", "single sth out for sth", "single sb out as sth", "single sth out as sth", "single sth out as sb", "single sb out for sth" ]
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
        "Correct": [ "i am leaving" ]
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
        "Correct": [ "i'm leaving" ]
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
        "Possible": [ "i'm leaving" ]
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
        "Possible": [ "francis scott key fitzgerald", "francis scott fitzgerald", "scott fitzgerald" ]
      }, {
        "Correct": [ "umberto eco" ]
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
        "Correct": [ "umberto eco" ]
      }],
      "Pass": false
    })
  })

  it("properly handles unordered answers", () => {
    verify({
      "Unordered": true,
      "Question": "What are the highest mountains on each continent?",
      "Answers": [
        { "Value": "Kilimanjaro" },
        { "Value": "Vinson Massif" },
        { "Value": "Carstensz Pyramid" },
        { "Value": "(Mount Everest)/Czomolungma" },
        { "Value": "Elbrus" },
        { "Value": "Aconcagua" },
        { "Value": "Mount McKinley" }
      ],
      "Input": [ "Czomolungma", "Elbrus", "Kilimanjaro", "Carstensz Pyramid", "Mount McKinley", "Vinson Massif", "Aconcagua" ],
      "Expected": [
        {
          "Correct": [ "czomolungma" ],
          "Possible": [ "mount everest" ]
        },
        { "Correct": [ "elbrus" ] },
        { "Correct": [ "kilimanjaro" ] },
        { "Correct": [ "carstensz pyramid" ] },
        { "Correct": [ "mount mckinley" ] },
        { "Correct": [ "vinson massif" ] },
        { "Correct": [ "aconcagua" ] }
      ],
      "Pass": true
    })
  })

  it("properly handles unordered answers", () => {
    verify({
      "Unordered": true,
      "Question": "First 2 digits?",
      "Answers": [ { "Value": "0" }, { "Value": "1" } ],
      "Input": [ "1", "2" ],
      "Expected": [
        { "Correct": [ "1" ] },
        { "Wrong": [ "2" ], "Possible": [ "0" ] }
      ],
      "Pass": false
    })
  })

  it("properly handles unordered answers", () => {
    verify({
      "Unordered": true,
      "Question": "First 2 digits?",
      "Answers": [ { "Value": "0" }, { "Value": "1" } ],
      "Input": [ "1", "1" ],
      "Expected": [
        { "Correct": [ "1" ] },
        { "Wrong": [ "1" ], "Possible": [ "0" ] }
      ],
      "Pass": false
    })
  })

  it("properly handles unordered answers", () => {
    verify({
      "Unordered": true,
      "Question": "First 2 digits?",
      "Answers": [ { "Value": "0" }, { "Value": "1" } ],
      "Input": [ "6", "7" ],
      "Expected": [
        { "Wrong": [ "6" ], "Possible": [ "0" ] },
        { "Wrong": [ "7" ], "Possible": [ "1" ] }
      ],
      "Pass": false
    })
  })

})
