export const siderMenuConfig = [
  {
    key: "all_questionnaire",
    title: "所有问卷",
    path: "/all_questionnaire",
    icon: "table",
  },
  {
    key: "questionnaire_manager",
    title: "问卷管理",
    path: "/questionnaire_manager",
    icon: "bars",
    subs: [
      {
        key: "new",
        title: "新建问卷",
        path: "/new",
        icon: "plus",
      },
      {
        key: "my_post",
        title: "我发布的",
        path: "/my_post",
        icon: "upload",
      },
      {
        key: "my_fill",
        title: "我填写的",
        path: "/my_fill",
        icon: "form",
      },
    ],
  },
  {
    key: "user_info",
    title: "个人信息",
    path: "/user_info",
    icon: "user",
  },
];
