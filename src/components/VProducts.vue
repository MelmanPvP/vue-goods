<script setup lang="ts">
import {onMounted, ref} from "vue";
import VCard from "./VCard.vue";

const data = ref(null)
const error = ref(null)

onMounted(async () => {
  try {
    const response = await fetch('https://fakestoreapi.com/products')
    if (!response.ok) {
      throw new Error('Failed to fetch the products')
    }
    data.value = await response.json()
  }
  catch (err){
    err.value = err.message
  }
})
</script>

<template>
  <div class="cards">
    <VCard v-for="card in data" :key="card.id" :title="card.title" :price='card.price' :description= "card.description"
           :category="card.category" :image="card.image" :rating="card.rating.rate" :count="card.rating.count"
    />

  </div>
</template>

<style scoped>
.cards{
  width: 100%;
  display: grid;
  grid-template-columns: 500px 500px 500px 500px;
  gap:30px;
  margin: auto;
}
</style>