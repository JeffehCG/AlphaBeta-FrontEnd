<template>
  <div class="home">
    <div class="stats"> <!--Colocando os status do sistema (qt categorias, artigos e usuarios)-->
            <Stat title = "Turmas" :value="stat.qtClassrom"
                icon="fa fa-folder" color="#d54d50"></Stat>
            <Stat title = "Exercicios" :value="stat.qtExercise"
                icon="fa fa-file" color="#3282cd"></Stat>
            <Stat v-if="this.user.teacher" title = "Alunos" :value="stat.qtStudents"
                icon="fa fa-user" color="#3bc480"></Stat>
            <Stat v-else title = "Exercicios Concluidos" :value="stat.qtExercisesFineshed"
                icon="fa fa-check" color="#3bc480"></Stat>
        </div>
    <div class="resumo-alphabeta">
      <h2>Alphabeta</h2>
      <div class="resumo-content">
        <p>resumo aqui</p>
      </div>
    </div>

    <div class="about-us">
      <div class="about-container">
        <b-img
          rounded="circle"
          src="https://media.licdn.com/dms/image/C4D03AQF0pRVf-aUHCg/profile-displayphoto-shrink_200_200/0?e=1565827200&v=beta&t=KCfjHuc87TBddtiPnvMx_dYfcM8qPXGeBD3DueIw8DA"
          alt="img-perfil-rodrigo"
        ></b-img>
        <h4 class="about-name">Rodrigo Corneta</h4>
        <p class="about-role">Front-End / Analista</p>
      </div>

      <div class="about-container">
        <b-img
          rounded="circle"
          src="https://media.licdn.com/dms/image/C5603AQGUX-YlAAR92Q/profile-displayphoto-shrink_800_800/0?e=1565827200&v=beta&t=3G6kMP0ChmcME7H7u0trLd4naZfohnL818DwDnZOV74"
          alt="img-perfil-jefferson"
        ></b-img>
        <h4 class="about-name">Jefferson Costa</h4>
        <p class="about-role">Back-End / Analista / DBA</p>
      </div>
    </div>
  </div>
</template>

<script>
import Stat from './Stat'
import axios from 'axios'
import {baseApiUrl} from '@/global'
import { mapState } from "vuex"

export default {
  name: "Home",
  components: {Stat},
  computed: mapState(["user"]),
  data: function(){
        return{
            stat: {}
        }
    },
  methods: {
        getStats(){ 
          if(this.user.teacher){
            axios.get(`${baseApiUrl}/statsTeacher/${this.user.cpf}`)
                .then(res => this.stat = res.data)
          }
          else{
            axios.get(`${baseApiUrl}/statsStudent/${this.user.cpf}`)
                .then(res => this.stat = res.data)
          } 
        }
    },
    mounted(){
        this.getStats()
    }
};
</script>

<style>
.about-us {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.about-container {
  border: 2px solid #9c9a9a;
  border-radius: 5px;
  padding: 30px;
  background-color: #eeeeee;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}

.about-container img {
  margin-bottom: 20px;
  height: 200px;
  width: 200px;
}

.stats{
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
    }
</style>
