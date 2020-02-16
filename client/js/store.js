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
    createJob(state, callbacks) {
      state.jobId++
      state.jobCount++
      vue.set(state.jobs, state.jobId, {
        "Success": callbacks.success,
        "Failure": callbacks.failure
      })
    },
    removeJob(state, id) {
      vue.delete(state.jobs, id)
      state.jobCount--
    },
    incrementHits(state) {
      state["Hits"]++
    },
    lastCard(state, type) {
      state["LastCard"] = type
    },
    lastTags(state, tags) {
      state["LastTags"] = tags
    }
  },
  actions: {
    completeJob(context, msg) {
      let id = msg["JobId"]
      if (!id) {
        console.error("JobId is not defined")
      }
      else if (!(id in context.state.jobs)) {
        console.error("There is no job with JobId=", id)
      }
      else {
        let name = msg["Success"] ? "Success" : "Failure"
        let callback = context.state.jobs[id][name]
        if (callback) {
          callback(msg)
        }
        context.commit("removeJob", id)
      }
    }
  },
  getters: {
    tags: state => {
      return state["Tags"]
    },
    lastCard: state => {
      return state["LastCard"]
    },
    lastTags: state => {
      return state["LastTags"]
    },
    revisions: state => {
      return state["Revisions"]
    },
    hits: state => {
      return state["Hits"]
    },
    dailyTarget: state => {
      return state["TodaysTarget"]
    },
    jobId: state => {
      return state.jobId
    },
    jobCount: state => {
      return state.jobCount
    }
  }
})
