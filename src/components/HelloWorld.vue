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
import { ethers } from "ethers";
import {useBalance} from "@/composables/useBalance";
// import {useConnect} from "@/composables/useConnect";

const userAddress = ref('')
const userBalance = ref('')
const currentNetwork = reactive({
  name: '',
  currency: ''
})
const isLoggedIn = ref(false)

const provider = new ethers.providers.Web3Provider(window.ethereum)
const signer = provider.getSigner()

provider.on("network", (newNetwork, oldNetwork) => {
  // When a Provider makes its initial connection, it emits a "network"
  // event with a null oldNetwork along with the newNetwork. So, if the
  // oldNetwork exists, it represents a changing network
  console.log(newNetwork, oldNetwork)
  if (oldNetwork) {
    window.location.reload();
  }
});

onMounted(() => {
  if (!window.ethereum) {
    alert('MetaMask is not installed')
  }
})


const login = async () => {
  isLoggedIn.value = true

  // const accounts = await provider.send("eth_requestAccounts", []);
  const address = await signer.getAddress()
  userAddress.value = address


  const { getBalance } = useBalance(address, provider)
  userBalance.value  =  (await getBalance()).value
  // const balance = await provider.getBalance(address)
  // userBalance.value = ethers.utils.formatEther(balance)

  // const chainId = window.ethereum.networkVersion
  const chainIdd = await signer.getChainId()

  currentNetwork.name = CommonNetworks[chainIdd].name
  currentNetwork.currency = CommonNetworks[chainIdd].currency



  // Look up the current block number
  // const blockNumber = await provider.getBlockNumber()
  // console.log('current block number', blockNumber)


  // const feeData = await signer.getFeeData()
  // const gasPrice = await signer.getGasPrice()

  // Returns the number of transactions this account has ever sent.
  // const trnsCount = await signer.getTransactionCount()
  // console.log(trnsCount)


  // const {account, chainId, data, connect, switchChain}  = useConnect()
  // console.log(account, chainId, data, connect, switchChain)
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
