<script setup lang="ts">
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import InputText from 'primevue/inputtext';
import FloatLabel from 'primevue/floatlabel';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import { computed, ref } from 'vue';

import axios from 'axios';

const name = ref<string>('')
const visible = ref(false);
const description = ref<string>('')
const price = ref<number>()
const stock = ref<number>()

const isRegisterDisabled = computed (() => name.value.length > 0 && description.value.length > 0 && price.value > 0 )

const HandleRegistrer = async () => {
  try
  {
     axios.post('http://localhost:8000/api/products', {
      name: name.value,
      description: description.value,
      price: price.value,
      stock: stock.value
    })

    visible.value = true


  }catch (error) {
    console.log(error)
  }

}

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
        <InputText type="decimal" id="price" v-model="price" />
        <label for="price">price</label>
      </FloatLabel>
    </InputGroup>
    <InputGroup>
        <InputGroupAddon>
            <i class="pi pi-user"></i>
        </InputGroupAddon>
        <FloatLabel>
        <InputText type="number" id="stock" v-model="stock" />
        <label for="stock">Stock</label>
      </FloatLabel>
    </InputGroup>

    <Dialog v-model:visible="visible" modal header="Success" :style="{ width: '50vw' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
    <p class="m-0">
    {{ name }} has been registered
    </p>
    </Dialog>

    <Button label="Register" :disabled="!isRegisterDisabled" @click="HandleRegistrer"></Button>
</div>

</template>
