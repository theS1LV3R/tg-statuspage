<template>
  <div
    class="testCase"
    v-bind:class="{
      ok: status === true,
      fail: status === false,
      skipped: description === 'Skipped.',
    }"
    @click.prevent="extended = !extended"
  >
    <h4 class="testCaseTitle">{{ name }}</h4>
    <p v-if="extended" class="test-description">{{ description }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    status: Boolean,
    name: String,
    description: String,
  },
  data() {
    return {
      extended: false,
    };
  },
});
</script>

<style lang="scss" scoped>
.ok {
  background-color: lightgreen;
  color: #2c3e50;
}

.fail {
  background-color: #ed2939;
  color: #2c3e50;
}

.skipped {
  background-color: orange;
  color: #2c3e50;
}

.testCase {
  border-radius: 0.25rem;
}

.testCaseTitle {
  padding: 3px;
}
</style>
