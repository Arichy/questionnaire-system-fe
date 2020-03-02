<script>
import { Card, Button, Alert, Tag } from "ant-design-vue";

import SinglechoiceItem from "./QuestionItem/Singlechoice";
import MultiplechoiceItem from "./QuestionItem/Multiplechoice";

import { SINGLE_CHOICE, MULTIPLE_CHOICE, STATUS } from "@/common/const";

import { includes } from "lodash-es";

import e from "@/utils/event";

export default {
  name: "preview",
  props: ["questionnaire", "isPreview", "errQuestionIdArr", "status"],
  data() {
    return {
      form: {},
      previewValue: [],
      forceDisabled: false,
    };
  },

  watch: {
    status(newStatus) {
      if (newStatus === -1) {
        const { questionArr } = this.questionnaire;
        for (const { question_id, answer } of questionArr) {
          this.$set(this.form, question_id, answer);
        }
      }
    },
  },
  mounted() {
    e.on("submit", () => {
      console.log("submit");
      this.forceDisabled = true;
    });
  },

  beforeDestroy() {
    e.off("submit");
  },

  render(h) {
    const {
      isPreview,
      questionnaire,
      form,
      previewValue,
      errQuestionIdArr = [],
      status,
    } = this;

    return (
      <Card
        class="preview-area"
        title={isPreview ? "预览" : ""}
        bodyStyle={isPreview ? {} : { padding: 0 }}
        bordered={isPreview}
      >
        <div
          class="preview-wrapper"
          style={
            isPreview
              ? {}
              : {
                  boxShadow: " 0px 1px 6px 0px rgba(205, 220, 245, 1)",
                  padding: "0 24px 70px",
                }
          }
        >
          <div class="title" style={isPreview ? {} : { paddingTop: "40px" }}>
            <span
              style={[
                { color: "#5A83E5", fontSize: "24px", fontWeight: "bold" },
              ]}
            >
              {questionnaire.title}
            </span>
            {!isPreview &&
              status !== STATUS.IN_PROGRESS &&
              (() => {
                const { color, text } = {
                  [STATUS.FILLED]: { color: "#2db7f5", text: "你已填过此问卷" },
                  [STATUS.NOT_START]: { color: "#108ee9", text: "未开始" },
                  [STATUS.OUT_OF_DATE]: { color: "#f50", text: "已结束" },
                }[status];

                return (
                  <Tag style={{ marginLeft: "30px" }} color={color}>
                    {text}
                  </Tag>
                );
              })()}
          </div>
          {questionnaire.questionArr.map((question, index) => {
            switch (question.question_type) {
              case SINGLE_CHOICE:
                return (
                  <SinglechoiceItem
                    question={question}
                    index={index}
                    value={
                      !isPreview
                        ? form[question.question_id]
                        : previewValue[index]
                    }
                    onChange={value =>
                      !isPreview
                        ? this.handleChange(question.question_id, value)
                        : this.handlePreviewChange(index, value)
                    }
                    err={includes(errQuestionIdArr, question.question_id)}
                    status={isPreview ? 1 : status}
                  />
                );
              case MULTIPLE_CHOICE:
                return (
                  <MultiplechoiceItem
                    question={question}
                    index={index}
                    onChange={value =>
                      !isPreview
                        ? this.handleChange(question.question_id, value)
                        : this.handlePreviewChange(index, value)
                    }
                    value={
                      !isPreview
                        ? form[question.question_id]
                        : previewValue[index]
                    }
                    err={includes(errQuestionIdArr, question.question_id)}
                    status={isPreview ? 1 : status}
                  />
                );
            }
          })}

          {!isPreview && !this.forceDisabled ? (
            <Button
              class="btn-submit"
              type={"primary"}
              onClick={this.handleSubmit}
              disabled={status !== 1}
            >
              提交
            </Button>
          ) : null}
        </div>
      </Card>
    );
  },

  methods: {
    handleChange(question_id, value) {
      this.$set(this.form, question_id, value);
    },
    handlePreviewChange(index, value) {
      this.$set(this.previewValue, index, value);
    },
    handleSubmit() {
      this.$emit("submit", this.form);
    },
  },
};
</script>

<style lang="scss" scoped>
.preview-area {
  width: 800px;
  min-height: 1000px;

  .preview-wrapper {
    display: flex;
    flex-direction: column;

    .title {
      color: #000;
      font-size: 30px;
      text-align: center;
    }

    .btn-submit {
      width: 70px;
      align-self: center;
      margin-top: 30px;
    }
  }
}
</style>
