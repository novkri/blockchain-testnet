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


     // latest, earliest, pending
     const balance = await window.ethereum.request({ method: 'eth_getBalance', params: [account, 'pending']})
     console.log(balance)
     const EthBal = balance * Math.pow(10,(-18));
     console.log("Eth balance = " + EthBal);

     // todo several accounts
 }

// const loadBalance = () => {}


</script>

<style scoped lang="scss"></style>