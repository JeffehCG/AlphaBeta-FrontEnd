<template>
    <div class="listExercise">
        <b-form class="searchExercise">
            <b-row>
                <b-col md = "4" sm ="12">
                    <div class="search">
                        <b-row>
                            <b-form-group label = "Pesquisar:" label-for="lb-pesquisa">
                                <b-form-input id="lb-content" v-model="search.content"></b-form-input>
                            </b-form-group>
                            <b-form-group label = "Por:" label-for="lb-campo">
                                <select placeholder="Selecione o campo" v-model="search.field">
                                    <option value="cd_exercicio">Codigo</option>
                                    <option value="ds_classificacao">Titulo</option>
                                </select>
                            </b-form-group>
                            <b-button variant = "primary" class="fa fa-search" @click="searchExercise"></b-button>
                        </b-row>
                    </div>
                </b-col>
                    <b-form-group label = "Tipo de Exercicio: " label-for="lb-tipo">
                        <select @change="searchExerciseType" placeholder="Selecione o campo" v-model="search.type">
                            <option value="todos">Todos</option>
                            <option value="dragDrop.js">Dragdrop</option>
                        </select>
                    </b-form-group>
            </b-row>
        </b-form>

        <hr>

        <ul>
            <li v-for="exercise in exercises" :key="exercise.cd_exercicio">
                <ItemExercise :exercise= "exercise"/>
            </li>
            <span v-if="exercises == false">Nenhum Exercicio Disponivel</span>
        </ul>
        <div class="load-more"> <!--Botão para efetuar a paginação-->
            <button v-if="loadMore"
                class="btn btn-lg btn-outline-primary"
                @click="loadExercises">Carregar Mais Exercicios</button>
        </div>
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
            exercises: [],
            page: 1,
            loadMore: true,
            search : {}
        }
    },
    methods:{
        async loadExercises(){
            if(this.user.teacher){
                const url = `${baseApiUrl}/teacher/exerciseComplete/${this.user.cpf}?page=${this.page}`
                axios.get(url)
                    .then(res =>{
                        this.exercises = this.exercises.concat(res.data)
                        this.page++

                        if(res.data.length === 0 ) this.loadMore = false
                    })
                    .catch(showError)
            }else{
                const url = `${baseApiUrl}/student/exerciseComplete/${this.user.cpf}?page=${this.page}`
                axios.get(url)
                    .then(res => {
                        this.exercises = this.exercises.concat(res.data)
                        this.page++

                        if(res.data.length === 0 ) this.loadMore = false
                    })
                    .catch(showError)
            }
        },
        async searchExercise(){
            if(this.user.teacher){
                const url = `${baseApiUrl}/searcheExerciceTeacher/${this.user.cpf}`
                await axios.post(url,this.search)
                    .then(res =>{
                        this.exercises = res.data
                        this.loadMore = false
                    })
                    .catch(showError)
            }
            else{
                const url = `${baseApiUrl}/searcheExerciceStudent/${this.user.cpf}`
                await axios.post(url,this.search)
                    .then(res =>{
                        this.exercises = res.data
                        this.loadMore = false
                    })
                    .catch(showError)
            }
        },
        searchExerciseType(){
            if(this.search.type === 'todos'){
                this.page = 1
                this.loadMore = true
                this.exercises = []
                this.loadExercises()
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

    .listExercise .load-more {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 25px;
    }
</style>
