import Vue from "vue";
import VueRouter from "vue-router";

import Login from "@/views/Login";
// import Signup from "@/views/Signup.vue";

import Index from "@/views/Index";

import AllQuestionnaire from "@/views/AllQuestionnaire";
import New from "@/views/QuestionnareManager/New";
import MyPost from "@/views/QuestionnareManager/MyPost";
import MyFill from "@/views/QuestionnareManager/MyFill";
import UserInfo from "@/views/UserInfo";
import FillQuestionnaire from "@/views/FillQuestionnaire";

import { get } from "lodash-es";

Vue.use(VueRouter);

const routes = [
  {
    name: "login",
    path: "/login",
    component: Login,
    meta: {
      title: "调查问卷系统 - 登陆",
    },
  },
  {
    name: "index",
    path: "/",
    component: Index,
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: "all_questionnaire",
        component: AllQuestionnaire,
        meta: {
          title: "调查问卷系统 - 所有问卷",
        },
      },
      {
        path: "questionnaire_manager/my_post",
        component: MyPost,
        meta: {
          title: "调查问卷系统 - 我发布的",
        },
      },
      {
        path: "questionnaire_manager/my_fill",
        component: MyFill,
        meta: {
          title: "调查问卷系统 - 我填写的",
        },
      },
      {
        path: "questionnaire_manager/new",
        component: New,
        meta: {
          title: "调查问卷系统 - 新建问卷",
        },
      },
      {
        path: "user_info",
        component: UserInfo,
        props: true,
        meta: {
          title: "调查问卷系统 - 个人信息",
        },
      },
    ],
  },
  {
    name: "fill_questionnaire",
    path: "/fill_questionnaire/:questionnaire_id",
    component: FillQuestionnaire,
    meta: {
      title: "填写问卷",
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

const defaultTitle = "调查问卷系统";

router.beforeEach((to, from, next) => {
  document.title = get(to, "meta.title", defaultTitle);
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!sessionStorage.getItem("token")) {
      next("/login");
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
