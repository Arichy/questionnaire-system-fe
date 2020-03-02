<template>
  <div class="wrapper">
    <div class="question">
      <span class="title ant-form-item-required"
        >{{ index + 1 }}. {{ question.question_name }}</span
      >

      <Alert
        type="error"
        v-if="err === true"
        :message="'必选一个'"
        :style="{ marginTop: '20px' }"
      />
    </div>
    <div class="options">
      <RadioGroup
        :name="`${index}`"
        :buttonStyle="'solid'"
        :value="value"
        @change="handleChange"
        :disabled="forceDisable || status !== 1"
        class="radio-group"
      >
        <Radio
          v-for="option of question.options"
          :key="option"
          :value="option"
          class="option"
          >{{ option }}</Radio
        >
      </RadioGroup>
    </div>
  </div>
</template>

<script>
import { Radio, Alert } from "ant-design-vue";
import e from "@/utils/event";

const { Group: RadioGroup } = Radio;

export default {
  name: "SingleChoice",
  props: ["index", "question", "value", "err", "status"],
  components: { Radio, RadioGroup, Alert },
  data() {
    return {
      forceDisable: false,
    };
  },
  methods: {
    handleChange(e) {
      this.$emit("change", e.target.value);
    },
  },
  mounted() {
    e.on("submit", () => {
      this.forceDisable = true;
    });
  },
  beforeDestroy() {
    e.off("submit");
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  .question {
    color: #444;
    font-size: 20px;
    padding: 10px;

    .title {
      font-size: 15px;
      color: #444;
      font-weight: bold;
    }
  }

  .options {
    color: #333;
    font-size: 15px;
    margin-left: 30px;
    margin-top: 20px;

    .radio-group {
      display: flex;
      flex-direction: column;

      .option {
        margin-bottom: 10px;
      }
    }
  }
}
</style>
