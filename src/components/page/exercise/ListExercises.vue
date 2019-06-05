<template>
    <div class="listExercise">
        <ul>
            <li v-for="exercise in exercises" :key="exercise.cd_exercicio">
                <ItemExercise :exercise= "exercise"/>
            </li>
            <span v-if="exercises == false">Nenhum Exercicio Disponivel</span>
        </ul>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import axios from 'axios'
import {baseApiUrl, showError} from '@/global'
import ItemExercise from './ItemExercise'

export default {
    name: 'ListExercises',
    components: {ItemExercise},
    computed: mapState(['user']),
    data: function(){
        return{
            exercises: []
        }
    },
    methods:{
        async loadExercises(){
            if(this.user.teacher){
                const url = `${baseApiUrl}/teacher/exerciseComplete/${this.user.cpf}`
                axios.get(url)
                    .then(res =>this.exercises = res.data)
                    .catch(showError)
            }else{
                const url = `${baseApiUrl}/student/exerciseComplete/${this.user.cpf}`
                axios.get(url)
                    .then(res => this.exercises = res.data)
                    .catch(showError)
            }
        }
    },
    mounted(){
        this.loadExercises()
    }
}
</script>

<style>
    .listExercise ul {
        list-style-type: none; 
        padding: 0;
    }

    .listExercise {
        /* display: flex;
        flex-direction: column;
        align-items: center; */
        margin-top: 25px;
    }
</style>
