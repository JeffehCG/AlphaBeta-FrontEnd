<template>
    <div class="dropdown">
        <b-form>
            <b-row>
                <b-form-group label = "Titulo:" label-for="lb-titulo">
                    <b-form-input id = "lb-titulo" v-model="exercise.ds_classificacao"></b-form-input>
                </b-form-group>
            </b-row>
            <b-row>
                <b-form-group label = "Texto:" label-for="lb-texto">
                    <b-form-textarea id = "lb-texto" v-model="exercise.ds_texto"></b-form-textarea>
                    <b-button @click="addParans">Preencher parametros</b-button>
                </b-form-group>
            </b-row>
            <b-row>
                <b-col md = "6" sm = "12">
                    <b-form-group>
                        <div v-if="parameters.palavra1 != null" class="card">
                            <input type="file" id="file1" ref="file1"/>
                            <b-form-input v-model="parameters.palavra1.nm_texto" placeholder="Parametro"></b-form-input>
                        </div>
                        <div v-if="parameters.palavra2 != null" class="card">
                            <input type="file" id="file2" ref="file2"/>
                            <b-form-input v-model="parameters.palavra2.nm_texto" placeholder="Parametro"></b-form-input>
                        </div>
                        <div v-if="parameters.palavra3 != null" class="card">
                            <input type="file" id="file3" ref="file3"/>
                            <b-form-input v-model="parameters.palavra3.nm_texto" placeholder="Parametro"></b-form-input>
                        </div>
                        <div v-if="parameters.palavra4 != null" class="card">
                            <input type="file" id="file4" ref="file4"/>
                            <b-form-input v-model="parameters.palavra4.nm_texto" placeholder="Parametro"></b-form-input>
                        </div>
                        <div v-if="parameters.palavra5 != null" class="card">
                            <input type="file" id="file5" ref="file5"/>
                            <b-form-input v-model="parameters.palavra5.nm_texto" placeholder="Parametro"></b-form-input>
                        </div>
                        <div v-if="parameters.palavra6 != null" class="card">
                            <input type="file" id="file6" ref="file6"/>
                            <b-form-input v-model="parameters.palavra6.nm_texto" placeholder="Parametro"></b-form-input>
                        </div>
                        <div v-if="parameters.palavra7 != null" class="card">
                            <input type="file" id="file7" ref="file7"/>
                            <b-form-input v-model="parameters.palavra7.nm_texto" placeholder="Parametro"></b-form-input>
                        </div>
                        <div v-if="parameters.palavra8 != null" class="card">
                            <input type="file" id="file8" ref="file8"/>
                            <b-form-input v-model="parameters.palavra8.nm_texto" placeholder="Parametro"></b-form-input>
                        </div>
                        <div v-if="parameters.palavra9 != null" class="card">
                            <input type="file" id="file9" ref="file9"/>
                            <b-form-input v-model="parameters.palavra9.nm_texto" placeholder="Parametro"></b-form-input>
                        </div>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-button @click="insert">Salvar</b-button>
        </b-form>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import axios from 'axios'
import {baseApiUrl, showError} from '@/global'

export default {
    name: 'Dropdown',
    computed: mapState(['user']),
    data: function(){
        return{
            exercise: {},
            parameters:{}
        }
    },
    methods:{
        async insert(){

            for(let i in this.parameters){
                let formData = new FormData()

                if(i == "palavra1"){formData.append('ds_img', this.$refs.file1.files[0])}
                if(i == "palavra2"){formData.append('ds_img', this.$refs.file2.files[0])}
                if(i == "palavra3"){formData.append('ds_img', this.$refs.file3.files[0])}
                if(i == "palavra4"){formData.append('ds_img', this.$refs.file4.files[0])}
                if(i == "palavra5"){formData.append('ds_img', this.$refs.file5.files[0])}
                if(i == "palavra6"){formData.append('ds_img', this.$refs.file6.files[0])}
                if(i == "palavra7"){formData.append('ds_img', this.$refs.file7.files[0])}
                if(i == "palavra8"){formData.append('ds_img', this.$refs.file8.files[0])}
                if(i == "palavra9"){formData.append('ds_img', this.$refs.file9.files[0])}

                formData.append('cd_parametro', this.parameters[i].cd_parametro)
                formData.append('nm_texto', this.parameters[i].nm_texto)
                formData.append('cd_professor', this.user.cpf)
                this.parameters[i].form = formData
            }

            ///////// Inserindo exercicio 

            let url = `${baseApiUrl}/exerciseComplete`
            this.exercise.nm_url = 'dragDrop.js'
            this.exercise.cd_professor = this.user.cpf
            
            await axios.post(url, this.exercise)
                .then(async ()=>{
                    for(let x in this.parameters){
                        url = `${baseApiUrl}/paransExercise`
                        await axios.post(url ,this.parameters[x].form
                        , {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        })
                            .then(()=>{})
                            .catch(showError)
                    }
                    this.$toasted.global.defaultSuccess()
                    this.exercise= {}
                    this.parameters = {}
                })
                .catch(showError)
        },

        deleteParansNull(){
            for(let y in this.parameters){
                if(this.parameters[y].nm_texto == null) delete this.parameters[y]
            }
        },

        async addParans(){
            this.deleteParansNull()

            let qt = 0
            if(this.exercise.ds_texto != null) {
                for(let i = 0; i <= this.exercise.ds_texto.length; i++){
                    if( await this.exercise.ds_texto.charAt(i) === "#"){
                        qt = qt + 1
                        if(qt == 1 && this.parameters.palavra1 == null) {this.parameters.palavra1 = new Object(); this.parameters.palavra1.cd_parametro = qt}
                        if(qt == 2 && this.parameters.palavra2 == null) {this.parameters.palavra2 = new Object(); this.parameters.palavra2.cd_parametro = qt}
                        if(qt == 3 && this.parameters.palavra3 == null) {this.parameters.palavra3 = new Object(); this.parameters.palavra3.cd_parametro = qt}
                        if(qt == 4 && this.parameters.palavra4 == null) {this.parameters.palavra4 = new Object(); this.parameters.palavra4.cd_parametro = qt}
                        if(qt == 5 && this.parameters.palavra5 == null) {this.parameters.palavra5 = new Object(); this.parameters.palavra5.cd_parametro = qt}
                        if(qt == 6 && this.parameters.palavra6 == null) {this.parameters.palavra6 = new Object(); this.parameters.palavra6.cd_parametro = qt}
                        if(qt == 7 && this.parameters.palavra7 == null) {this.parameters.palavra7 = new Object(); this.parameters.palavra7.cd_parametro = qt}
                        if(qt == 8 && this.parameters.palavra8 == null) {this.parameters.palavra8 = new Object(); this.parameters.palavra8.cd_parametro = qt}
                        if(qt == 9 && this.parameters.palavra9 == null) {this.parameters.palavra9 = new Object(); this.parameters.palavra9.cd_parametro = qt}
                    }
                }
            }
            this.exercise.ds_texto = this.exercise.ds_texto + ' '
        }
    }
}

</script>


<style>
    
</style>
