<script>
import CQT from "@/components/QuestionnaireManager/ClientQuestionnaireTable";
import IO from "../api";
import moment from "moment";

export default {
  name: "AllQuestionnaire",

  render(h) {
    const extraColumns = [
      {
        index: 3,
        title: "提交时间",
        dataIndex: "commit_time",
        customRender: value => moment(value).format("YYYY-MM-DD HH:mm"),
      },
    ];
    return (
      <div>
        <CQT
          ioMethod={IO.getQuestionnairesFilledByMe}
          pageSize={10}
          extraColumns={extraColumns}
        />
      </div>
    );
  },
};
</script>
