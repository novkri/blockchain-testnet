<template>
  <div class="space-y-3">
    <h1 class="text-2xl font-semibold text-gray-700 capitalize dark:text-white">{{props.title}}</h1>

    <div v-if="isSlot" class="mb-3 p-8 text-white transition ease-in text-lg font-bold
                duration-200 text-center rounded-md" :class="`${bgColor}`">
      <slot />
    </div>
    <p v-else class="mb-3 p-8 text-white transition ease-in text-lg font-bold
                duration-200 text-center rounded-md" :class="`${bgColor}`">
      {{props.data}}
    </p>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  data: {
    type: [String, Number, Object, Array],

  },
  bgColor: {
    type: String,
    default: 'bg-sky-500'
  },
  isSlot: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped lang="scss"></style>
