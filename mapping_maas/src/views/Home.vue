<template>
  <div class="home">
    <div class="title">Dataviz: Mapping Maas</div>
    <Dataviz/>
  </div>
</template>

<script>
// @ is an alias to /src
import Dataviz from '../components/Dataviz.vue'

export default {
  name: 'Home',
  components: {
    Dataviz
  }
}

</script>

<style lang="scss" scoped>

.title{
  font-size:2rem;
  left:0;
  padding: 1rem 0;
  margin-left:10vw;
}

</style>