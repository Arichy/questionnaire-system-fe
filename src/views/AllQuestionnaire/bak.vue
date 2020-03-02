<script>
import { Table } from "ant-design-vue";
import moment from "moment";

import IO from "./api";

export default {
  name: "AllQuestionnaire",

  data() {
    return {
      questionnaireArr: [],
    };
  },

  mounted() {
    this.getAllQuestionnaire();
  },

  methods: {
    async getAllQuestionnaire() {
      try {
        const res = await IO.getAllQuestionnaire();
        this.questionnaireArr = res.data;
      } catch (err) {
        console.error(err);
      }
    },
  },

  render(h) {
    const columns = [
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
        customRender: value => moment(value).format("YYYY-MM-DD HH:mm"),
      },
      {
        title: "结束时间",
        dataIndex: "end_time",
        customRender: value => moment(value).format("YYYY-MM-DD HH:mm"),
      },
    ];
    return (
      <div>
        <Table dataSource={this.questionnaireArr} columns={columns} />
      </div>
    );
  },
};
</script>

<style lang="scss" scoped></style>
