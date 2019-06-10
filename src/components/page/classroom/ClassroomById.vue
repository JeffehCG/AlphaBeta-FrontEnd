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
                <b-form class="searchStudents">
                    <b-row>
                        <b-col>
                            <div class="search">
                                <b-row>
                                    <b-form-group label = "Pesquisar:" label-for="lb-pesquisa">
                                        <b-form-input id="lb-content" v-model="search.content"></b-form-input>
                                    </b-form-group>
                                    <b-form-group label = "Por:" label-for="lb-campo">
                                        <select placeholder="Selecione o campo" v-model="search.field">
                                            <option value="nm_nome">Nome</option>
                                            <option value="nm_sobrenome">Sobrenome</option>
                                            <option value="cd_cpf">CPF</option>
                                            <option value="nm_email">Email</option>
                                        </select>
                                    </b-form-group>
                                    <b-button variant = "primary" class="fa fa-search" @click="searchClasses"></b-button>
                                </b-row>
                            </div>
                        </b-col>
                    </b-row>
                </b-form>
        <hr>
                <b-table hover striped :items="allStudents" :fields='fieldsStudents'>
                    <template slot="actions" slot-scope="data">
                        <b-button variant = "success" @click="enrollingStudent(data.item)">
                            <i class="fa fa-check"></i>
                        </b-button>
                    </template>
                </b-table>
                <b-pagination size = 'md' v-model="pageStudents"
                    :total-rows = "countStudents" :per-page="limitStudents" /> <!--Componente de paginação do bootstrap-vue-->
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
                <b-form class="searchExercises">
                    <b-row>
                        <b-col>
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
                                    <b-button variant = "primary" class="fa fa-search" @click="searchExercises"></b-button>
                                </b-row>
                            </div>
                        </b-col>
                    </b-row>
                </b-form>
        <hr>
                <b-table hover striped :items="allExercises" :fields='fieldsExercises'>
                    <template slot="actions" slot-scope="data">
                        <b-button variant = "success" @click="AddExercice(data.item)">
                            <i class="fa fa-check"></i>
                        </b-button>
                    </template>
                </b-table>
                <b-pagination size = 'md' v-model="pageClasses"
                    :total-rows = "countClasses" :per-page="limitClasses" />
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
            ],
            search : {},
            pageStudents: 1, //Atributo para paginação
            limitStudents: 0, //Atributo para paginação
            countStudents: 0, //Atributo para paginação
            pageClasses: 1, //Atributo para paginação
            limitClasses: 0, //Atributo para paginação
            countClasses: 0, //Atributo para paginação
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
            const url = `${baseApiUrl}/students?page=${this.pageStudents}`
            axios.get(url).then(res =>{
                this.allStudents = res.data.data
                this.countStudents = res.data.count
                this.limitStudents = res.data.limit
            }).catch(showError)
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
            const url = `${baseApiUrl}/teacher/exerciseComplete/${this.classroom.cd_cpf_professor}?page=${this.pageClasses}&classes=true`
            axios.get(url).then(res =>{
                this.allExercises = res.data.data
                this.countClasses = res.data.count
                this.limitClasses = res.data.limit
            }).catch(showError)
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
        },
        async searchClasses(){
                const url = `${baseApiUrl}/searchStudents`
                await axios.post(url,this.search)
                    .then(res =>{
                        this.allStudents = res.data
                    })
                    .catch(showError)
        },
        async searchExercises(){
                const url = `${baseApiUrl}/searcheExerciceTeacher/${this.classroom.cd_cpf_professor}`
                await axios.post(url,this.search)
                    .then(res =>{
                        this.allExercises = res.data
                    })
                    .catch(showError)
        }

    },
    watch:{
        pageStudents(){
            this.loadAllStudents() //Quando a pagina muda, chamar o metodo para buscar paginas
        },
        pageClasses(){
            this.loadAllExercises()
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
