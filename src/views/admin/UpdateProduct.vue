<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import RegisterProduct  from '@/components/RegisterForm.vue';
import { productService, type Product } from '@/service/ProductService';

const product = ref<Product | null>(null);
const route = useRoute()


onMounted(async () => {
  try {
    const response = await productService.getProductById(route.params.id as string);
    product.value = response.product

  } catch (error) {
    console.error('Erreur lors du chargement du produit', error)
  }
})
</script>

<template>
  <main>
    <h1 class="green">Update {{ product?.name }}</h1>
    <RegisterProduct
    mode="update"
    v-if="product"
    :product=product />
</main>
</template>
