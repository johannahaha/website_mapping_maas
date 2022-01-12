<template>
  <div id="nav">
    <link rel="stylesheet" 
        href="https://use.fontawesome.com/releases/v5.2.0/css/all.css" 
        integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ" 
        crossorigin="anonymous">
    <header>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </header>
  </div>
  <router-view/>
</template>

<style lang="scss">
@import "./assets/_config.scss";

* {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $mediumblue;
  margin:0;
  background-color:$darkgrey;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: $green;
}

#nav a.router-link-exact-active {
  color: $lightgreen;
}

header {
  position:fixed;
  
}

</style>
