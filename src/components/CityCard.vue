<template>
<div class="card-container">
    <h5 class="card-container-title">{{city.location}}</h5>
    <p>in {{city.city}}, United Kingdom</p>
    <p class="text-detail">Values: PM25: {{PM25}}, SO2: {{SO2}}, O3: {{O3}}, NO2: {{NO2}} </p>
</div>    
</template>

<script>
export default {
    name: 'cityCard',
    props:{
        city: Object
    },
    data(){
        return{
            PM25: '',
            SO2: '',
            O3: '',
            NO2: ''
        }
    }
}
</script>