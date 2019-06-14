<template>
    <div class="auth">
        <!--Login-->
        <div class="auth-modal" v-if="!showSignup">
            <img src="@/assets/alphabetahand.png" width="80" alt="">
            <hr>
            <div class="auth-title">LOGIN</div>
            <b-form class="auth-form">
                <b-form-group >
                    <b-form-input id = "user-login" type = "text" v-model="user.login" placeholder= "Digite o email ou CPF"></b-form-input>
                </b-form-group>
                <b-form-group>
                    <b-form-input id = "user-password" type = "password" v-model="user.password" placeholder= "Digite a senha"></b-form-input>
                </b-form-group>
            <b-button variant = "primary" @click="signin">Entrar</b-button>
            </b-form>
            <a href @click.prevent="showSignup = true">
                <span>Não tem cadastro? Registre-se aqui!</span>
            </a>
        </div>

        <!--Cadastro-->
        <div class="auth-modal" v-if="showSignup || showSignup">
            <img src="@/assets/alphabetahand.png" width="80" alt="">
            <hr>
            <div class="auth-title">CADASTRO</div>
                <b-form class="auth-form">
                    <b-form-group>
                        <b-form-input id = "user-name" type = "text" v-model="user.nm_nome" placeholder="Informe o Nome"></b-form-input>
                    </b-form-group>
                    <b-form-group>
                        <b-form-input id = "user-email" type = "text" v-model="user.nm_email" placeholder="Informe o Email"></b-form-input>
                    </b-form-group>
                    <b-form-group>
                        <b-form-input id = "user-cpf" type = "text" v-model="user.cd_cpf" placeholder="Informe o CPF"></b-form-input> 
                    </b-form-group>
                    <b-form-group>
                        <b-form-input id = "user-password" type = "password" v-model="user.cd_senha" placeholder="Informe a Senha"></b-form-input>
                    </b-form-group>
                    <b-form-group>
                        <b-form-input id = "user-confSenha" type = "password" v-model="user.cd_confSenha" placeholder="Confirme a Senha"></b-form-input>
                    </b-form-group>  
                    <b-form-group label="Tipo de cadastro">
                        <b-form-select placeholder="Selecione o Tipo de cadastro" v-model="showSignup">
                            <option>Aluno</option>
                            <option>Professor</option>
                        </b-form-select>
                    </b-form-group> 

                    <b-button variant = "primary" v-if="showSignup === 'Professor'" @click="signupTeacher">Cadastrar Professor</b-button>
                    <b-button variant = "primary" v-if="showSignup === 'Aluno' " @click="signupStudent">Cadastrar Aluno</b-button>
                </b-form>
            <br>
            <a href @click.prevent="showSignup = false , showSignup = false">
                <span>Já tem cadastro? Acesse o Login!</span>
            </a>
        </div>
    </div>
</template>

<script>
import {baseApiUrl, showError, userKey} from '@/global'
import axios from 'axios'

export default {
    name: 'Auth',
    data: function(){
        return{
            showSignup: false,
            user:{}
        }
    },
    methods:{
        signupTeacher(){
            delete this.user.login
            delete this.user.password
            axios.post(`${baseApiUrl}/teachers`, this.user)
                .then(()=>{
                    this.$toasted.global.defaultSuccess()
                    this.user = {}
                    this.showSignup = false
                })
                .catch(showError)
        },
        signupStudent(){
            delete this.user.login
            delete this.user.password
            axios.post(`${baseApiUrl}/students`, this.user)
                .then(()=>{
                    this.$toasted.global.defaultSuccess()
                    this.user = {}
                    this.showSignup = false
                })
                .catch(showError)
        },
        signin(){
            axios.post(`${baseApiUrl}/signin`,this.user)
                .then(res => {
                    this.$store.commit('setUser', res.data)
                    localStorage.setItem(userKey, JSON.stringify(res.data))
                    this.$router.push({path: '/'})
                })
                .catch(showError)
        }
    }
}
</script>

<style>
    .auth{
        background-color: #eee5;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .auth-modal{
        background-color: #fff;
        width: 350px;
        padding: 35px;
        box-shadow: 0 1px 5px rgba(0,0,0,0.15);
        border-radius: 15%;
        margin: 20px
    }

    .auth-title{
        font-size: 1.2rem;
        font-weight: 100;
        margin-top: 10px;
        margin-bottom: 15px;
    }

    .auth-modal a{
       margin-bottom: 10px;
    }

    .auth-form{
        margin-bottom: 10px;
    }

    .auth-modal input {
        margin-bottom: 15px;
        outline: none;
    }

    .auth-modal button{
        align-self: flex-end;
    }
</style>
