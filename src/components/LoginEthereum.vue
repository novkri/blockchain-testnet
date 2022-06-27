<template>
  <div>
    <button @click="login">Login V2</button>
  </div>
</template>

<script setup>


if (typeof window.ethereum !== 'undefined') {

  console.log('MetaMask is installed!');


}

   const login = async () => {
     const accounts = await window.ethereum.request({ method: 'eth_requestAccounts'})
     const account = accounts[0]
     console.log(account, accounts)

 }


</script>

<style scoped lang="scss"></style>
