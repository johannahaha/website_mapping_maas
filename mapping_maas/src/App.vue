<template>
  <div id="nav">
    <link rel="stylesheet" 
        href="https://use.fontawesome.com/releases/v5.2.0/css/all.css" 
        integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ" 
        crossorigin="anonymous">
    <header>
      <router-link to="/">Our Mobility in Knots</router-link>
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
  font-family: Roboto, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $light;
  margin:0;
  background-color:$darkgrey;
}

#nav {
  font-family: Vollkorn;
  font-size:1rem;
  padding: 30px;
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


  a{
    text-decoration: none;
    color: $darkgrey;
  }
}

</style>
