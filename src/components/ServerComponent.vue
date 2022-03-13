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
    <p>Last updated: {{ lastUpdated ?? "Never." }}</p>
    <div class="server-list">
      <Test
        v-for="(test, index) in (tests as TestCase[])"
        :key="index"
        :name="test.name"
        :status="test.status_success"
        :description="getDesc(test)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import Test from "@/components/TestCase.vue";
import type { TestCase } from "@/types";

export default defineComponent({
  props: {
    id: {
      type: Number,
      required: true,
    },
    tests: {
      type: Array,
      required: true,
    },
    success: {
      type: Boolean,
      required: true,
    },
    lastUpdated: {
      type: Date,
      required: false,
      default: undefined,
    },
  },

  methods: {
    getDesc(test: TestCase) {
      if (test.status_description !== "") {
        return test.status_description;
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
