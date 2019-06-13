<template>
  <div class="home">
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
        <p class="about-role">Back-End / Analista</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home"
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
</style>
