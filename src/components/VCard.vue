<script setup lang="ts">
const props = defineProps({
  id:Number,
  title: String,
  price: Number,
  description: String,
  category: String,
  image: String,
  rating: Number,
  count: Number,
    })
</script>

<template>
     <div class="card" :key="id">
       <h2>{{title}}</h2>
       <img class="img" :src= "image" alt = ''  />
       <p>{{price}}$</p>
       <span>{{description}}</span>
       <p>Category: {{category}}</p>
       <p>Rating: {{rating}}</p>
       <p>Reviews:{{count}}</p>
     </div>
</template>

<style scoped>
.card{
  width: 400px;
  height:fit-content;
  border: 1px solid black;
  border-radius: 10px;
}
.img{
  width:200px;
}
</style>