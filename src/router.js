import Vue from "vue";
import Router from "vue-router";
import Store from "./store";

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base:"/dist",
  routes: [
    {
      path: "/",
      name: "loginOne",
      component: () =>
        import("./views/loginOne.vue")

    },
    {
      path: "/loginTwo",
      name: "loginTwo",
      component: () =>
        import("./views/loginTwo.vue")

    },
    {
      path: "/gsdjList",
      name: "gsdjList",
      component: () =>
        import("./views/gsdj/list.vue")

    },

    {
      path: "/gsdjMsg",
      name: "gsdjMsg",
      component: () =>
        import("./views/gsdj/msg.vue")

    },
    {
      path: "/blkzList",
      name: "blkzList",
      component: () =>
        import("./views/blkz/list.vue")

    },
    {
      path: "/blkzMsg",
      name: "blkzMsg",
      component: () =>
        import("./views/blkz/msg.vue")

    },
    {
      path: "/blkzCart",
      name: "blkzCart",
      component: () =>
        import("./views/blkz/cart.vue")

    },
    {
      path: "/blkzPay",
      name: "blkzPay",
      component: () =>
        import("./views/blkz/pay.vue")

    },
    {
      path: "/yhywList",
      name: "yhywList",
      component: () =>
        import("./views/yhyw/list.vue")

    },
    {
      path: "/yhywApply",
      name: "yhywApply",
      component: () =>
        import("./views/yhyw/apply.vue")

    },
    {
      path: "/yhywMsg",
      name: "yhywMsg",
      component: () =>
        import("./views/yhyw/msg.vue")

    },
    {
      path: "/swApply",
      name: "swApply",
      component: () =>
        import("./views/sw/apply.vue")
    },
    {
      path: "/swMsg",
      name: "swMsg",
      component: () =>
        import("./views/sw/msg.vue")
    },
  ]
});
const permitList = ["loginOne", "loginTwo"];//白名单
router.beforeEach((to, from, next) => {
  //console.log(Store.state)
  
  if (Store.state.isFlag) {
    if (permitList.indexOf(to.name) == -1) {
      next()
    } else {
      next({
        name: 'gsdjList' // 跳转到登录页
      })
    }
  } else {
    if (permitList.indexOf(to.name) == -1) {
      next({
        name: 'loginOne' // 跳转到登录页
      })
    } else {
      next()
    }

  }

})

export default router;