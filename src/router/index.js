import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

import Home from "../screens/home.vue";
import Login from "../screens/login.vue";
import Register from "../screens/register.vue";
import VerifyUser from "../screens/verify_user.vue";
import Forgot from "../screens/forgot.vue";
import Reset from "../screens/reset-password.vue";
import Post from "../screens/post.vue";
import Setting from "../screens/setting.vue";
import Chat from "../screens/chat.vue";
import Chats from "../screens/chats.vue";
import Contents from "../screens/contents.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { requiresAuth: true, index: 1 },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { requiresVisitor: true, index: 2 },
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: { requiresVisitor: true, index: 3 },
  },
  {
    path: "/verify-user",
    name: "VerifyUser",
    component: VerifyUser,
    meta: { requiresVisitor: true, index: 4 },
  },
  {
    path: "/forgot-password",
    name: "Forgot",
    component: Forgot,
    meta: { index: 5 },
  },
  {
    path: "/reset-password",
    name: "Reset",
    component: Reset,
    meta: { index: 6 },
  },
  {
    path: "/setting",
    name: "Setting",
    component: Setting,
    meta: { requiresAuth: true, index: 8 },
  },
  {
    path: "/post",
    name: "Post",
    component: Post,
    meta: { index: 9 },
  },
  {
    path: "/chat/:uri?",
    name: "Chat",
    component: Chat,
    meta: { index: 10 },
  },
  {
    path: "/contents",
    name: "Contents",
    component: Contents,
    meta: { index: 11 },
  },
  {
    path: "/chats",
    name: "Chats",
    component: Chats,
    meta: { index: 12 },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

function isLoggedIn() {
  return localStorage.getItem("isLoggedIn");
}

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!isLoggedIn()) {
      next({
        name: "Login",
      });
    } else {
      next();
    }
  } else if (to.matched.some((record) => record.meta.requiresVisitor)) {
    if (isLoggedIn()) {
      next({
        name: "Home",
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
