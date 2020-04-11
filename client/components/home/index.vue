<template>
  <div>
    <toasts></toasts>
    <div v-if="loading" class="loading">
      <i class="fas fa-yin-yang fa-spin fa-5x"></i>
    </div>
    <div v-else>
      <sidenav class="d-md-none"></sidenav>
      <topnav class="d-none d-md-block"></topnav>
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
  import toasts from "components/toasts"
  import topnav from "components/topnav"
  import sidenav from "components/sidenav"

  export default {
    components: { toasts, topnav, sidenav },
    data() {
      return {
        loading: true,
        ws: Object
      }
    },
    mounted() {
      this.$bus.$on("UserData", message => {
        this.$store.commit("initialize", message)
        this.loading = false
      })
      this.$bus.$on("Status", message => {
        this.$toast(message["Level"], message["Text"])
      })
      this.ws = new WebSocket("wss://" + location.host)
      this.ws.onopen = () => {
        this.$bus.$on("Call", (message, success, failure) => {
          this.$store.commit("createJob", { success, failure })
          message["JobId"] = this.$store.getters.jobId
          this.ws.send(JSON.stringify(message))
        })
        this.$call("GetUserData", {})
      }
      this.ws.onmessage = event => {
        try {
          let msg = JSON.parse(event.data)
          let name = msg["Message"]
          this.$store.dispatch("completeJob", msg)
          delete msg["Message"]
          delete msg["JobId"]
          delete msg["Success"]
          this.$bus.$emit(name, msg)
        }
        catch(error) {
          console.error("Failed to parse an incoming message: ", error)
        }
      }
      this.ws.onclose = () => {
        this.$bus.$off("Call")
        this.loading = true
      }
      this.ws.onerror = error => {
        this.$toast("Error", "Error:" + error)
      }
    },
    destroyed() {
      this.ws.close()
    }
  }
</script>
<style>
  body {
    background-color: white;
  }
  .loading {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .cursor-pointer {
    cursor: pointer;
  }
  .cursor-grab {
    cursor: grab;
  }
</style>
