<template>
  <div>
    <Suspense>
      <HelloWorld />

    </Suspense>
  </div>
</template>

<script setup>
import HelloWorld from '@/components/HelloWorld'

</script>

<style>

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  text-align: start;
}

*, *::before, *::after {
  box-sizing: border-box;
}
</style>
