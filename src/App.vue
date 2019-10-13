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
  <div id="app" class="container">
    <div class="mb-5">
      <h1 class="mb-4 text-white">Compare your Air</h1>
      <p class="mb-0 text-white">Compare the air quality between cities in the UK.</p>
      <p class="text-white">Select cities to compare using the search tool below.</p>
    </div>
    <div>
      <div class="search-container">
        <i class="fa fa-search"></i>
        <input type="text" placeholder="Enter city name..." 
        v-on:focus="focusDropDown"
        v-on:blur="blurDropDown" 
        v-model="search"/>
        <div v-if="openDropDown === true" class="dropdown-container">
          <a class="dropdown-item"
          v-for="(city, index) in filterCities" :key="index"
          v-on:click="getCity(city.name)">{{city.name}}</a>
        </div>
      </div>
    </div>
    <div v-for="(cityInfo, index) in cityResults" :key="index">
      <CityCard :city="cityInfo"></CityCard>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import openqaService from './services/openqa.js';
import CityCard from './components/CityCard.vue';

export default {
  name: 'app',
  components: {
    CityCard
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
      this.search = cityName;
      this.openDropDown = false;
      openqaService.getCity(cityName).then(resp => {
        this.cityResults.push(resp.data.results[0]);
      }).catch(() => {

      });
    },
    focusDropDown(){
      this.openDropDown = true;
    },
    blurDropDown(){
      this.openDropDown = false;
      // if(this.search.length < 0){
      //   this.openDropDown = false;
      // }
    },
    removeCard(index){
      this.cityResults.splice(index, 1);
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