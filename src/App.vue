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
    <h1>Compare your Air</h1>
    <p>Compare the air quality between cities in the UK.</p>
    <p>Select cities to compare using the search tool below.</p>
    <div class="drop-down">
      <input type="text" placeholder="Enter city name..." 
      v-on:focus="focusDropDown"
      v-on:blur="blurDropDown" 
      v-model="search"/>
      <div v-if="openDropDown === true">
        <a 
        v-for="(city, index) in filterCities" :key="index"
        v-on:click="search = city.name">{{city.name}}</a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import openqaService from './services/openqa.js';
import Multiselect from 'vue-multiselect';

export default {
  name: 'app',
  components: {
    Multiselect
  },
  data(){
    return {
      search: '',
      openDropDown: false,
      cityResults: []
    }
  },
  created: function(){
    this.getCities();
  },
  methods: {
    ...mapActions(['getCities']),
    getCity(cityName){
      openqaService.getCity(cityName).then(resp => {
        console.log(resp.data);
      }).catch(() => {

      });
    },
    focusDropDown(){
      this.openDropDown = true;
    },
    blurDropDown(){
      if(search.length < 0){
        this.openDropDown = false;
      }
    }
  },
  computed:{
    ...mapState(['cities']),
    filterCities(){
      return this.cities.results.filter(x => {
        return x.name.toLowerCase().includes(this.search.toLowerCase());
      });
    }
  }
}
</script>