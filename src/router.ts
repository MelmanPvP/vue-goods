import VLayout from "./components/VLayout.vue";
import VOrder from "./components/VOrder.vue";
import VCreateOrder from "./components/VCreateOrder.vue";
import { createRouter, createWebHistory} from "vue-router";

const routes = [
    {path:'/',component:VLayout},
    {path:'/order',component: VOrder},
    {path:'/create',component:VCreateOrder }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router