import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/components/page/Home'
import Profile from '@/components/page/Profile'
import Auth from '@/components/auth/Auth'
import ListClassroom from '@/components/page/classroom/ListClassroom'
import ClassroomById from '@/components/page/classroom/ClassroomById'
import BuildExercise from '@/components/page/exercise/Dropdown'
import ListExercises from '@/components/page/exercise/ListExercises'
import ViewExercise from '@/components/page/exercise/ViewExercise'

import {userKey} from '@/global'

Vue.use(VueRouter)

const routes = [{
    name: 'home',
    path: '/',
    component: Home
},{
    name: 'profile',
    path: '/profile',
    component: Profile
},{
    name: 'auth',
    path: '/auth',
    component: Auth
},{
    name: 'classroom',
    path: '/classroom',
    component: ListClassroom
},{
    name: 'classroomById',
    path: '/classroom/:id',
    component: ClassroomById
},{
    name: 'buildExercise',
    path: '/buildExercise',
    component: BuildExercise
},{
    name: 'buildExerciseAdd',
    path: '/buildExerciseAdd/',
    component: BuildExercise
},{
    name: 'listExercise',
    path: '/listExercise',
    component: ListExercises
},{
    name: 'viewExercise',
    path: '/viewExercise/:id',
    component: ViewExercise
},{
    name: 'updateExercise',
    path: '/updateExercise/:id',
    component: BuildExercise
}]

const router = new VueRouter({
    mode: 'history',
    routes: routes
})

router.beforeEach((to, from, next) => {
    const json = localStorage.getItem(userKey)

    if(to.matched.some(record => record.meta.requiresTeacher)){
        const user = JSON.parse(json)
        user && user.teacher ? next() : next({path: '/'})
    }else{
        next()
    }
})

export default router