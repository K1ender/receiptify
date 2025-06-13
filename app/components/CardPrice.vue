<script lang="ts" setup>
import type { Item } from '~~/shared/types';

const { item, currency = "" } = defineProps<{
  item: Item,
  currency?: string
}>()
</script>

<template>
  <div class="card_price">
    <h4>{{ item.name }} x {{ item.quantity }}</h4>
    <p class="price">{{ item.total }} {{ currency }}</p>
  </div>
</template>

<style scoped>
.card_price {
  word-wrap: break-word;
}

.price {
  font-size: 0.8rem;
  line-height: 0.8rem;
}
</style>