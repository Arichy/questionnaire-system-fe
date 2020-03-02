import IOCreator from "@/utils/IOCreator";

export default IOCreator({
  getQuestionnaire: {
    url: "/get_questionnaire",
    method: "GET",
  },
  fillQuestionnaire: {
    url: "/fill_questionnaire",
    method: "POST",
  },
});
