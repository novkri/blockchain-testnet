<template>
  <div>
    Test
    <br />
    <button @click="login">
      Login with Metamask
    </button>
  </div>
</template>

<script setup>
import {onMounted} from "vue";
import Moralis from "moralis";

onMounted(() => {
  Moralis.initialize('k6Yw8DJsnI8k2habAxoQol1ysADfmrr5vF7iH8gi')
  Moralis.serverURL = "https://njqekmp4bmox.usemoralis.com:2053/server"
})

const login = async () => {
  console.log('login clicked')
  const user = await Moralis.authenticate({signingMessage:"My custom message"})
  if (user) {
    console.log(user)
    console.log('ethAddress: ', user.get('ethAddress'))
    console.log('username: ', user.get('username'))
    console.log('authData: ', user.get('authData'))

    const {data, id, signature } = user.get('authData').moralisEth
    console.log(data, id, signature )
    // const authData = user.authData
  }
}

</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
