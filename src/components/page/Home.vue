<template>
  <div class="home">
    <div class="stats">
      <!--Colocando os status do sistema (qt categorias, artigos e usuarios)-->
      <Stat title="Turmas" :value="stat.qtClassrom" icon="fa fa-folder" color="#d54d50"></Stat>
      <Stat title="Exercicios" :value="stat.qtExercise" icon="fa fa-file" color="#3282cd"></Stat>
      <Stat
        v-if="this.user.teacher"
        title="Alunos"
        :value="stat.qtStudents"
        icon="fa fa-user"
        color="#3bc480"
      ></Stat>
      <Stat
        v-else
        title="Exercicios Concluidos"
        :value="stat.qtExercisesFineshed"
        icon="fa fa-check"
        color="#3bc480"
      ></Stat>
    </div>
    <hr>
    <div class="resumo-alphabeta">
      <h2>Sobre o Alphabeta...</h2>
      <div class="resumo-content">
        <p>
          A dificuldade de aprendizado vem sendo um grande problema no Brasil, e diversos fatores
          acarretam isso, tantos problemas familiares como falta de didática nas instituições de
          ensino etc... E esses problemas também acabam afetando crianças com problemas intelectuais
          ou cognitivas, que no caso, são as com maior dificuldade, e precisam de uma atenção maior.
          Muitos professorem sentem dificuldade de trabalhar com essas crianças, e a falta de ferramentas no mercado eficientes para auxiliar os mesmos também e um problema. Por conta disso, o sistema elaborado nesse projeto (Alphabeta) vem com o objetivo de criar um ferramenta auxiliar para os professores que lecionam para essas crianças com maior dificuldade, sendo um software onde o professor poderá criar exercícios dinâmicos e interessantes para chamar a atenção do aluno, e mantê-lo interessado , assim tendo um maior aproveitamento do conteúdo, e uma maior facilidade da absorção do mesmo. Essa ferramenta não vem com o objetivo de substituir métodos tradicionais de ensino, e sim reforçá-los, facilitando a interação do aluno com o professor em um ambiente tecnológico.
        </p>
      </div>
    </div>
    <hr>
    <h2>Equipe</h2>
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
import Stat from "./Stat";
import axios from "axios";
import { baseApiUrl } from "@/global";
import { mapState } from "vuex";

export default {
  name: "Home",
  components: { Stat },
  computed: mapState(["user"]),
  data: function() {
    return {
      stat: {}
    };
  },
  methods: {
    getStats() {
      if (this.user.teacher) {
        axios
          .get(`${baseApiUrl}/statsTeacher/${this.user.cpf}`)
          .then(res => (this.stat = res.data));
      } else {
        axios
          .get(`${baseApiUrl}/statsStudent/${this.user.cpf}`)
          .then(res => (this.stat = res.data));
      }
    }
  },
  mounted() {
    this.getStats();
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
  margin: 20px 0;
}

.about-container img {
  margin-bottom: 20px;
  height: 200px;
  width: 200px;
}

.stats {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.resumo-alphabeta {
  border: 2px dashed;
  /* border-collapse: ; */
  padding: 10px;
  margin: 20px 0;
  border-radius: 5px;
}

.home h2{
  text-align: center;
}

.home hr {
        border: 0;
        width: 100%;
        height: 1px;
        background-image: linear-gradient(to right,
            rgba(120,120,120,0),
            rgba(120,120,120,0.75),
            rgba(120,120,120,0));
    }
</style>
