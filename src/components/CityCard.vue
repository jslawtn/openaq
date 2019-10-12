<template>
<div class="cityCard">
    <p>{{city.location}}</p>
</div>    
</template>

<script>
export default {
    name: 'cityCard',
    props:{
        city: Object
    }
}
</script>