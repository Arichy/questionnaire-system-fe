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
      questionnare: {
        title: "",
        startTime: 0,
        endTime: 0,
        questionArr: [],
      },
    };
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
      if (!questionnare.title) {
        return message.error("请输入问卷标题");
      }

      if (questionnare.questionArr.length <= 0) {
        return message.error("请添加至少一个问题");
      }

      if (!questionnare.startTime || !questionnare.endTime) {
        return message.error("请选择开始时间和结束时间");
      }

      for (const item of questionnare.questionArr) {
        if (!item.question_name) {
          return message.error("题目不能为空");
        }
        if (item.options.length <= 0) {
          return message.error("选项不能为空");
        }
      }

      try {
        const res = await IO.postQuestionnare(questionnare);

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
    align-items: flex-start;
    padding-right: 20px;
  }
}
</style>
