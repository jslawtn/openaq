<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

<template>
  <div id="app">
    <div v-for="(city, index) in $store.state.cities.results" :key="index">
      {{city.name}}
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'app',
  components: {},
  created: function(){
    this.getCities();
  },
  methods: {
    ...mapActions(['getCities'])
  },
}
</script>