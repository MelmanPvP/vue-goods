<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import VCard from "./VCard.vue";

const props = defineProps<{
  filterName: string | null;
  filterPrice: number | null;
}>();

const apiData = ref([]);
const localProducts = ref([]);
const error = ref(null);

function loadLocalProducts() {
  const saved = localStorage.getItem("localProducts");
  if (saved) {
    try {
      localProducts.value = JSON.parse(saved);
    } catch (e) {
      localProducts.value = [];
    }
  }
}

onMounted(async () => {
  loadLocalProducts();
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    if (!response.ok) throw new Error("Failed to fetch the products");
    apiData.value = await response.json();
  } catch (err: any) {
    error.value = err.message;
  }
});

const allProducts = computed(() => [...apiData.value, ...localProducts.value]);

const filteredData = computed(() => {
  return allProducts.value.filter((product: any) => {
    const matchesName = props.filterName
        ? product.title.toLowerCase().includes(props.filterName.toLowerCase())
        : true;
    const matchesPrice =
        props.filterPrice !== null && props.filterPrice !== undefined
            ? product.price <= props.filterPrice
            : true;
    return matchesName && matchesPrice;
  });
});
</script>

<template>
  <div class="cards">
    <VCard
        v-for="card in filteredData"
        :key="card.id"
        :title="card.title"
        :price="card.price"
        :description="card.description"
        :category="card.category"
        :image="card.image"
        :rating="card.rating?.rate ?? 0"
        :count="card.rating?.count ?? 0"
    />
    <div v-if="error" class="error">{{ error }}</div>
  </div>
</template>

<style scoped>
.cards {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 30px;
  margin: auto;
}
.error {
  color: red;
  font-weight: bold;
}
</style>
