<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { type Product, productService } from '../service/ProductService'
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'




const products = ref<Product[]>([])
const loading = ref(false)
const error = ref<string | null>(null)
const currentPage = ref(1)
const totalPages = ref(0)
const isCartModalOpen = ref(false)
const displayConfirmationModal = ref(false)
const productToDelete = ref<number | null>(null)

const confirmDelete = (productId: number) => {
          productToDelete.value = productId
          displayConfirmationModal.value = true
}

const handleDeleteProduct = async () => {
  if (productToDelete.value === null) return

  try {
    await productService.deleteProduct(productToDelete.value)
    displayConfirmationModal.value = false
    loadProducts()
  } catch (err) {
    console.error(err)
  }
}

const loadProducts = async (page = 1) => {
  try {
    loading.value = true
    error.value = null
    const response = await productService.getAllProducts(page)
    products.value = response.products.data
    currentPage.value = response.products.current_page
    totalPages.value = response.products.last_page
  } catch (err) {
    error.value = 'Impossible de charger les produits. Veuillez réessayer.'
    console.error(err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadProducts()
})
</script>

<template>
  <div class="container mx-auto p-4">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold green">gestion des produits</h1>
  </div>

  <a href="/admin/gestion-produits/add"><button >add product</button></a>

  </div>
    <div v-if="loading" class="text-center">
      <p>Chargement des produits...</p>
    </div>
    <div v-else-if="error" class="text-red-500">
      {{ error }}
    </div>
    <div v-else class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <div
        v-for="product in products"
        :key="product.id"
        class="border rounded-lg p-4 shadow-md"
      >
        <img
          :src="'https://primefaces.org/cdn/primevue/images/product/bracelet.jpg'"
          :alt="product.name"
          class="w-full h-48 object-cover mb-4 rounded"
        />
        <h2 class="text-xl font-semibold mb-2">{{ product.name }}</h2>
        <p class="text-gray-600 mb-2">{{ product.description }}</p>
        <div class="flex justify-between items-center">
          <span class="text-lg font-bold">{{ product.price }}€</span>
          <span class="text-sm text-gray-500">Stock: {{ product.stock }}</span>
        </div>
        <button
          @click="confirmDelete(product.id)"
          class="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Delete
        </button>

        <button
          class="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          edite
        </button>
      </div>
    </div>

    <div v-if="totalPages > 1" class="mt-6 flex justify-center">
      <button
        v-for="page in totalPages"
        :key="page"
        @click="loadProducts(page)"
        :class="{
          'bg-blue-500 text-white': currentPage === page,
          'bg-gray-200': currentPage !== page
        }"
        class="mx-1 px-4 py-2 rounded"
      >
        {{ page }}
      </button>
    </div>
    <Dialog
      v-model:visible="displayConfirmationModal"
      header="Confirmation de suppression"
      modal
      :style="{ width: '450px' }"
    >
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
        <span>Êtes-vous sûr de vouloir supprimer ce produit ?</span>
      </div>
      <template #footer>
        <Button
          label="Non"
          icon="pi pi-times"
          @click="displayConfirmationModal = false"
          text
        />
        <Button
          label="Oui"
          icon="pi pi-check"
          @click="handleDeleteProduct"
          severity="danger"
          text
        />
      </template>
    </Dialog>

</template>
