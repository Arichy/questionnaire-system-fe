<script>
import { Checkbox, Alert } from "ant-design-vue";

import Checkbox2 from "./CheckboxGroup/index.jsx";

const { Group: CheckboxGroup } = Checkbox;

export default {
  name: "MultipleChoice",
  props: ["index", "question", "value", "err", "status"],
  components: { Checkbox2 },
  // data() {
  //   return {
  //     value: [],
  //   };
  // },
  methods: {
    handleChange(value) {
      this.$emit("change", value);
    },
  },

  render(h) {
    const { index, question, value, err, status } = this;
    return (
      <div class="wrapper">
        <div class="question">
          <span class="title ant-form-item-required">
            {index + 1}. {question.question_name}
          </span>

          <span class="option-max-num">
            （最多可选
            {question.option_max_num}项）
          </span>
          {err === true ? (
            <Alert
              type={"error"}
              message={`请选择1-${question.option_max_num}项`}
              style={{ marginTop: "20px" }}
            />
          ) : null}
        </div>
        <div class="options">
          <Checkbox2
            options={question.options}
            maxNum={question.option_max_num}
            value={value}
            onChange={this.handleChange}
            status={status}
          />
        </div>
      </div>
    );
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

    .option-max-num {
      color: #666;
      font-size: 15px;
    }
  }

  .options {
    color: #666;
    margin-left: 30px;
    margin-top: 20px;

    .option {
      margin-bottom: 10px;
    }
  }
}
</style>
