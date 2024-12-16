<template>
  <div class="card flex justify-center">
    <Button
      icon="pi pi-shopping-cart"
      label="Panier"
      @click="visible = true"
      :badge="cartStore.totalItems"
      badgeClass="p-badge-danger"
    />

    <Dialog
      v-model:visible="visible"
      modal
      header="Votre Panier"
      :style="{ width: '50vw' }"
      :breakpoints="{
        '1199px': '75vw',
        '575px': '90vw'
      }"
    >
      <div v-if="cartStore.items.length === 0" class="text-center text-gray-500">
        Votre panier est vide
      </div>

      <div v-else>
        <div
          v-for="item in cartStore.items"
          :key="item.id"
          class="flex justify-between items-center border-b py-2"
        >
          <div>
            <h3 class="font-semibold">{{ item.name }}</h3>
            <div class="flex items-center space-x-2">
              <Button
                icon="pi pi-minus"
                class="p-button-rounded p-button-text p-button-danger"
                @click="cartStore.removeFromCart(item.id)"
              />
              <span>{{ item.quantity }}</span>
              <Button
                icon="pi pi-plus"
                class="p-button-rounded p-button-text p-button-success"
                @click="cartStore.addToCart(item)"
              />
            </div>
          </div>
          <div>
            <p>{{ (item.price * item.quantity).toFixed(2) }}€</p>
          </div>
        </div>

        <div class="mt-4 text-right font-bold">
          Total: {{ cartStore.totalPrice.toFixed(2) }}€
        </div>

        <div class="flex justify-end mt-4 space-x-2">
          <Button
            label="Vider le panier"
            icon="pi pi-trash"
            class="p-button-danger"
            @click="cartStore.clearCart()"
          />
          <Button
            label="Commander"
            icon="pi pi-check"
            class="p-button-success"
          />
        </div>
      </div>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useCartStore } from '../stores/cart'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'

const cartStore = useCartStore()
const visible = ref(false)
</script>
