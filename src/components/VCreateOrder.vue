<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const title = ref('');
const price = ref(0);
const description = ref('');
const category = ref('');
const image = ref('');

const router = useRouter();

function addProduct() {
  const newProduct = {
    id: Date.now(), // уникальный id
    title: title.value,
    price: price.value,
    description: description.value,
    category: category.value,
    image: image.value,
    rating: { rate: 0, count: 0 } // по умолчанию
  };

  const saved = localStorage.getItem('localProducts');
  const products = saved ? JSON.parse(saved) : [];
  products.push(newProduct);
  localStorage.setItem('localProducts', JSON.stringify(products));

  alert('Product added successfully!');
  router.push('/');
}
</script>

<template>
  <div class="form">
    <form>
    <h2>Add New Product</h2>
    <label>
      Title:
      <input :id='Math.random() * 100' v-model="title" type="text" />
    </label>
    <label>
      Price:
      <input :id='Math.random() * 100' v-model="price" type="number" />
    </label>
    <label>
      Description:
      <textarea rows="2" cols="30" :id='Math.random() * 100' v-model="description" />
    </label>
    <label>
      Category:
      <input :id='Math.random() * 100' v-model="category" type="text" />
    </label>
    <label>
      Image URL:
      <input :id='Math.random() * 100' v-model="image" type="text" />
    </label>
    <button type="submit" @click="addProduct">Add Product</button>
    </form>
  </div>
</template>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  width: 400px;
  gap: 20px;
  margin: 50px auto;
}
label {
  display: flex;
  flex-direction: column;
}
button {
  padding: 10px;
  font-weight: bold;
}
</style>
