import IOCreator from "@/utils/IOCreator";

export default IOCreator({
  postQuestionnare: {
    url: "/questionnaire_manager/post",
    method: "POST",
  },
  getQuestionnaires: {
    url: "/questionnaire_manager/get",
    method: "GET",
  },
  getQuestionnairesFilledByMe: {
    url: "/questionnaire_manager/get_my_filled",
    method: "GET",
  },
});
