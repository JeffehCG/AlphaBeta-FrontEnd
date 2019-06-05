<template>
    <div class="clasroom">
        <div class="form-content">
            <div class="form-buttons">
                <b-button v-if="!addNewClass && user.teacher" variant = "primary" class="fa fa-pencil" @click="addNewClass = !addNewClass">Nova Turma </b-button>
                <b-button v-if="addNewClass" variant = "danger" class="fa fa-pencil" @click="addNewClass = !addNewClass">Cancelar </b-button>
            </div>
            <b-form v-if="addNewClass" class="form-inputs">
                <b-row>
                <b-col md = "6" sm = "12">
                    <b-form-group label = "Nivel da Turma:" label-for="lb-nivel">
                        <b-form-input id = "lb-nivel" v-model="classroom.nivel_turma"></b-form-input>
                    </b-form-group>
                </b-col>
                <b-col md = "6" sm = "12">
                    <b-form-group label = "Ano de Inicio:" label-for="lb-inico">
                        <b-form-input id = "lb-inicio" v-model="classroom.aa_inicio"></b-form-input>
                    </b-form-group>
                </b-col>
            </b-row>
            </b-form>
            <div v-if="addNewClass" class="form-buttons">
                <b-button variant = "success" class="fa fa-check" @click="insertClassroom">Cadastrar </b-button>
            </div>
        </div>
        <ul>
            <li v-for="classroom in classes" :key="classroom.cd_turma">
                <ItemClassroom :classroom= "classroom"/>
            </li>

            <span v-if="classes == false">Nenhuma Classe Disponivel</span>
        </ul>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import axios from 'axios'
import {baseApiUrl, showError} from '@/global'
import ItemClassroom from './ItemClassroom'

export default {
    name: 'ListClassroom',
    components: {ItemClassroom},
    computed: mapState(['user']),
    data: function(){
        return{
            classes: [],
            addNewClass: false,
            classroom: {}
        }
    },
    methods: {
        async loadClasses(){
            if(this.user.teacher){
                const url = `${baseApiUrl}/teacher/classroom/${this.user.cpf}`
                axios.get(url)
                    .then(res =>this.classes = res.data)
                    .catch(showError)
            }else{
                const url = `${baseApiUrl}/student/classroom/${this.user.cpf}`
                axios.get(url)
                    .then(res => this.classes = res.data)
                    .catch(showError)
            }
        },

        async insertClassroom(){
            this.classroom.cd_cpf_professor = this.user.cpf
            const url = `${baseApiUrl}/classroom`
            axios.post(url, this.classroom)
                .then(()=>{
                    this.$toasted.global.defaultSuccess()
                    this.addNewClass = false
                    this.classroom = {}
                    this.loadClasses()
                })
                .catch(showError)
        }
    },
    mounted(){
        this.loadClasses()
    }
}
</script>

<style>
    .clasroom ul {
        list-style-type: none; 
        padding: 0;
    }

    .clasroom {
        /* display: flex;
        flex-direction: column;
        align-items: center; */
        margin-top: 25px;
    }

    .clasroom .form-content .form-buttons{
        display: flex;
        justify-content: flex-end;
        margin-bottom: 20px;
        font-size: 1.2rem;
        font-weight: 100;
    }

    .clasroom .form-content .form-inputs{
        display: flex;
        justify-content: center;
        align-items: center;
        
        background-color: #ddd;
        padding: 40px;
        padding-right: 40px;
        border-radius: 100%;
        border: 1px solid rgba(0,0,0,0.2);
        box-shadow: 0 1px 5px rgba(0,0,0,0.15);
        margin-bottom: 20px;
    }

</style>
