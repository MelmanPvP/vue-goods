<script setup lang="ts">
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import { useRouter } from 'vue-router'
import {ref} from "vue";

// роутер для редиректа
const router = useRouter()

// схема валидации через yup
const schema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  birth: yup.string().matches(/^\d{2}\.\d{2}\.\d{4}$/, 'Invalid date format').required(),
  country: yup.string().required(),
  card: yup.string().required(),
  address: yup.string().required(),
  agreement: yup.boolean().oneOf([true], 'You must agree')
})


const { handleSubmit, errors } = useForm({
  validationSchema: schema
})


const { value: name } = useField('name')
const { value: email } = useField('email')
const { value: birth } = useField('birth')
const { value: country } = useField('country')
const { value: card } = useField('card')
const { value: address } = useField('address')
const { value: agreement } = useField('agreement')


const success = ref(false)

const onSubmit = handleSubmit(async (formData) => {
  try {
    const response = await fetch('https://httpbin.org/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })

    if (!response.ok) {
      throw new Error('Network response failed')
    }

    alert('Order submitted successfully!')
    router.push('/')
  } catch (err) {
    alert('Something went wrong: ' + err.message)
  }
})
</script>

<template>
  <div class="inputs">
    <label class="label">
      Enter name
      <input v-model="name" />
      <span class="error">{{ errors.name }}</span>
    </label>

    <label class="label">
      Enter email
      <input v-model="email" />
      <span class="error">{{ errors.email }}</span>
    </label>

    <label class="label">
      Enter birth date
      <input v-model="birth" placeholder="xx.xx.xxxx" />
      <span class="error">{{ errors.birth }}</span>
    </label>

    <label class="label">
      Enter country
      <input v-model="country" />
      <span class="error">{{ errors.country }}</span>
    </label>

    <label class="label">
      Enter card number
      <input v-model="card" />
      <span class="error">{{ errors.card }}</span>
    </label>

    <label class="label">
      Enter address
      <input v-model="address" />
      <span class="error">{{ errors.address }}</span>
    </label>

    <label>
      Agree with order processing policy
      <input type="checkbox" v-model="agreement" />
      <span class="error">{{ errors.agreement }}</span>
    </label>

    <button @click="onSubmit">Send</button>

    <p v-if="success">Order placed successfully!</p>
  </div>
</template>

<style scoped>
.inputs {
  display: flex;
  width: fit-content;
  flex-direction: column;
  gap: 20px;
  margin: auto;
}
.label {
  display: flex;
  flex-direction: column;
}
button {
  width: 100px;
  margin: auto;
}
.error {
  color: red;
  font-size: 0.8em;
}
</style>
