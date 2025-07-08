<script setup lang="ts">
import { defineEmits, defineProps } from "vue";

const props = defineProps({
  id:Number,
  name: String,
  price: [Number, String]
});

const emit = defineEmits(['update:name', 'update:price']);

function updateName(e: Event) {
  emit('update:name', (e.target as HTMLInputElement).value);
}

function updatePrice(e: Event) {
  const val = (e.target as HTMLInputElement).value;
  emit('update:price', val === '' ? null : Number(val));
}
</script>

<template>
  <div class="header">
    <input :id = 1 :value="props.name" @input="updateName" placeholder="Enter name of a product" type="text" />
    <input :id = 2 :value="props.price" @input="updatePrice" placeholder="Enter max price" type="number" />
  </div>
</template>

<style scoped>
.header {
  width: fit-content;
  height: auto;
  margin: 30px auto;
  display: flex;
  flex-direction: column;
  gap: 15px;
}
</style>
