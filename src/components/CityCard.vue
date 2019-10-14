<template>
<div class="card-container">
    <div class="w-100">
        <button class="float-right btn" v-on:click="closeCard">
            <i class="fa fa-close"></i>
        </button>
    </div><br/>
    <p class="card-container-datetime mb-1">UPDATED {{formatDateTime(city.measurements[0].lastUpdated)}}</p>
    <h5 class="card-container-title">{{city.location}}</h5>
    <p class="mb-1">in {{city.city}}, United Kingdom</p>
    <p class="text-detail mb-0">{{measurements}}</p>
</div>    
</template>

<script>
import { formatDateTime } from '../helpers/datetime.js';

export default {
    name: 'cityCard',
    props:{
        city: Object
    },
    data(){
        return{
            measurements: 'Values: '
        }
    },
    created: function(){
        this.city.measurements.forEach((x, index) => {
            this.measurements += `${x.parameter.toUpperCase()}: ${x.value} ${index < this.city.measurements.length - 1 ? ', ': ' '}`;
        });
    },
    methods:{
        formatDateTime,
        closeCard(){
            this.$emit('closeCard');
        }
    }
}
</script>