


import { createWebHistory, createRouter } from "vue-router";

//import components 
import CoachDetail from './pages/coaches/CoachDetail.vue';
import CoacheList from "./pages/coaches/CoachesList.vue";
import CoachRegistration from './pages/coaches/CoachRegistration.vue';
import ContactCoach from './pages/requests/ContactCoach.vue';
import RequestsReceived from './pages/requests/RequestsReceived.vue';
import NotFound from './pages/NotFound.vue';
//import components

//declare routers
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/', redirect: '/coaches' },
        {path: '/coaches', component: CoacheList},
        {
            path: '/coaches/:id' ,  
            component: CoachDetail, 
            props: true,
            children: [
             {path: 'contact', component: ContactCoach} 
            ]
        },
        {path: '/register', component: CoachRegistration},
        {path: '/requests', component: RequestsReceived},
        {path: '/:notFound(.*)', component: NotFound},
    ],
});
//declare routers

export default router;

