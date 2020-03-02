<script>
import { Table, Spin, message } from "ant-design-vue";
import moment from "moment";

import { STATUS } from "@/common/const";

import { isArray } from "lodash-es";

const timeRender = value => moment(value).format("YYYY-MM-DD HH:mm");

export default {
  name: "ClientQuestionnaireTable",

  props: {
    ioMethod: {
      type: Function,
      required: true,
    },
    pageSize: {
      type: Number,
      default: 10,
    },
    extraColumns: {
      type: Array,
    },
  },

  data() {
    return {
      isLoading: false,
      questionnaireArr: [],
      total: 0,
      current: 1,
    };
  },

  computed: {
    pagination() {
      return {
        pageSize: this.$props.pageSize,
        total: this.total,
        current: this.current,
        showTotal: total => `共 ${total} 个`,
      };
    },
    columns() {
      const defaultColumns = [
        {
          title: "问卷名",
          dataIndex: "questionnaire_name",
          customRender: (value, record, index) => (
            <router-link
              to={`/fill_questionnaire/${record.questionnaire_id}`}
              target="_blank"
            >
              {value}
            </router-link>
          ),
        },
        {
          title: "开始时间",
          dataIndex: "start_time",
          customRender: timeRender,
        },
        {
          title: "结束时间",
          dataIndex: "end_time",
          customRender: timeRender,
        },
        {
          title: "状态",
          dataIndex: "status",
          customRender: value => {
            const { color, text } = {
              [STATUS.NOT_START]: { color: "#108ee9", text: "未开始" },
              [STATUS.IN_PROGRESS]: { color: "#52c41a", text: "进行中" },
              [STATUS.OUT_OF_DATE]: { color: "#f50", text: "已结束" },
            }[value];

            return <span style={{ color }}>{text}</span>;
          },
        },
      ];

      const { extraColumns } = this.$props;

      if (isArray(extraColumns)) {
        for (const { index, ...rest } of extraColumns) {
          defaultColumns.splice(index, 0, rest);
        }
      }

      return defaultColumns;
    },
  },

  mounted() {
    this.getQuestionnaire();
  },

  methods: {
    async getQuestionnaire() {
      const { pageSize, ioMethod, pagination } = this;
      try {
        this.isLoading = true;
        const res = await ioMethod({ pageSize, pageNum: pagination.current });
        this.questionnaireArr = res.data;
        this.total = res.total;
      } catch (err) {
        console.log(err);
        message.error(err);
      } finally {
        this.isLoading = false;
      }
    },

    handlePageChange({ current, pageSize, total }) {
      this.current = current;
      this.pageSize = pageSize;

      this.getQuestionnaire();
    },
  },

  render(h) {
    const {
      isLoading,
      questionnaireArr,
      pagination,
      IOMethod,
      pageSize,
      columns,
    } = this;

    return (
      <Spin spinning={isLoading}>
        <Table
          dataSource={questionnaireArr}
          columns={columns}
          rowKey={"questionnaire_id"}
          pagination={pagination}
          onChange={this.handlePageChange}
        />
      </Spin>
    );
  },
};
</script>

<style lang="scss" scoped></style>
