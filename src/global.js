import Vue from 'vue'

export const userKey = '__teacher_student_login_alph'
export const baseApiUrl = "http://localhost:3002"

export function showError(e){
    if(e && e.response && e.response.data){
        Vue.toasted.global.defaultError({msg: e.response.data})
    }else if(typeof e === 'string'){
        Vue.toasted.global.defaultError({msg: e})
    }else{
        Vue.toasted.global.defaultError()
    }
}

export default {baseApiUrl, showError, userKey}