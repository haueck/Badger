import vue from "vue"
import vuex from "vuex"

vue.use(vuex)

export default new vuex.Store({
  state: {},
  actions: {},
  mutations: {
    initialize(state, data) {
      for (let key in data) {
        vue.set(state, key, data[key])
      }
      let tags = Object.keys(state["Tags"]).sort()
      for (let tag of tags) {
        vue.set(state["Tags"][tag], "Children", [])
      }
      for (let tag of tags) {
        if (tag != "€") {
          let parent = state["Tags"][tag]["Parent"]
          let siblings = state["Tags"][parent]["Children"]
          siblings.push(tag)
        }
      }
    }
  },
  getters: {
    tags: state => {
      return state["Tags"]
    }
  }
})
