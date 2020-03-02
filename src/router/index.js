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

Vue.use(VueRouter);

const routes = [
  {
    name: "login",
    path: "/login",
    component: Login,
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
      },
      {
        path: "questionnaire_manager/my_post",
        component: MyPost,
      },
      {
        path: "questionnaire_manager/my_fill",
        component: MyFill,
      },
      {
        path: "questionnaire_manager/new",
        component: New,
      },
      {
        path: "user_info",
        component: UserInfo,
        props: true,
      },
    ],
  },
  {
    name: "fill_questionnaire",
    path: "/fill_questionnaire/:questionnaire_id",
    component: FillQuestionnaire,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
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
