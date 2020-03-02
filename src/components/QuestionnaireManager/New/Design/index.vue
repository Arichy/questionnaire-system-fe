<template>
  <Card class="design-area" title="设计">
    <Input addonBefore="问卷标题" v-model="questionnaire.title" />
    <Divider :dashed="true" />
    <div>
      <div class="btn-group">
        <Button
          class="btn-item btn-add-question"
          type="primary"
          @click="addQuestion"
          ><Icon type="plus" />增加问题</Button
        >
        起止时间
        <RangePicker
          class="btn-item"
          :locale="zh_CN"
          :format="'YYYY-MM-DD HH:mm'"
          :showTime="{ format: 'HH:mm' }"
          @ok="handleRangePickerChange"
        />
      </div>
    </div>

    <Table
      class="table-question"
      :dataSource="questionnaire.questionArr"
      :columns="columns"
      bordered
      :scroll="{ x: '100%' }"
      :pagination="false"
    />

    <Button
      class="btn-item btn-submit"
      type="primary"
      @click="$emit('postQuestionnaire')"
      ><Icon type="upload" />发布问卷</Button
    >
  </Card>
</template>

<script>
import {
  Card,
  Input,
  Table,
  Button,
  Divider,
  Select,
  Icon,
  InputNumber,
  Tag,
  message,
  Popconfirm,
  DatePicker,
} from "ant-design-vue";

import zh_CN from "ant-design-vue/lib/date-picker/locale/zh_CN";

import { SINGLE_CHOICE, MULTIPLE_CHOICE } from "@/common/const";
import { QUESTION_TYPES } from "@/common/config";

import { get } from "lodash-es";

const { Option } = Select;
const { RangePicker } = DatePicker;

export default {
  name: "design",
  props: ["questionnaire"],
  components: {
    Card,
    Input,
    Table,
    Button,
    Divider,
    Icon,
    RangePicker,
  },
  data() {
    return {
      zh_CN,
      questionTypes: QUESTION_TYPES,
      inputVisible: false,
      inputValue: "",
      inputIndex: -1,
      columns: [
        {
          title: "序号",
          dataIndex: "index",
          customRender: (value, record, index) => (
            <div style={{ width: "50px" }}>{index + 1}</div>
          ),
        },
        {
          title: "题目",
          dataIndex: "question_name",
          customRender: (value, record, index) => {
            return (
              <Input
                onChange={e =>
                  this.handleChange(e.target.value, "question_name", index)
                }
                value={value}
                style={{ width: "300px" }}
              />
            );
          },
        },
        {
          title: "题目类型",
          dataIndex: "question_type",
          customRender: (value, record, index) => {
            return (
              <Select
                class="select"
                placeholder="请选择问题类型"
                value={value}
                onChange={value => {
                  this.handleChange(value, "question_type", index);
                  this.$emit("change", {
                    value: 1,
                    key: "option_max_num",
                    index,
                  });
                }}
              >
                {this.questionTypes.map(({ label, value }) => (
                  <Option value={value}>{label}</Option>
                ))}
              </Select>
            );
          },
          // width: 300,
        },
        {
          title: "选项",
          dataIndex: "options",
          customRender: (value, record, index) => {
            return (
              <div
                style={{
                  whiteSpace: "normal",
                }}
              >
                {value.map(option => (
                  <Tag
                    key={option}
                    closable
                    onClose={() => this.handleClose(option, index)}
                    color="blue"
                    style={{ marginBottom: "10px" }}
                  >
                    {option}
                  </Tag>
                ))}
                {this.inputVisible && index == this.inputIndex ? (
                  <Input
                    ref="input"
                    type="text"
                    size="small"
                    style={{ width: "78px" }}
                    value={this.inputValue}
                    onChange={this.handleInputChange}
                    onBlur={() => this.handleInputConfirm(index)}
                    onKeyup={e => {
                      if (e.keyCode === 13) {
                        this.handleInputConfirm(index);
                      }
                    }}
                  />
                ) : (
                  <Tag
                    onClick={() => this.showInput(index)}
                    style="background: #fff; borderStyle: dashed;"
                    color="orange"
                  >
                    <Icon type="plus" /> 新增选项
                  </Tag>
                )}
              </div>
            );
          },
          width: 300,
        },
        {
          title: "最多可选",
          dataIndex: "option_max_num",
          customRender: (value, record, index) => {
            const { question_type, options } = record;

            return (
              <InputNumber
                onChange={value =>
                  this.handleChange(value, "option_max_num", index)
                }
                value={value}
                disabled={question_type === SINGLE_CHOICE}
                min={1}
                max={options.length}
              />
            );
          },
          // width: 100,
        },
        {
          title: "操作",
          dataIndex: "operation",
          customRender: (value, record, index) => {
            return (
              <Popconfirm
                title={"确定删除这个问题吗？"}
                okText={"确定"}
                cancelText={"取消"}
                onConfirm={() => this.handleDeleteQuestion(index)}
              >
                <a>删除</a>
              </Popconfirm>
            );
          },
          // width: 100,
        },
      ],
    };
  },

  methods: {
    addQuestion() {
      this.$emit("addQuestion");
    },
    handleRangePickerChange(dates) {
      this.$emit("rangePickerChange", { dates });
    },

    handleChange(value, key, index) {
      this.$emit("change", { value, key, index });
    },

    showInput(index) {
      this.inputVisible = true;
      this.inputIndex = index;
      this.$nextTick(() => {
        const oInput = get(this, "$refs.input");
        if (oInput) {
          oInput.focus();
        }
      });
    },
    handleInputChange(e) {
      const { value } = e.target;
      this.inputValue = value;
    },
    resetInput() {
      this.inputVisible = false;
      this.inputValue = "";
      this.inputIndex = -1;
    },
    handleInputConfirm(index) {
      const {
        inputValue: value,
        questionnaire: { questionArr },
      } = this;

      if (!value) {
        this.resetInput();
        return;
      }

      const { options } = questionArr[index];
      if (options.includes(value)) {
        message.error("同一个问题的选项不可重复");
        this.resetInput();
        return;
      }

      this.handleChange([...options, value], "options", index);
      this.resetInput();
    },
    handleClose(option, index) {
      const options = get(
        this,
        `questionnaire.questionArr[${index}].options`,
        [],
      );
      const newOptions = options.filter(opt => opt !== option);

      this.handleChange(newOptions, "options", index);
    },

    handleDeleteQuestion(index) {
      this.$emit("deleteQuestion", { index });
    },
  },
};
</script>

<style lang="scss">
.design-area {
  // width: 1300px;
  width: 800px;
  min-height: 1000px;

  .select {
    width: 150px;
    margin-right: 30px;
  }

  .btn-group {
    .btn-item {
      margin-right: 30px;
    }
  }

  .table-question {
    margin-top: 50px;

    td {
      white-space: nowrap;
    }
  }

  .btn-submit {
    margin-top: 30px;
  }
}
</style>
