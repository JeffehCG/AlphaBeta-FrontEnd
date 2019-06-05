<template>
    <div class="classById">
        <router-link to = "/classroom">VOLTAR</router-link>
        <div class="infoClass">
            <h1 class="titleClass">Turma {{classroom.cd_turma}}</h1>
            <div class="image-class d-none d-sm-block">
                <img
                v-if="classroom.imageUrl"
                :src="classroom.imageUrl"
                alt="Turma"
                height="150"
                width="150"
                >
                <img v-else src="@/assets/beta.png" alt="Turma" height="150" width="150">
            </div>
            <p>Ano de inicio: {{classroom.aa_inicio}}</p>
            <span class="info-class-nivel">Nivel de ensino: {{classroom.nivel_turma}}</span>
        </div>

            <!-- Exibição dos alunos -->
        <h1 class="title">Alunos Matriculados</h1>
        <b-table hover striped :items="studentsClass" :fields='fieldsStudents'>
            <template slot="actions" slot-scope="data">
                <b-button v-if="user.teacher" variant = "danger" @click="removeStudent(data.item)"> <!--Botão para excluir usuario-->
                    <i class="fa fa-trash"> Desmatricular</i>
                </b-button>
            </template>
        </b-table>
        <span v-if="studentsClass == false">Nenhum Aluno Matriculado</span>

        <div>
            <b-button v-if="user.teacher" variant = "primary" v-b-modal.modal-center @click="loadAllStudents">Matricule Mais Alunos Aqui! </b-button>

            <!-- Modal Component -->
            <b-modal class="modalStudents" id="modal-center" size="lg" centered title="Escolha o aluno a ser Matriculado">
                <b-table hover striped :items="allStudents" :fields='fieldsStudents'>
                    <template slot="actions" slot-scope="data">
                        <b-button variant = "success" @click="enrollingStudent(data.item)">
                            <i class="fa fa-check"></i>
                        </b-button>
                    </template>
                </b-table>
            </b-modal>
        </div>

        <!-- Exibição dos exercicios -->
        <h1 class="title">Exercicios Adicionados</h1>
        <b-table hover striped :items="exercisesClass" :fields='fieldsExercises'>
            <template slot="actions" slot-scope="data">
                <b-button v-if="user.teacher" variant = "danger" @click="removeExercise(data.item)"> <!--Botão para excluir usuario-->
                    <i class="fa fa-trash"> Excluir</i>
                </b-button>
            </template>
        </b-table>
        <span v-if="exercisesClass == false">Nenhum Exercicio Adicionado</span>

        <div>
            <b-button v-if="user.teacher" variant = "primary" v-b-modal.modal-1 @click="loadAllExercises">Adicione mais exercicios! </b-button>

            <!-- Modal Component -->
            <b-modal class="modalExercice" id="modal-1" size="lg" centered title="Escolha o exercicio a ser adicionado">
                <b-table hover striped :items="allExercises" :fields='fieldsExercises'>
                    <template slot="actions" slot-scope="data">
                        <b-button variant = "success" @click="AddExercice(data.item)">
                            <i class="fa fa-check"></i>
                        </b-button>
                    </template>
                </b-table>
            </b-modal>
        </div>
    </div>
</template>

<script>
import {baseApiUrl,showError} from '@/global'
import {mapState} from 'vuex'
import axios from 'axios'

export default {
    name: 'ClassroomById',
    computed: mapState(['user']),
    data: function(){
        return{
            classroom: {},
            studentsClass: [],
            allStudents: [],
            exercisesClass: [],
            allExercises: [],
            fieldsStudents: [
                {key: 'nm_nome', label: 'Nome', sortable: true},
                {key: 'nm_sobrenome', label: 'Sobrenome', sortable: true},
                {key: 'cd_cpf', label: 'CPF', sortable: true},
                {key: 'nm_email', label: 'E-mail', sortable: true},
                {key: 'actions', label: 'Matricular'},
            ],
            fieldsExercises: [
                {key: 'cd_exercicio', label: 'Codigo', sortable: true},
                {key: 'ds_classificacao', label: 'Titulo', sortable: true},
                {key: 'nm_url', label: 'Classificação', sortable: true},
                {key: 'actions', label: 'Adicionar'},
            ]
        }
    },
    methods:{
        loadStudents(){
            const url = `${baseApiUrl}/classroom/students/${this.$route.params.id}`
            axios.get(url).then(res => {
                this.studentsClass = res.data
            })
            .catch(showError)
        },
        loadClass(){
            const url = `${baseApiUrl}/classroom/${this.$route.params.id}`
            axios.get(url).then(res => this.classroom = res.data).catch(showError)
        },
        removeStudent(student){
            const url = `${baseApiUrl}/enrollment/${student.cd_cpf}/${this.$route.params.id}`
            axios.delete(url).then(()=>{
                this.$toasted.global.defaultSuccess()
                this.loadStudents()
            })
            .catch(showError)
        },
        loadAllStudents(){
            const url = `${baseApiUrl}/students`
            axios.get(url).then(res => this.allStudents = res.data).catch(showError)
        },
        enrollingStudent(student){
            const url = `${baseApiUrl}/enrollment`
            const enrollment = {
                cd_cpf_aluno: student.cd_cpf,
                cd_turma: this.$route.params.id
            }
            axios.post(url, enrollment).then(()=> {
                this.$toasted.global.defaultSuccess()
                this.loadStudents()
            })
            .catch(showError)
        },
        loadExercises(){
            const url = `${baseApiUrl}/classroom/exercises/${this.$route.params.id}`
            axios.get(url).then(res => {
                this.exercisesClass = res.data
            })
            .catch(showError)
        },
        loadAllExercises(){
            const url = `${baseApiUrl}/teacher/exerciseComplete/${this.classroom.cd_cpf_professor}`
            axios.get(url).then(res => this.allExercises = res.data).catch(showError)
        },
        AddExercice(exercice){
            const url = `${baseApiUrl}/exerciseToClass`
            const enrollment = {
                cd_exercicio: exercice.cd_exercicio,
                cd_turma: this.$route.params.id
            }
            axios.post(url, enrollment).then(()=> {
                this.$toasted.global.defaultSuccess()
                this.loadExercises()
            })
            .catch(showError)
        },
        removeExercise(exercice){
            const url = `${baseApiUrl}/exerciseToClass/${exercice.cd_exercicio}/${this.$route.params.id}`
            axios.delete(url).then(()=>{
                this.$toasted.global.defaultSuccess()
                this.loadExercises()
            })
            .catch(showError)
        }

    },
    mounted(){
        this.loadClass()
        this.loadStudents()
        this.loadExercises()
    }
}
</script>

<style>
    .modalStudents{
        background-color: #fff;
    }
</style>
