import learn from "../components/english/learn.vue"
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
        "PartOfSpeech": "Noun"
      },
    },
    mocks: {
      $bus
    }
  })
  wrapper.vm.answer = testcase["Answer"]
  wrapper.vm.verify()
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

  it("properly handles a successful attempt", () => {
    verify({
      "Word": "test",
      "Answer": "test",
      "Correct": [ "test" ],
      "Pass": true
    })
  })

  it("properly handles an unsuccessful attempt", () => {
    verify({
      "Word": "test",
      "Answer": "wrong answer",
      "Wrong": [ "wrong answer" ],
      "Possible": [ "test" ],
      "Pass": false
    })
  })

  it("properly handles alternatives", () => {
    verify({
      "Word": "cast/shed/throw light on sth",
      "Answer": "cast light on sth",
      "Correct": [ "cast light on sth" ],
      "Possible": [ "shed light on sth", "throw light on sth" ],
      "Pass": true
    })
  })

  it("properly handles alternatives", () => {
    verify({
      "Word": "cast/shed/throw light on sth",
      "Answer": "cast/shed light on sth",
      "Correct": [ "shed light on sth", "cast light on sth" ],
      "Possible": [ "throw light on sth" ],
      "Pass": true
    })
  })

  it("properly handles alternatives", () => {
    verify({
      "Word": "cast/shed/throw light on sth",
      "Answer": "cast/shed/throw light on sth",
      "Correct": [ "shed light on sth", "cast light on sth", "throw light on sth" ],
      "Pass": true
    })
  })

  it("properly handles alternatives", () => {
    verify({
      "Word": "cast/shed/throw light on sth",
      "Answer": "fire light on sth",
      "Wrong": [ "fire light on sth" ],
      "Possible": [ "shed light on sth", "cast light on sth", "throw light on sth" ],
      "Pass": false
    })
  })

  it("properly handles alternatives", () => {
    verify({
      "Word": "cast/shed/throw light on sth",
      "Answer": "cast/fire light on sth",
      "Wrong": [ "fire light on sth" ],
      "Correct": [ "cast light on sth" ],
      "Possible": [ "shed light on sth", "throw light on sth" ],
      "Pass": false
    })
  })

  it("properly handles complex alternatives", () => {
    verify({
      "Word": "cast (an eye)/(one's eye/eyes) over sb/sth",
      "Answer": "cast one's eye over sb/sth",
      "Correct": [ "cast one's eye over sb", "cast one's eye over sth" ],
      "Possible": [ "cast one's eyes over sb", "cast one's eyes over sth", "cast an eye over sb", "cast an eye over sth" ],
      "Pass": true
    })
  })
})
