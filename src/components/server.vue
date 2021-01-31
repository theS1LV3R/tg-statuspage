<template>
  <div class="server">
    <div class="failing" v-if="!success">
      <h2>⚠️Warning⚠️</h2>
      <p>
        The request to get this API's status failed on the last request. Data
        may not be accurate.
      </p>
    </div>
    <h2>Stack {{ id + 1 }}</h2>
    <p>Last updated: {{ lastUpdated }}</p>
    <div class="server-list">
      <Test
        v-for="(test, index) in tests"
        :key="index"
        :name="test.Title"
        :status="test.Status"
        :description="getDesc(test)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import Test from "@/components/test.vue";
import { TestCase } from "@/types";

export default Vue.extend({
  name: "Server",
  props: {
    id: Number,
    tests: Array,
    success: Boolean,
    lastUpdated: Date,
  },

  methods: {
    getDesc(test: TestCase) {
      if (test.Description !== "") {
        return test.Description;
      } else {
        return "No description defined";
      }
    },
  },
  components: {
    Test,
  },
});
</script>

<style lang="scss" scoped>
.server-list {
  margin-left: auto;
  margin-right: auto;
}
</style>

<style lang="scss">
.server {
  padding: 5px;
}

.failing {
  font-weight: bold;
  border: black solid 1px;
  border-radius: 0.25rem;
  background-color: #ed2939;
  color: white;
}
</style>
