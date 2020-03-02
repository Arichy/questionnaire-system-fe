import { SINGLE_CHOICE, MULTIPLE_CHOICE } from "@/common/const";

export default {
  title: "武汉大学生调查问卷",
  startTime: 0,
  endTime: 0,
  questionArr: [
    {
      question_name: "你就读于哪所大学",
      question_type: SINGLE_CHOICE,
      options: ["武汉大学", "华中科技大学", "北京大学"],
      option_max_num: 1,
    },
    {
      question_name: "你会下面哪种语言",
      question_type: MULTIPLE_CHOICE,
      options: ["Java", "JavaScrit", "Python", "TypeScript"],
      option_max_num: 2,
    },
  ],
};
