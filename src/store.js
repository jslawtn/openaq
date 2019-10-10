import Vue from 'vue';
import Vuex from 'vuex';
import openqaService from './services/openqa';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        cities: {}
    },
    mutations: {
        updateCities: (state, cities) => {
            state.cities = cities;
        }
    },
    actions: {
        getCities({ commit }){
            openqaService.getCities().then(resp => {
                commit('updateCities', resp.data);
            }).catch(() => {
                commit('updateCities', null);
            });
        }
    }
});