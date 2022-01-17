<template>
  <div>
    <link rel="stylesheet" 
        href="https://use.fontawesome.com/releases/v5.2.0/css/all.css" 
        integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ" 
        crossorigin="anonymous">
    <header>
      <a href="/" @click="reloadPage">Our Mobility in Knots</a>
    </header>
    <Dataviz/>
  </div>
</template>

<script>
import Dataviz from './components/Dataviz.vue'

export default {
  components:{
    Dataviz
  },
  methods:{
    reloadPage(){
        window.location.reload();
    }
  }
}
</script>

<style lang="scss">
@import "./assets/_config.scss";

* {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
}

#app {
  font-family: Roboto, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $light;
  margin:0;
  background-color:$darkgrey;
}

// #nav a {
//   font-weight: bold;
// }

header {
  position:fixed;
  z-index:3;
  background-color: $light;
  padding: 0.5rem;
  color: $darkgrey;
  display: block;
  text-align:left;
  border-radius: 1rem;
  font-family: Vollkorn;
  font-size:1.3rem;
  margin:5vw;
  margin-top:2rem;

  a{
    text-decoration: none;
    color: $darkgrey;
  }
}

</style>
