import learn from "../components/english/learn.vue"
import add from "../components/english/add.vue"
import { mount } from "@vue/test-utils"

function verify(testcase) {
  let $bus = {
    pass: undefined,
    $emit(signal, pass) { this.pass = pass }
  }
  const wrapper = mount(learn, {
    propsData: {
      card: {
        "Type": "English",
        "Word": testcase["Word"],
        "PartOfSpeech": "Noun",
        "Examples": [],
        "Related": []
      },
    },
    mocks: {
      $bus
    }
  })
  wrapper.vm.answer = testcase["Answer"]
  wrapper.vm.grade()
  let fields = [ "Correct", "Possible", "Wrong" ]
  for (let i = 0; i < fields.length; ++i) {
    if (!(fields[i] in testcase)) {
      testcase[fields[i]] = []
    }
  }
  expect(wrapper.vm.correct.length).toBe(testcase["Correct"].length)
  expect(wrapper.vm.possible.length).toBe(testcase["Possible"].length)
  expect(wrapper.vm.wrong.length).toBe(testcase["Wrong"].length)
  for (let i = 0; i < wrapper.vm.correct.length; ++i) {
    expect(testcase["Correct"]).toContain(wrapper.vm.correct[i])
  }
  for (let i = 0; i < wrapper.vm.possible.length; ++i) {
    expect(testcase["Possible"]).toContain(wrapper.vm.possible[i])
  }
  for (let i = 0; i < wrapper.vm.wrong.length; ++i) {
    expect(testcase["Wrong"]).toContain(wrapper.vm.wrong[i])
  }
  expect($bus.pass).toBe(testcase["Pass"])
}

describe("English", () => {

  it("properly grades a successful attempt", () => {
    verify({
      "Word": "test",
      "Answer": "test",
      "Correct": [ "test" ],
      "Pass": true
    })
  })

  it("properly grades an unsuccessful attempt", () => {
    verify({
      "Word": "test",
      "Answer": "wrong answer",
      "Wrong": [ "wrong answer" ],
      "Possible": [ "test" ],
      "Pass": false
    })
  })

  it("properly grades alternatives", () => {
    verify({
      "Word": "cast/shed/throw light on sth",
      "Answer": "cast light on sth",
      "Correct": [ "cast light on sth" ],
      "Possible": [ "shed light on sth", "throw light on sth" ],
      "Pass": true
    })
  })

  it("properly grades alternatives", () => {
    verify({
      "Word": "cast/shed/throw light on sth",
      "Answer": "cast/shed light on sth",
      "Correct": [ "shed light on sth", "cast light on sth" ],
      "Possible": [ "throw light on sth" ],
      "Pass": true
    })
  })

  it("properly grades alternatives", () => {
    verify({
      "Word": "cast/shed/throw light on sth",
      "Answer": "cast/shed/throw light on sth",
      "Correct": [ "shed light on sth", "cast light on sth", "throw light on sth" ],
      "Pass": true
    })
  })

  it("properly grades alternatives", () => {
    verify({
      "Word": "cast/shed/throw light on sth",
      "Answer": "fire light on sth",
      "Wrong": [ "fire light on sth" ],
      "Possible": [ "shed light on sth", "cast light on sth", "throw light on sth" ],
      "Pass": false
    })
  })

  it("properly grades alternatives", () => {
    verify({
      "Word": "cast/shed/throw light on sth",
      "Answer": "cast/fire light on sth",
      "Wrong": [ "fire light on sth" ],
      "Correct": [ "cast light on sth" ],
      "Possible": [ "shed light on sth", "throw light on sth" ],
      "Pass": false
    })
  })

  it("properly grades complex alternatives", () => {
    verify({
      "Word": "cast (an eye)/(one's eye/eyes) over sb/sth",
      "Answer": "cast one's eye over sb/sth",
      "Correct": [ "cast one's eye over sb", "cast one's eye over sth" ],
      "Possible": [ "cast one's eyes over sb", "cast one's eyes over sth", "cast an eye over sb", "cast an eye over sth" ],
      "Pass": true
    })
  })

  it("properly conceals a single word", () => {
    const wrapper = mount(add, {
      propsData: {
        card: {
          "Type": "English",
          "Word": "embark",
          "PartOfSpeech": "Noun",
          "Related": [],
          "Examples": [ "Passengers with cars must embark first" ],
          "FullExamples": [ "" ]
        },
      },
      mocks: {
        $bus: {}
      }
    })
    wrapper.vm.updateExamples()
    expect(wrapper.vm.card["Examples"][0]).toBe("Passengers with cars must ~ first")
    expect(wrapper.vm.card["FullExamples"][0]).toBe("Passengers with cars must embark first")
  })

  it("properly conceals a complex phrase", () => {
    const wrapper = mount(add, {
      propsData: {
        card: {
          "Type": "English",
          "Word": "run (the risk (of sth/(doing sth)))/risks",
          "PartOfSpeech": "Verb",
          "Related": [],
          "Examples": [ "We don't want to run the risk of losing their business", "Investment is all about running risks" ],
          "FullExamples": [ "" ]
        },
      },
      mocks: {
        $bus: {}
      }
    })
    wrapper.vm.updateExamples()
    expect(wrapper.vm.card["Examples"][0]).toBe("We don't want to ~ ~ ~ ~ losing their business")
    expect(wrapper.vm.card["Examples"][1]).toBe("Investment is all about ~ing ~s")
  })

  it("properly conceals a related word", () => {
    const wrapper = mount(add, {
      propsData: {
        card: {
          "Type": "English",
          "Word": "underground",
          "PartOfSpeech": "Noun",
          "Related": [{
            "Word": "subway",
            "Description": "NAmE",
            "Visibility": "Hide"
          }],
          "Examples": [ "The New York subway", "The London Underground" ],
          "FullExamples": [ "" ]
        },
      },
      mocks: {
        $bus: {}
      }
    })
    wrapper.vm.updateExamples()
    expect(wrapper.vm.card["Examples"][0]).toBe("The New York ~")
    expect(wrapper.vm.card["Examples"][1]).toBe("The London ~")
  })

  it("properly conceals after an update", () => {
    const wrapper = mount(add, {
      propsData: {
        card: {
          "Type": "English",
          "Word": "underground",
          "PartOfSpeech": "Noun",
          "Related": [{
            "Word": "suway",
            "Description": "NAmE",
            "Visibility": "Hide"
          }],
          "Examples": [ "The New York subway", "The London Underground" ],
          "FullExamples": [ "" ]
        },
      },
      mocks: {
        $bus: {}
      }
    })
    wrapper.vm.updateExamples()
    expect(wrapper.vm.card["Examples"][0]).toBe("The New York subway")
    expect(wrapper.vm.card["Examples"][1]).toBe("The London ~")
    wrapper.vm.card["Related"][0]["Word"] = "subway"
    wrapper.vm.relatedChanged(0)
    expect(wrapper.vm.card["Examples"][0]).toBe("The New York ~")
    expect(wrapper.vm.card["Examples"][1]).toBe("The London ~")
  })

})
