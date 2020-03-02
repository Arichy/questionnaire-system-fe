<template>
  <div class="container">
    <div class="wrapper">
      <Design
        :questionnaire="questionnare"
        @change="handleChange"
        @rangePickerChange="handleRangePickerChange"
        @deleteQuestion="handleDeleteQuestion"
        @addQuestion="addQuestion"
        @postQuestionnaire="postQuestionnaire"
      />
      <Preview
        :style="{ marginLeft: '30px' }"
        :questionnaire="questionnare"
        :isPreview="true"
      />
    </div>
  </div>
</template>

<script>
import { Card, message } from "ant-design-vue";
import Design from "@/components/QuestionnaireManager/New/Design";
import Preview from "@/components/QuestionnaireManager/New/Preview";

import { SINGLE_CHOICE, MULTIPLE_CHOICE } from "@/common/const";

import { get, set, cloneDeep } from "lodash-es";

import IO from "../api";

export default {
  name: "new",
  components: {
    // Card,
    Design,
    Preview,
  },
  data() {
    return {
      questionnare: { title: "", startTime: 0, endTime: 0, questionArr: [] },
    };
  },

  mounted() {
    this.questionnare = require("./mock").default;
  },

  methods: {
    handleChange({ value, key, index }) {
      const {
        questionnare: { questionArr },
      } = this;

      set(questionArr, `${index}.${key}`, value);
      // this.$set(this.questionnare, `questionArr[${index}].${key}`, value);
    },
    handleDeleteQuestion({ index }) {
      const reference = this.questionnare.questionArr;
      reference.splice(index, 1);
      this.questionnare.questionArr = reference;
    },
    addQuestion() {
      this.questionnare.questionArr.push({
        question_name: "",
        question_type: SINGLE_CHOICE,
        options: [],
        option_max_num: 1,
      });
    },
    handleRangePickerChange({ dates }) {
      let [startTime, endTime] = dates;
      if (startTime) {
        startTime = startTime.valueOf();
        this.questionnare.startTime = startTime;
        endTime = endTime.valueOf();
        this.questionnare.endTime = endTime;
      } else {
        this.questionnare.startTime = 0;
        this.questionnare.endTime = 0;
      }
    },
    async postQuestionnaire() {
      const { questionnare } = this;

      try {
        // const res = await IO.postQuestionnare(questionnare);
        const res = { success: true, msg: "成功发布问卷" };

        if (res.success) {
          message.success(res.msg);
          this.questionnare = {
            title: "",
            startTime: 0,
            endTime: 0,
            questionArr: [],
          };
        } else {
          message.error(res.msg);
        }
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  // flex-direction: row;
  // overflow: scroll;
  // justify-content: space-between;

  .wrapper {
    display: flex;
  }
}
</style>
