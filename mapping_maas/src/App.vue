<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div>
  <router-view/>
</template>

<style lang="scss">
@import "./assets/_config.scss";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $dark;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: $light;
}

#nav a.router-link-exact-active {
  color: $highlight;
}

</style>
