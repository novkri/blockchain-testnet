<template>
  <div>
    <div class="flex flex-col sm:flex-row justify-between items-center sm:items-start py-3  border-gray-300 last:border-none">
      <span class="w-full sm:w-1/3 font-medium text-center sm:text-left">From:</span>
      <span class="flex-1 text-center sm:text-left">{{item.attributes.from_address}}</span>
    </div>

    <div class="flex flex-col sm:flex-row justify-between items-center sm:items-start py-3 border-t border-gray-300 last:border-none">
      <span class="w-full sm:w-1/3 font-medium text-center sm:text-left">To:</span>
      <span class="flex-1 text-center sm:text-left">{{props.item.attributes.to_address}}</span>
    </div>

    <div class="flex flex-col sm:flex-row justify-between items-center sm:items-start py-3 border-t border-gray-300 last:border-none">
      <span class="w-full sm:w-1/3 font-medium text-center sm:text-left">Value: </span>
      <span class="flex-1 text-center sm:text-left">{{props.item.attributes.value}}</span>
    </div>

    <div class="flex flex-col sm:flex-row justify-between items-center sm:items-start py-3 border-t border-gray-300 last:border-none">
      <span class="w-full sm:w-1/3 font-medium text-center sm:text-left">Block Number:</span>
      <span class="flex-1 text-center sm:text-left">{{props.item.attributes.block_number}}</span>
    </div>

    <div class="flex flex-col sm:flex-row justify-between items-center sm:items-start py-3 border-t border-gray-300 last:border-none">
      <span class="w-full sm:w-1/3 font-medium text-center sm:text-left">Confirmed: </span>
      <span class="flex-1 text-center sm:text-left">{{props.item.attributes.confirmed}}</span>
    </div>

    <div class="flex flex-col sm:flex-row justify-between items-center sm:items-start py-3 border-t border-gray-300 last:border-none">
      <span class="w-full sm:w-1/3 font-medium text-center sm:text-left">Gas: </span>
      <span class="flex-1 text-center sm:text-left">{{props.item.attributes.gas}}</span>
    </div>
    <div class="flex flex-col sm:flex-row justify-between items-center sm:items-start py-3 border-t border-gray-300 last:border-none">
      <span class="w-full sm:w-1/3 font-medium text-center sm:text-left">Gas Price: </span>
      <span class="flex-1 text-center sm:text-left">{{props.item.attributes.gas_price}}</span>
    </div>
    <div class="flex flex-col sm:flex-row justify-between items-center sm:items-start py-3 border-t border-gray-300 last:border-none">
      <span class="w-full sm:w-1/3 font-medium text-center sm:text-left">Confirmed: </span>
      <span class="flex-1 text-center sm:text-left">{{props.item.attributes.confirmed}}</span>
    </div>

    <div class="flex flex-col sm:flex-row justify-between items-center sm:items-start py-3 border-t border-gray-300 last:border-none">
      <span class="w-full sm:w-1/3 font-medium text-center sm:text-left">Transaction Index: </span>
      <span class="flex-1 text-center sm:text-left">{{props.item.attributes.transaction_index}}</span>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  item: {
    type: Object
  }
})
</script>

<style scoped lang="scss"></style>
