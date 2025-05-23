<script setup lang="ts">

import VHeader from "./VHeader.vue";
import VProducts from "./VProducts.vue";
import {ref} from "vue";



const filterName = ref('');
const filterPrice = ref<number | null>(null);
</script>

<template>
  <VHeader v-model:name="filterName" v-model:price="filterPrice" />
  <router-link to="/order">
    <button>Go to order</button>
  </router-link>
<RouterLink to="/create">
  <button>Creation form</button>
</RouterLink>
  <VProducts :filterName="filterName" :filterPrice="filterPrice" />
</template>

<style scoped>

</style>