<template>
  <div class="mx-16">
    <button v-if="!isLoggedIn" class="px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform
        bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
        @click="login">
      Login with Metamask
    </button>
    <div v-else>
      <button v-if="isLoggedIn" class="px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform
        bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
              @click="logout">
        Logout
      </button>

      <div>
        <label for="username">Change Username</label>
        <input id="username" v-model="newUsername" @keyup.enter="changeUsername" />
      </div>


      <div class="grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-16 md:grid-cols-2 xl:grid-cols-3" v-if="isLoggedIn">
        <InfoCard title="User Address" :data="userAddress" />
        <InfoCard title="UserName" :data="userName" bg-color="bg-lime-500" />

        <InfoCard :title="`Incoming Transaction № ${idx + 1}`"  bg-color="bg-orange-500"
                  v-for="(item, idx) in toTransactions" :key="item.id" :is-slot="true">
          <ListCard :item="item" />
        </InfoCard>
        <InfoCard :title="`Outgoing Transaction № ${idx + 1}`" :data="item" bg-color="bg-red-500"  v-for="(item, idx) in fromTransactions" :key="item.id" :is-slot="true">
          <ListCard :item="item" />
        </InfoCard>

        <!--      <span>User Wallet:</span>-->
        <!--      <span>User Balance:</span>-->
        <!--      <br />-->

      </div>


    </div>

  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import Moralis from "moralis";
import InfoCard from "@/components/InfoCard";
import ListCard from "@/components/ListCard";

onMounted(() => {
  Moralis.initialize('k6Yw8DJsnI8k2habAxoQol1ysADfmrr5vF7iH8gi')
  Moralis.serverURL = "https://njqekmp4bmox.usemoralis.com:2053/server"
})

const userAddress = ref('')
// const userBalance = ref('')
const userName = ref('')
const userAuthData = ref()

const toTransactions = ref()
const fromTransactions = ref()

const isLoggedIn = ref(false)
const currentUser = ref()

const newUsername = ref('')

const serverUrl = "https://njqekmp4bmox.usemoralis.com:2053/server";
const appId = "k6Yw8DJsnI8k2habAxoQol1ysADfmrr5vF7iH8gi";

onMounted(() => {
  Moralis.start({serverUrl, appId})
  currentUser.value = Moralis.User.current()

  console.log(currentUser.value)
  if (currentUser.value) {
    getUserInfo()
  }
})

const getEthAddress = () => {
  userAddress.value = currentUser.value.get('ethAddress')
}

// const getAuthData = () => {
//   userAuthData.value = currentUser.value.get('authData')
// }

const getUsername = () => {
  userName.value = currentUser.value.get('username')
}



const getUserInfo = async() => {
  isLoggedIn.value = true

  getEthAddress()
  getUsername()


  console.log( Moralis.Web3API.account)
  const transactions = await Moralis.Web3API.account.getTransactions();
  console.log('transactions', transactions)


  // const options = {
  //   chain: "eth",
  //   address: userAddress.value,
  //   to_block: 0
  // };
  const balance = await Moralis.Web3API.account.getNativeBalance();
  console.log('balance', balance)

  // const options2 = {
  //   chain: "0x4",
  //   address: userAddress.value,
  //   to_block: 0
  // };
  const balances = await Moralis.Web3API.account.getTokenBalances();
  console.log('balances', balances)


  toTransactions.value = await findTransactions('to_address')
  fromTransactions.value = await findTransactions('from_address')

  listenToUpdates()
}

const findTransactions = async (queryOperator) => {
  const query = new Moralis.Query("EthTransactions");

  query.equalTo(queryOperator, userAddress.value);
  const results = await query.find();
  console.log(results)
  return results
}

const login = async () => {

  if (!currentUser.value) {
    currentUser.value  = await Moralis.Web3.authenticate({signingMessage:"My custom message"})
  }

  await getUserInfo()
}

const logout = async () => {
  await Moralis.User.logOut()
  isLoggedIn.value = false

  userName.value = ''
  userAddress.value = ''
  userAuthData.value = null
  currentUser.value = Moralis.User.current()

  console.log('logged out')
}

const changeUsername = () => {
  console.log(newUsername.value)
  Moralis.User.setUsername(newUsername.value)
}

// todo
const listenToUpdates = async () => {
  let query = new Moralis.Query('EthTransactions')
  let subscription = await query.subscribe()

  subscription.on('create', obj => {
    console.log('New transaction!')
    console.log(obj)
  })
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
