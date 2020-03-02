<script>
import { Table, message } from "ant-design-vue";
import moment from "moment";

import IO from "../api";

export default {
  name: "MyFill",

  data() {
    return {
      questionnaireArr: [],
    };
  },

  methods: {
    async getQuestionnairesFilledByMe() {
      try {
        const res = await IO.getQuestionnairesFilledByMe({
          pageSize: 10,
          pageNum: 1,
        });
        this.questionnaireArr = res.data;
      } catch (err) {
        message.error(err);
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

<style></style>
