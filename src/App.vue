<template>
  <div id="app">
    <app-home></app-home>
    <hr>
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
    background-color: aqua;
    display: flex;
    flex-direction: column;
  }

  header ul li { 
    display: inline;
  }

  header ul li a:hover {
    background-color:#D6D6D6;
    color: #6D6D6D;
    border-bottom:3px solid #EA0000;
  }

  a{
    font-size: 38px;
  }

  body{
    font-family: Helvetica, Arial, sans-serif;
    margin: 0;
  }

  #corpo{
    font-size: 30px
  }
</style>
