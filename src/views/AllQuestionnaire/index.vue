<script>
import CQT from "@/components/QuestionnaireManager/ClientQuestionnaireTable";
import IO from "./api";

export default {
  name: "AllQuestionnaire",

  render(h) {
    return (
      <div>
        <CQT ioMethod={IO.getAllQuestionnaire} pageSize={10} />
      </div>
    );
  },
};
</script>
