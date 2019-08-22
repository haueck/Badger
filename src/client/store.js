import vue from "vue"
import vuex from "vuex"

vue.use(vuex)

export default new vuex.Store({
  state: {
    jobs: {},
    jobId: 0,
    jobCount: 0
  },
  mutations: {
    initialize(state, data) {
      for (let key in data) {
        vue.set(state, key, data[key])
      }
      let tags = Object.keys(state["Tags"]).sort((a, b) => { return a.toLowerCase().localeCompare(b.toLowerCase()) })
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
    },
    createJob(state, callback) {
      state.jobId++
      state.jobCount++
      vue.set(state.jobs, state.jobId, { "Callback": callback })
    },
    removeJob(state, id) {
      vue.delete(state.jobs, id)
      state.jobCount--
    }
  },
  actions: {
    completeJob(context, id) {
      if (!id) {
        console.error("JobId is not defined")
      }
      else if (!(id in context.state.jobs)) {
        console.error("There is no job with JobId=", id)
      }
      let callback = context.state.jobs[id]["Callback"]
      if (callback) {
        callback()
      }
      context.commit("removeJob", id)
    }
  },
  getters: {
    tags: state => {
      return state["Tags"]
    },
    jobId: state => {
      return state.jobId
    }
  }
})
