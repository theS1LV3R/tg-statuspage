<template>
  <div
    class="testCase"
    v-bind:class="{
      ok: status === 'ok',
      fail: status === 'fail',
      skipped: status === 'skipped',
    }"
  >
    <h4 class="testCaseTitle">{{ name }}</h4>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Test",
  props: {
    status: String,
    name: String,
  },
});
</script>

<style lang="scss" scoped>
.ok {
  background-color: lightgreen;
}

.fail {
  background-color: #ed2939;
}

.skipped {
  background-color: orange;
}

.testCase {
  border-radius: 0.25rem;
}

.testCaseTitle {
  padding: 3px;
}
</style>
