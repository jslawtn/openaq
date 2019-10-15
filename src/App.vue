<style>
#app { 
  margin-top: 60px;
}
</style>

<template>
  <div id="app" class="container text-centre">
    <div class="mb-5">
      <h1 class="mb-4 text-white">Compare your Air</h1>
      <p class="mb-0 text-white">Compare the air quality between cities in the UK.</p>
      <p class="text-white">Select cities to compare using the search tool below.</p>
    </div>
    <div>
      <div class="search-container mb-5"  v-clickout="closelist">
        <i class="fa fa-search"></i>
        <input type="text" placeholder="Enter city name..." 
        v-on:focus="focusDropDown"
        v-model="search"/>
        <div  v-if="openDropDown === true" class="dropdown-container">
          <a class="dropdown-item"
          v-for="(city, index) in filterCities" :key="index"
          v-on:click="getCity(city.name)">{{city.name}}</a>
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-around flex-wrap">
      <div v-for="(cityInfo, index) in cityResults" :key="index">
        <CityCard :city="cityInfo" @closeCard="removeCard(index)"></CityCard>
      </div>
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
      cityResults: [],
      handleOutsideClick:{}
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

      if(this.cityResults.find(x => x.city === cityName)){
        return;
      }
      openqaService.getCity(cityName).then(resp => {
        this.cityResults.push(resp.data.results[0]);
      });
    },
    focusDropDown(){
      this.openDropDown = true;
    },
    removeCard(index){
      this.cityResults.splice(index, 1);
    },
    closelist(){
      this.openDropDown = false;
    }
  },
  computed:{
    ...mapState(['cities']),
    filterCities(){
      return this.cities.results.filter(x => {
        return x.name.toLowerCase().startsWith(this.search.toLowerCase());
      });
    }
  },
  directives:{
    clickout: {
    bind (el, binding, vnode) {
      el.clickOutsideEvent = function (event) {
        event.stopPropagation();
        if (!(el == event.target || el.contains(event.target))) {
          vnode.context[binding.expression](event);
        }
      };
      document.body.addEventListener('click', el.clickOutsideEvent);
    },
    unbind(el) {
        document.body.removeEventListener('click', el.clickOutsideEvent);
    }
  }}
}
</script>