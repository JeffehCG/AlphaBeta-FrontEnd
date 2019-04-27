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
      </div>
    </router-link>
</div>
</template>

<script>
export default {
    name: 'ItemExercise',
    props: ["exercise"],
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
