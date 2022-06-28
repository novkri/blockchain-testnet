<template>
  <div>
    <div class="nav px-8 py-8 flex justify-end">
      <button class="text-white bg-red-500 px-8 py-2 rounded-full border-none text-2xl" @click="login" v-if="!isLoggedIn">
        Login with Metamask
      </button>
      <button class="text-red-500 px-8 py-2 rounded-full border border-red-500 text-2xl" @click="logout" v-else>
        Logout
      </button>
    </div>

    <!--    todo tabs -->
    <!--    https://tailwind-elements.com/docs/standard/navigation/tabs/-->
    <!--    https://flowbite.com/docs/components/tabs/-->
    <hr />
    <br />
    <div class="box-section">
      <div class="subtitle1 mb-8">Wallet Info</div>
      <div class="pl-8">
        <div class="flex items-center mb-4">
          <div class="min-w-max label w-1/5">Address:</div>
          <div class="subtitle2">{{ userAddress }}</div>
        </div>

        <div class="flex items-center mb-4">
          <div class="min-w-max label w-1/5">Balance:</div>
          <div class="subtitle2">{{ userBalance }} {{currentNetwork.currency}}</div>
        </div>


        <div class="flex items-center mb-4">
          <div class="min-w-max label w-1/5">Network:</div>
          <div class="subtitle2">{{ currentNetwork.name }}</div>
        </div>

      </div>
    </div>
  </div>

</template>

<script setup>
import {onMounted, ref, reactive} from "vue";
import CommonNetworks from "@/assets/commonNetworks";


// https://docs.ethers.io/v5/single-page/#/v5/getting-started/
import { ethers } from "ethers";
const provider = new ethers.providers.Web3Provider(window.ethereum)

// MetaMask requires requesting permission to connect users accounts
await provider.send("eth_requestAccounts", []);

// The MetaMask plugin also allows signing transactions to
// send ether and pay to change state within the blockchain.
// For this, you need the account signer...
const signer = provider.getSigner()
console.log(signer)

console.log(provider)
// Look up the current block number
const blockNumber = await provider.getBlockNumber()
console.log(blockNumber)

const address = signer.getAddress()
console.log(address)


// Get the balance of an account (by address or ENS name, if supported by network)
const balance = await provider.getBalance(address)
console.log(balance)

// Often you need to format the output to something more user-friendly,
// such as in ether (instead of wei)
const formattedBalance = ethers.utils.formatEther(balance)
// '0.182826475815887608'
console.log(formattedBalance)

// If a user enters a string in an input field, you may need
// to convert it from ether (as a string) to wei (as a BigNumber)
ethers.utils.parseEther("1.0")

signer.getChainId()
signer.getFeeData()
signer.getGasPrice()
// Returns the number of transactions this account has ever sent. This is the value required to be included in transactions as the nonce.
const trnsCount = await signer.getTransactionCount()
console.log(trnsCount)


const userAddress = ref('')
const userBalance = ref('')
const currentNetwork = reactive({
  name: '',
  currency: ''
})
const isLoggedIn = ref(false)

onMounted(() => {
  if (!window.ethereum) {
    alert('MetaMask is not installed')
  }
})


const login = async () => {
  isLoggedIn.value = true
  const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })

  userAddress.value = accounts[0]


  const balance = await window.ethereum.request({ method: 'eth_getBalance', params: [accounts[0], 'pending']})
  const EthBal = balance * Math.pow(10,(-18));

  userBalance.value = EthBal


  const chainId = window.ethereum.networkVersion
  currentNetwork.name = CommonNetworks[chainId].name
  currentNetwork.currency = CommonNetworks[chainId].currency


}


const logout = () => {
  isLoggedIn.value = false

  userBalance.value = ''
  userAddress.value = ''
}

</script>


<style>

.box-section {
  padding: 32px 24px;
  background: #fff;
  box-shadow: 0px 4px 8px rgb(0 0 0 / 4%), 0px 0px 2px rgb(0 0 0 / 6%), 0px 0px 1px rgb(0 0 0 / 4%);
  border-radius: 4px;
}

.subtitle1 {
  color: #222222;
  font-size: 32px;
  font-weight: 600;
  line-height: 32px;
  letter-spacing: 0.15px;
}

.subtitle2 {
  color: #222222;
  font-size: 24px;
  font-weight: 600;
  line-height: 32px;
  letter-spacing: 0.15px;
}

.label {
  color: #767676;
  font-size: 14px;
  font-weight: normal;
  line-height: 26px;
  letter-spacing: 0.25px;
}
</style>