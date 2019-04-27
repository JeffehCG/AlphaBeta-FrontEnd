<template>
    <div class="profile">
        <i class="title fa fa-address-card yellow">Dados Pessoais</i>
        <!-- Exibição -->
        <b-form class="form-content data" v-if="!altData">
            <i class="fa fa-pencil" @click="altData = true">Editar</i>
            <b-row>
                <b-col md = "4" sm ="12">
                    <b-form-group label = "Nome:" label-for="lb-nome">
                        <b-form-input id="lb-nome" v-model="user.nm_nome" disabled></b-form-input>
                    </b-form-group>
                </b-col>
                <b-col md = "4" sm ="12">
                    <b-form-group label = "Sobrenome:" label-for="lb-sobrenome">
                        <b-form-input id="lb-sobrenome" v-model="user.nm_sobrenome" disabled></b-form-input>
                    </b-form-group>
                </b-col>
                <b-col md = "4" sm ="12">
                    <b-form-group label = "Data Nascimento:" label-for="lb-data">
                        <b-form-input id="lb-data" v-model="user.dt_nascimento" disabled></b-form-input>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col md = "4" sm ="12">
                    <b-form-group label = "Telefone:" label-for="lb-telefone">
                        <b-form-input id="lb-telefone" v-model="user.cd_telefone" disabled></b-form-input>
                    </b-form-group>
                </b-col>
                <b-col md = "4" sm ="12">
                    <b-form-group label = "E-mail:" label-for="lb-email">
                        <b-form-input id="lb-email" v-model="user.nm_email" disabled></b-form-input>
                    </b-form-group>
                </b-col>
                <b-col md = "4" sm ="12">
                    <b-form-group label = "CPF:" label-for="lb-cpf">
                        <b-form-input id="lb-cpf" v-model="user.cd_cpf" disabled></b-form-input>
                    </b-form-group>
                </b-col>
            </b-row>
        </b-form>
        <!-- Alteração -->
        <b-form class="form-content data" v-if="altData">
            <div class="update-buttons"><i class="fa fa-check" @click="updateUser">Confirmar</i> <i class="fa fa-times" @click="loadlUser">Cancelar</i></div>
            <b-row>
                <b-col md = "4" sm ="12">
                    <b-form-group label = "Nome:" label-for="lb-nome">
                        <b-form-input id="lb-nome" v-model="user.nm_nome"></b-form-input>
                    </b-form-group>
                </b-col>
                <b-col md = "4" sm ="12">
                    <b-form-group label = "Sobrenome:" label-for="lb-sobrenome">
                        <b-form-input id="lb-sobrenome" v-model="user.nm_sobrenome"></b-form-input>
                    </b-form-group>
                </b-col>
                <b-col md = "4" sm ="12">
                    <b-form-group label = "Data Nascimento:" label-for="lb-data">
                        <b-form-input id="lb-data" type="date" v-model="user.dt_nascimento"></b-form-input>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col md = "4" sm ="12">
                    <b-form-group label = "Telefone:" label-for="lb-telefone">
                        <b-form-input id="lb-telefone" v-model="user.cd_telefone"></b-form-input>
                    </b-form-group>
                </b-col>
                <b-col md = "4" sm ="12">
                    <b-form-group label = "E-mail:" label-for="lb-email">
                        <b-form-input id="lb-email" v-model="user.nm_email"></b-form-input>
                    </b-form-group>
                </b-col>
                <b-col md = "4" sm ="12">
                    <b-form-group label = "CPF:" label-for="lb-cpf">
                        <b-form-input id="lb-cpf" v-model="user.cd_cpf"></b-form-input>
                    </b-form-group>
                </b-col>
            </b-row>
        </b-form>
        <hr>
        <i class="title fa fa-home red">Endereço</i>
        <!-- Exibição -->
        <b-form class="form-content address" v-if="!altAddress">
            <i class="fa fa-pencil" @click="altAddress = true">Editar</i>
            <b-row>
                <b-col md = "4" sm ="12">
                    <b-form-group label = "Estado:" label-for="lb-estado">
                        <b-form-input id="lb-estado" v-model="user.nm_estado" disabled></b-form-input>
                    </b-form-group>
                </b-col>
                <b-col md = "4" sm ="12">
                    <b-form-group label = "Cidade:" label-for="lb-cidade">
                        <b-form-input id="lb-cidade" v-model="user.nm_cidade" disabled></b-form-input>
                    </b-form-group>
                </b-col>
                <b-col md = "4" sm ="12">
                    <b-form-group label = "Rua:" label-for="lb-rua">
                        <b-form-input id="lb-rua" v-model="user.nm_endereco_rua" disabled></b-form-input>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col md = "4" sm ="12">
                    <b-form-group label = "Bairro:" label-for="lb-bairro">
                        <b-form-input id="lb-bairro" v-model="user.nm_endereco_bairro" disabled></b-form-input>
                    </b-form-group>
                </b-col>
                <b-col md = "4" sm ="12">
                    <b-form-group label = "Numero:" label-for="lb-numero">
                        <b-form-input id="lb-numero" v-model="user.nm_endereco_num" disabled></b-form-input>
                    </b-form-group>
                </b-col>
                <b-col md = "4" sm ="12">
                    <b-form-group label = "CEP:" label-for="lb-cep">
                        <b-form-input id="lb-cep" v-model="user.cd_cep" disabled></b-form-input>
                    </b-form-group>
                </b-col>
            </b-row>
        </b-form>
        <!-- Alteração -->
        <b-form class="form-content address" v-if="altAddress">
            <div class="update-buttons"><i class="fa fa-check" @click="updateUser">Confirmar</i> <i class="fa fa-times" @click="loadlUser">Cancelar</i></div>
            <b-row>
                <b-col md = "4" sm ="12">
                    <b-form-group label = "Estado:" label-for="lb-estado">
                        <b-form-input id="lb-estado" v-model="user.nm_estado"></b-form-input>
                    </b-form-group>
                </b-col>
                <b-col md = "4" sm ="12">
                    <b-form-group label = "Cidade:" label-for="lb-cidade">
                        <b-form-input id="lb-cidade" v-model="user.nm_cidade"></b-form-input>
                    </b-form-group>
                </b-col>
                <b-col md = "4" sm ="12">
                    <b-form-group label = "Rua:" label-for="lb-rua">
                        <b-form-input id="lb-rua" v-model="user.nm_endereco_rua"></b-form-input>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col md = "4" sm ="12">
                    <b-form-group label = "Bairro:" label-for="lb-bairro">
                        <b-form-input id="lb-bairro" v-model="user.nm_endereco_bairro"></b-form-input>
                    </b-form-group>
                </b-col>
                <b-col md = "4" sm ="12">
                    <b-form-group label = "Numero:" label-for="lb-numero">
                        <b-form-input id="lb-numero" v-model="user.nm_endereco_num"></b-form-input>
                    </b-form-group>
                </b-col>
                <b-col md = "4" sm ="12">
                    <b-form-group label = "CEP:" label-for="lb-cep">
                        <b-form-input id="lb-cep" v-model="user.cd_cep"></b-form-input>
                    </b-form-group>
                </b-col>
            </b-row>
        </b-form>
        <hr>
        <i class="title fa fa-users purple" v-if="localUser.teacher === false">Dados Responsavel</i>
        <!-- Exibição -->
        <b-form class="form-content parents" v-if="!altParents && localUser.teacher === false">
            <i class="fa fa-pencil" @click="altParents = true">Editar</i>
            <b-row>
                <b-col md = "4" sm ="12">
                    <b-form-group label = "Nome:" label-for="lb-nomeR">
                        <b-form-input id="lb-nomeR" v-model="user.nm_responsavel" disabled></b-form-input>
                    </b-form-group>
                </b-col>
                <b-col md = "4" sm ="12">
                    <b-form-group label = "CPF:" label-for="lb-cpfr">
                        <b-form-input id="lb-cpfr" v-model="user.cd_cpf_responsavel" disabled></b-form-input>
                    </b-form-group>
                </b-col>
            </b-row>
        </b-form>
        <!-- Alteração -->
        <b-form class="form-content parents" v-if="altParents && localUser.teacher === false">
            <div class="update-buttons"><i class="fa fa-check" @click="updateUser">Confirmar</i> <i class="fa fa-times" @click="loadlUser">Cancelar</i></div>
            <b-row>
                <b-col md = "4" sm ="12">
                    <b-form-group label = "Nome:" label-for="lb-nomeR">
                        <b-form-input id="lb-nomeR" v-model="user.nm_responsavel"></b-form-input>
                    </b-form-group>
                </b-col>
                <b-col md = "4" sm ="12">
                    <b-form-group label = "CPF:" label-for="lb-cpfr">
                        <b-form-input id="lb-cpfr" v-model="user.cd_cpf_responsavel"></b-form-input>
                    </b-form-group>
                </b-col>
            </b-row>
        </b-form>
    </div>
</template>

<script>
import {baseApiUrl, showError, userKey} from '@/global'
import axios from 'axios'

export default {
    name:'Profile',
    data: function(){
        return{
            altData: false,
            altAddress: false,
            altParents: false,
            localUser : JSON.parse(localStorage.getItem(userKey)),
            user: {}
        }
    },
    methods: {
        loadlUser(){
            if(this.localUser.teacher){
                const url = `${baseApiUrl}/teachers/${this.localUser.cpf}`
                axios.get(url).then(res => {
                    this.user = res.data
                })
                .catch(showError)
            }else{
                const url = `${baseApiUrl}/students/${this.localUser.cpf}`
                axios.get(url).then(res => {
                    this.user = res.data
                })
                .catch(showError)
            }
            this.altData = false
            this.altAddress = false
            this.altParents = false
        },
        updateUser(){
            if(this.localUser.teacher){
                const url = `${baseApiUrl}/teachers/${this.localUser.cpf}`
                axios.put(url, this.user)
                    .then(() => {this.$toasted.global.defaultSuccess()})
                    .catch(showError)
                this.altData = false
                this.altAddress = false
                this.altParents = false
            }else{
                const url = `${baseApiUrl}/students/${this.localUser.cpf}`
                axios.put(url, this.user)
                    .then(() => {this.$toasted.global.defaultSuccess()})
                    .catch(showError)
                this.altData = false
                this.altAddress = false
                this.altParents = false
            }
        }
    },
    mounted(){
        this.loadlUser()
    }

}
</script>

<style>
    .profile{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .profile i {
        font-size: 1.4rem;
        margin-bottom: 20px;
    }

    .profile .red{
        color: red;
        font-weight: 800;
    }

    .profile .yellow{
        color: orange;
        font-weight: 800;
    }

    .profile .purple{
        color: purple;
        font-weight: 800;
    }

    .profile hr {
        border: 0;
        width: 100%;
        height: 1px;
        background-image: linear-gradient(to right,
            rgba(120,120,120,0),
            rgba(120,120,120,0.75),
            rgba(120,120,120,0));
    }

    .form-content input{
        margin: 0px 20px 0px 20px;
    }

    .profile .form-content{
        background-color: #ddd;
        padding: 20px;
        padding-right: 40px;
        border-radius: 8%;
        border: 1px solid rgba(0,0,0,0.2);
        box-shadow: 0 1px 5px rgba(0,0,0,0.15);
    }

    .profile .data input{
        border: solid 1px orange;
    }

    .profile .address input{
        border: solid 1px red;
    }

    .profile .parents input{
        border: solid 1px purple;
    }

    .form-content i {
        color: #fff;
        font-weight: 800;
        font-size: 15px;
        width: 100px;
        background-color: rgb(0, 17, 255);
        border-radius: 50%;
        padding: 5px;
        border: solid 1px #000;
        box-shadow: 0 1px 5px rgba(0,0,0,0.15);

        display: flex;
        justify-content: center;
        align-items: center;
    }

    .form-content .update-buttons{
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    .form-content .update-buttons .fa-check {
        color: #fff;
        font-weight: 800;
        font-size: 15px;
        width: 100px;
        background-color: rgb(17, 243, 28);
        border-radius: 50%;
        padding: 5px;
        border: solid 1px #000;
        box-shadow: 0 1px 5px rgba(0,0,0,0.15);
    }

    .form-content .update-buttons .fa-times {
        color: #fff;
        font-weight: 800;
        font-size: 15px;
        width: 100px;
        background-color: rgb(233, 27, 27);
        border-radius: 50%;
        padding: 5px;
        border: solid 1px #000;
        box-shadow: 0 1px 5px rgba(0,0,0,0.15);
    }
    .form-content i:hover{
        background-color: rgba(27, 33, 116, 0.39);
    }

    .form-content .update-buttons .fa-check:hover{
        background-color: rgba(0, 255, 0, 0.39);
    }

    .form-content .update-buttons .fa-times:hover{
        background-color: rgba(236, 10, 10, 0.39);
    }
</style>
