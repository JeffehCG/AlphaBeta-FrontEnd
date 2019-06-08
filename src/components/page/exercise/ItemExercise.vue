<template>
<div class="item">
    <router-link class="itemExercise" :to="{name: 'viewExercise', params: {id:exercise.cd_exercicio}}">
      <div class="image-exercise d-none d-sm-block">
        <img
          v-if="exercise.imageUrl"
          :src="exercise.imageUrl"
          alt="Exercisio"
          height="150"
          width="150"
        >
        <img v-else src="@/assets/beta.png" alt="Exercicio" height="150" width="150">
      </div>
      <div class="info-exercise">
        <h2>Codigo: {{exercise.cd_exercicio}} Titulo: {{exercise.ds_classificacao}}</h2>
        <p>Classificação: {{exercise.nm_url}}</p>
        <span class="info-exercise-texto">Texto do Exercicio: {{exercise.ds_texto}}</span>
        <span v-if="exerciseFinished && user.teacher == false" class="info-exercice-finished fa fa-check bg-success">Concluido</span>
        <span v-if="exerciseFinished == false && user.teacher == false" class="info-exercice-finished fa fa-times bg-warning">Pendente</span>
      </div>

      <div class="buttons">
        <b-button v-if="user.teacher" variant = "danger" @click.prevent="removeExercise"><i class="fa fa-trash"></i></b-button>
        <router-link :to="{name: 'updateExercise', params: {id:exercise.cd_exercicio}}"> 
          <b-button v-if="user.teacher" variant = "warning"><i class="fa fa-pencil"></i></b-button> 
        </router-link>
      </div>
    </router-link>
</div>
</template>

<script>
import {mapState} from 'vuex'
import axios from 'axios'
import {baseApiUrl, showError} from '@/global'

export default {
    name: 'ItemExercise',
    props: ["exercise"],
    computed: mapState(['user']),
    data: function(){
        return{
            exerciseFinished: {}
        }
    },
    methods:{
        removeExercise(){
              const url = `${baseApiUrl}/exerciseComplete/${this.exercise.cd_exercicio}`
              axios.delete(url).then(()=>{
                  this.$toasted.global.defaultSuccess()
                  window.location.reload()
              })
              .catch(showError)
        },
        loadExercisesFinished(){
                const url = `${baseApiUrl}/exerciseFinished/${this.user.cpf}/${this.exercise.cd_exercicio}`
                axios.get(url)
                    .then(res =>this.exerciseFinished = res.data)
                    .catch(showError)
        }
    },
    mounted(){
        this.loadExercisesFinished()
    }
}
</script>

<style>
    .itemExercise {
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

.itemExercise:hover{
  background-color: #ddd;
}

.info-exercise h2 {
  font-size: 1.7rem;
}

.image-exercise {
  padding-right: 20px;
  margin-right: 20px;
  border-right: 1px solid #aaa;
}

.image-exercise img {
  border-radius: 5px;
}

.info-exercise {
  display: flex;
  align-self: stretch;
  flex-direction: column;
}

.info-exercise p {
  flex: 1;
  color: #555;
  font-size: 1.1rem;
}
</style>
