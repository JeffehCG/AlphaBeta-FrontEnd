<template>
<div class="item">
    <router-link class="itemClassroom" :to="{name: 'classroomById', params: {id:classroom.cd_turma}}">
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
      <div class="info-class">
        <h2>Codigo da Turma: {{classroom.cd_turma}}</h2>
        <p>Ano de inicio: {{classroom.aa_inicio}}</p>
        <span class="info-class-nivel">Nivel de ensino: {{classroom.nivel_turma}}</span>
      </div>

      <b-form v-if="updateClass" @click.prevent="">
        <b-form-input v-model="itemClassroom.aa_inicio" ></b-form-input>
        <b-form-input v-model="itemClassroom.nivel_turma" ></b-form-input>
        <b-button variant = "success" @click="updateClassroom">Confirmar</b-button>
        <b-button variant = "danger" @click="updateClass = !updateClass">Cancelar</b-button>
      </b-form>

      <div class="buttons" v-if="!updateClass">
        <b-button v-if="user.teacher" variant = "danger" @click.prevent="removeClassroom"><i class="fa fa-trash"></i></b-button>
        <b-button v-if="user.teacher" variant = "warning" @click.prevent="updateClass = !updateClass"><i class="fa fa-pencil"></i></b-button>
      </div>
    </router-link>
</div>
</template>

<script>
import {baseApiUrl,showError} from '@/global'
import {mapState} from 'vuex'
import axios from 'axios'

export default {
  name: "ItemClassroom.vue",
  props: ["classroom"],
  computed: mapState(['user']),
  data: function(){
    return{
      updateClass: false,
      itemClassroom: {
        cd_turma: this.classroom.cd_turma,
        cd_cpf_professor: this.classroom.cd_cpf_professor,
        aa_inicio:this.classroom.aa_inicio,
        nivel_turma : this.classroom.nivel_turma
      }
    }
  },
  methods:{
    removeClassroom(){
            const url = `${baseApiUrl}/classroom/${this.itemClassroom.cd_turma}`
            axios.delete(url).then(()=>{
                this.$toasted.global.defaultSuccess()
                window.location.reload()
            })
            .catch(showError)
      },
    updateClassroom(){
        const url = `${baseApiUrl}/classroom/${this.itemClassroom.cd_turma}`
        axios.put(url, this.itemClassroom)
            .then(() => {
              this.$toasted.global.defaultSuccess()
              this.updateClass = false
              window.location.reload()
            })
            .catch(showError)
    }
  }
};
</script>

<style>
.itemClassroom {
  border-radius: 8px;
  margin-bottom: 20px;
  background-color: #fff;
  padding: 20px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
  overflow: hidden;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.item a {
  display: flex;
  align-items: flex-start;
  text-decoration: none;
  color: #000;
}

.itemClassroom:hover{
  background-color: #ddd;
}

.info-class h2 {
  font-size: 1.7rem;
}

.image-class {
  padding-right: 20px;
  margin-right: 20px;
  border-right: 1px solid #aaa;
}

.image-class img {
  border-radius: 5px;
}

.info-class {
  display: flex;
  align-self: stretch;
  flex-direction: column;
}

.info-class p {
  flex: 1;
  color: #555;
  font-size: 1.1rem;
}

.itemClassroom .buttons button{
  margin-left: 10px;
  margin-bottom: 10px;
}

.itemClassroom input{
  margin-bottom: 10px;
}

.itemClassroom button{
  margin-right: 10px;
}
</style>
