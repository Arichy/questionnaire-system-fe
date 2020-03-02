<script>
import { Spin, message } from "ant-design-vue";
import Preview from "@/components/QuestionnaireManager/New/Preview";

import IO from "./api";
import { SINGLE_CHOICE, MULTIPLE_CHOICE, STATUS } from "@/common/const";
import { isArray, entries, chain } from "lodash-es";

import e from "@/utils/event";

export default {
  name: "FillQuestionnaire",

  data() {
    return {
      questionnaire: { title: "", questionArr: [] },
      errQuestionIdArr: [],
      exists: true,
      status: 0,
      isLoading: true,
    };
  },

  mounted() {
    this.getQuestionnaire();
  },

  methods: {
    async getQuestionnaire() {
      try {
        const { questionnaire_id } = this.$route.params;
        const res = await IO.getQuestionnaire({ questionnaire_id });
        if (res.success) {
          const { data, status } = res;
          data.title = data.questionnaire_name;
          data.questionArr = data.questions;

          document.title = data.title || "填写问卷";

          this.questionnaire = data;
          this.status = status;
        } else {
          this.exists = false;
        }
      } catch (err) {
        console.error(err);
      } finally {
        this.isLoading = false;
      }
    },

    singleChoiceChecker(value) {
      return ![null, undefined, ""].includes(value);
    },
    multipleChoiceChecker(value, option_max_num) {
      if (!isArray(value)) {
        return false;
      }
      return value.length <= option_max_num && value.length >= 1;
    },

    formChecker(form) {
      const result = [];
      for (const question of this.questionnaire.questionArr) {
        const { question_id, question_type, option_max_num } = question;
        const answer = form[question_id];

        const checkResult = {
          [SINGLE_CHOICE]: this.singleChoiceChecker(answer),
          [MULTIPLE_CHOICE]: this.multipleChoiceChecker(answer, option_max_num),
        }[question_type];

        if (!checkResult) {
          result.push(question_id);
        }
      }

      return result;
    },

    async handleSubmit(form) {
      const checkResult = this.formChecker(form);
      if (checkResult.length > 0) {
        this.errQuestionIdArr = checkResult;
      } else {
        this.errQuestionIdArr = [];
        try {
          const { questionnaire_id } = this.$route.params;
          const answers = chain(form)
            .entries()
            .map(([question_id, answer]) => ({ question_id, answer }))
            .value();
          const params = { questionnaire_id, answers };

          const res = await IO.fillQuestionnaire(params);

          if (res.success) {
            message.success("填写成功");
            e.emit("submit");
          } else {
            message.error(res.msg);
          }
        } catch (err) {
          console.log(err);
          message.error(err);
        }
      }
    },
  },

  render(h) {
    const { status, isLoading, exists } = this;
    return (
      <div class="container">
        <Spin spinning={isLoading} size={"large"}>
          <div class="wrapper">
            {exists ? (
              <Preview
                isPreview={false}
                questionnaire={this.questionnaire}
                onSubmit={this.handleSubmit}
                errQuestionIdArr={this.errQuestionIdArr}
                status={status}
              />
            ) : (
              <div>问卷不存在</div>
            )}
          </div>
        </Spin>
      </div>
    );
  },
};
</script>

<style lang="scss" scoped>
.container {
  background-image: url("./bg.jpg");
  background-repeat: repeat-x;
  background-size: 1px 300px;
  background-color: #f3f6fa;
  padding-bottom: 30px;

  .wrapper {
    display: flex;
    justify-content: center;
    min-height: 100%;

    padding-top: 120px;
    background: url("./banner.jpg") no-repeat top center;
    background-size: 800px 144px;
  }
}
</style>
