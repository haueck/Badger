import contractions from '../components/contractions'
import { shallowMount } from '@vue/test-utils'

let testcases = [
  { "Input": "I am leaving", "Expected": "(i am)/(i'm) leaving" },
  { "Input": "will not have", "Expected": "(will not)/(won't) have" },
  { "Input": "you are leaving", "Expected": "(you are)/(you're) leaving" },
  { "Input": "you are not leaving", "Expected": "(you are not)/(you aren't)/(you're not) leaving" },
  { "Input": "I cannot do it", "Expected": "I (cannot)/(can't)/(can not) do it" },
  { "Input": "I can not do it", "Expected": "I (can not)/(can't)/(cannot) do it" },
  { "Input": "We/you/I could not possibly tell Sally the truth", "Expected": "We/you/I (could not)/(couldn't) possibly tell Sally the truth" },
  { "Input": "she has not", "Expected": "(she has not)/(she hasn't)/(she's not)" },
  { "Input": "(You had) better not wake her up (now)", "Expected": "((You had)/(You'd)) better not wake her up (now)" },
  { "Input": "(appears not)/(does not appear) to have sustained any damage", "Expected": "(appears not)/((does not)/(doesn't) appear) to have sustained any damage" },
  { "Input": "(did not arrive)/(had not arrived)", "Expected": "((did not)/(didn't) arrive)/((had not)/(hadn't) arrived)" },
  { "Input": "(did not expect)/(was not expecting)", "Expected": "((did not)/(didn't) expect)/((was not)/(wasn't) expecting)" },
  { "Input": "I have visited/(been to) Hungary", "Expected": "(I have)/(I've) visited/(been to) Hungary" },
  { "Input": "was not working", "Expected": "(was not)/(wasn't) working" },
  { "Input": "do not have to", "Expected": "(do not)/(don't) have to" },
  { "Input": "(We) can not have stayed", "Expected": "(We) (can not)/(can't)/(cannot) have stayed" },
  { "Input": "need not have bought", "Expected": "(need not)/(needn't) have bought" },
  { "Input": "I would prefer beer to wine", "Expected": "(I would)/(I'd) prefer beer to wine" },
  { "Input": "has not been damaged", "Expected": "(has not)/(hasn't) been damaged" }
]

describe('Contractions', () => {
  it('creates a proper list of contractions', () => {
    const wrapper = shallowMount(contractions)
    for (let tc of testcases) {
      expect(wrapper.vm.contractions(tc["Input"]).toLowerCase()).toEqual(tc["Expected"].toLowerCase())
    }
  })
})
