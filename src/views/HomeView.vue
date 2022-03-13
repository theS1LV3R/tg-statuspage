<template>
  <div class="home">
    <input v-model="pollingRate" />
    <br />
    <button @click.prevent="stopPolling" v-if="polling">Stop polling</button>
    <button @click.prevent="startPolling" v-else>Start polling</button>
    <button @click.prevent="updateStatus">Update</button>
    <div id="server-list">
      <Server
        v-for="(server, index) of servers"
        :key="index"
        :id="index"
        :tests="server.testCases"
        :success="server.success"
        :lastUpdated="server.lastUpdated"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import state from "@/store";
import Server from "@/components/ServerComponent.vue";

export default defineComponent({
  name: "HomeView",
  components: {
    Server,
  },

  data() {
    return {
      servers: state.state.servers,
      pollingRate: state.state.polling.interval,
      pollingID: state.state.polling.id,
      polling: state.state.polling.active,
    };
  },

  watch: {
    pollingRate(newVal) {
      state.state.polling.interval = newVal;
    },
    polling(newVal) {
      state.state.polling.active = newVal;
      if (newVal) {
        this.pollingID = setInterval(() => {
          this.updateStatus();
        }, state.state.polling.interval);
      } else {
        clearInterval(this.pollingID);
        this.pollingID = undefined;
      }
    },
    pollingID(newVal) {
      state.state.polling.id = newVal;
    },
  },

  methods: {
    async updateStatus() {
      await state.dispatch("updateStatus");
    },

    async startPolling() {
      this.polling = true;

      this.pollingID = setInterval(() => {
        this.updateStatus();
      }, state.state.polling.interval);
    },
    async stopPolling() {
      this.polling = false;
    },
  },

  created() {
    if (this.polling) this.startPolling();
  },
});
</script>

<style lang="scss" scoped>
#server-list {
  display: flex;
  flex: 1 1 0;
  align-items: flex-start;
  justify-content: space-evenly;
}
</style>
