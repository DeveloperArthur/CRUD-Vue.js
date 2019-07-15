<template>
  <div id="app">
    <app-home></app-home>
    <br>
      <div id="corpo">
        <router-view></router-view>
      </div>
  </div>
</template>

<script>
import Home from './components/Home.vue';

export default {
  components:{
    AppHome: Home
  }
}
</script>

<style>
  header{
    background-color: #0040FF;
    display: flex;
    flex-direction: column;
  }

  header ul li { 
    display: inline;
  }

  header ul li a:hover {
    background-color:#2E9AFE;
    color: black;
    border-bottom:3px solid #EA0000;
  }

  a{
    font-size: 25px;
    border: 2px solid white;
    color: white
  }

  body{
    background-color: white;
    font-family: Helvetica, Arial, sans-serif;
    margin: 0;
  }

  #corpo{
    font-size: 30px
  }
</style>
