<template>
  <div class="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
    <ul class="flex flex-wrap -mb-px">
      <li class="mr-2" v-for="item in props.items" :key="item" @click="$emit('select-tab', item)">
        <a href="#" class="inline-block p-4 rounded-t-lg border-b-2 border-transparent text-2xl
          hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300" :class="{'text-red-500 border-red-400 active' : item === props.activeTab}">
          {{ item }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { defineProps } from "vue";


const props = defineProps({
  items: {
    type: Array,
    required: true
  },
  activeTab: {
    type: String,
    default: 'Wallet'
  }
})
</script>

<style scoped lang="scss"></style>
