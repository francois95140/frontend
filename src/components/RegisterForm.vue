<script setup lang="ts">
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import FloatLabel from 'primevue/floatlabel'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import { computed, onMounted, ref } from 'vue'
import type { Product } from '@/services/ProductService'
import { productService } from '@/services/ProductService'
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps<{
  product?: Product | null
  mode?: 'create' | 'update'
}>()

const name = ref<string>('')
const image = ref<string>('')
const visible = ref(false)
const description = ref<string>('')
const price = ref<number>(0)
const stock = ref<number>(0)
const productId = ref<number | null>(null)

const resetForm = () => {
  name.value = ''
  description.value = ''
  price.value = 0
  stock.value = 0
  image.value = ''
  productId.value = null
}

const isRegisterDisabled = computed(
  () =>
    name.value.length > 0 &&
    description.value.length > 0 &&
    price.value > 0 &&
    image.value.length > 0 &&
    stock.value > 0,
)

const HandleRegistrer = async () => {
  try {
    const productData: Product = {
      name: name.value,
      description: description.value,
      price: price.value,
      stock: stock.value,
      image: image.value,
    }

    if (props.mode === 'update' && productId.value) {
      await productService.updateProduct(productId.value, productData)
    } else {
      await productService.createProduct(productData)
      resetForm()
    }
    visible.value = true
  } catch (error) {
    console.log(error)
  }
}

const HandleBack = () => {
  router.push({
    name: 'gestion-produits',
  })
}

onMounted(() => {
  if (props.product && props.mode === 'update') {
    name.value = props.product.name
    description.value = props.product.description
    price.value = props.product.price
    stock.value = props.product.stock
    image.value = props.product.image || ''
    productId.value = props.product.id || null
  }
})
</script>

<template>
  <div class="flex flex-column row-gap-5">
    <InputGroup>
      <InputGroupAddon>
        <i class="pi pi-user"></i>
      </InputGroupAddon>
      <FloatLabel>
        <InputText type="text" id="name" v-model="name" />
        <label for="name">Name</label>
      </FloatLabel>
    </InputGroup>
    <InputGroup>
      <InputGroupAddon>
        <i class="pi pi-user"></i>
      </InputGroupAddon>
      <FloatLabel>
        <InputText type="text" id="description" v-model="description" />
        <label for="description">Description</label>
      </FloatLabel>
    </InputGroup>
    <InputGroup>
      <InputGroupAddon>
        <i class="pi pi-user"></i>
      </InputGroupAddon>
      <FloatLabel>
        <InputNumber
          currency="EUR"
          mode="currency"
          type="decimal"
          id="price"
          v-model="price"
          fluid
        />
        <label for="price">price</label>
      </FloatLabel>
    </InputGroup>
    <InputGroup>
      <InputGroupAddon>
        <i class="pi pi-user"></i>
      </InputGroupAddon>
      <FloatLabel>
        <InputNumber type="number" id="stock" v-model="stock" />
        <label for="stock">Stock</label>
      </FloatLabel>
    </InputGroup>
    <InputGroup>
      <InputGroupAddon>
        <i class="pi pi-link"></i>
      </InputGroupAddon>
      <FloatLabel>
        <InputText type="url" id="image" v-model="image" />
        <label for="image">Image link</label>
      </FloatLabel>
    </InputGroup>
    <Dialog
      v-model:visible="visible"
      modal
      header="Success"
      :style="{ width: '50vw' }"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    >
      <p class="m-0">
        {{ name || 'Product' }} has {{ mode === 'create' ? 'been registered' : 'been updated' }}
      </p>
    </Dialog>

    <Button label="Cancel" @click="HandleBack"></Button>
    <Button
      :label="mode === 'create' ? 'create' : 'update'"
      :disabled="!isRegisterDisabled"
      @click="HandleRegistrer"
    ></Button>
  </div>
</template>
