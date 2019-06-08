<template>
    <div id="app" :class="{'hide-menu': !user}">
      <Header :hideUserDropdown= "!user"/>
      <LeftSide/>
      <RightSide/>
      <Menu v-if="user"/>
      <Loading v-if="validatingToken"/>
      <Content v-else/>
      <Footer/>
    </div>
</template>

<script>
import axios from 'axios'
import {baseApiUrl, userKey} from '@/global'
import {mapState} from 'vuex'
import Content from './components/template/Content'
import Footer from './components/template/Footer'
import Header from './components/template/Header'
import Menu from './components/template/Menu'
import LeftSide from './components/template/LeftSide'
import RightSide from './components/template/RightSide'
import Loading from './components/template/Loading'

export default {
  name: 'app',
  components: {Content, Footer, Header, Menu, LeftSide, RightSide, Loading},
  computed: mapState(['user']),
  data: function(){
    return{
      validatingToken: true
    }
  },
  methods: {
    async validateToken(){
      this.validatingToken = true

      const json = localStorage.getItem(userKey)
      const userData = JSON.parse(json)
      this.$store.commit('setUser', null)

      if(!userData){
        this.validatingToken = false
        return this.$router.push({name: 'auth'})
      }

      const res = await axios.post(`${baseApiUrl}/validateToken`, userData)

      if(res.data){
        this.$store.commit('setUser', userData)
      }else{
        localStorage.removeItem(userKey)
        this.$router.push({name: 'auth'})
      }

      this.validatingToken = false
    }
  },
  created(){
    this.validateToken()
  }
}
</script>

<style>
  *{
    font-family: "Leto", sans-serif;
  }

  body{
    margin: 0;
  }

  #app{
    -webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;

    height: 100vh;
    display: grid;
    grid-template-rows: 90px 70px 1fr 40px;
    grid-template-columns: 50px 1fr 50px;
    grid-template-areas: 
      "leftSide header rightSide"
      "leftSide menu rightSide"
      "leftSide content rightSide"
      "footer footer footer";
  }

  #app.hide-menu{
    grid-template-rows: 90px 10px 1fr 40px;
    grid-template-areas: 
      "leftSide header rightSide"
      "leftSide header rightSide"
      "leftSide content rightSide"
      "footer footer footer";
  }

  @media only screen and (max-width: 600px) {
  #app {
    height: 100vh;
    display: grid;
    grid-template-rows: 90px 70px 1fr 40px;
    grid-template-columns:  1fr ;
    grid-template-areas: 
      "header"
      "menu"
      "content"
      "footer";
  }
  }
</style>
