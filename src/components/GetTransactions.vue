<template>
  <div class="box-section">
    <div class="subtitle1 mb-8">getTransactions</div>

    <div class="pl-8">
      <div class="flex items-center mb-4">
        <div
            class="
            min-w-max
            after:content-['*'] after:ml-0.5 after:text-red-500
            label
            w-1/5
          "
        >
          Chain
        </div>
        <div class="w-full">
          <b-form-select
              class="
              px-2
              py-2
              w-full
              bg-white
              border
              shadow-sm
              border-gray-300
              placeholder-gray-400
              rounded-md
            "
              v-model="chain"
              :options="optionsChain"
          />
        </div>
      </div>

      <div class="flex items-center mb-4">
        <div
            class="
            min-w-max
            after:content-['*'] after:ml-0.5 after:text-red-500
            label
            w-1/5
          "
        >
          Address
        </div>
        <b-form-input v-model="address" placeholder="Enter your address" />
      </div>

      <div class="flex items-center mb-4">
        <div
            class="
            min-w-max
            after:content-['*'] after:ml-0.5 after:text-red-500
            label
            w-1/5
          "
        >
          From date
        </div>
        <b-form-input v-model="from_date" type="date" />
      </div>

      <div class="flex items-center mb-4">
        <div
            class="
            min-w-max
            after:content-['*'] after:ml-0.5 after:text-red-500
            label
            w-1/5
          "
        >
          To date
        </div>
        <b-form-input v-model="to_date" type="date" />
      </div>

      <div class="flex items-center mb-4">
        <div
            class="
            min-w-max
            after:content-['*'] after:ml-0.5 after:text-red-500
            label
            w-1/5
          "
        >
          From block
        </div>
        <b-form-input
            v-model="from_block"
            placeholder="Enter your from block"
        />
      </div>

      <div class="flex items-center mb-4">
        <div
            class="
            min-w-max
            after:content-['*'] after:ml-0.5 after:text-red-500
            label
            w-1/5
          "
        >
          To block
        </div>
        <b-form-input v-model="to_block" placeholder="Enter your to block" />
      </div>

      <div class="flex items-center mb-4">
        <div
            class="
            min-w-max
            after:content-['*'] after:ml-0.5 after:text-red-500
            label
            w-1/5
          "
        >
          Limit
        </div>
        <b-form-input v-model="limit" placeholder="Enter your limit" />
      </div>

      <div class="flex justify-end mt-8">
        <b-button variant="light" @click="handleCancel" class="w-32"
        >Cancel</b-button
        >
        <b-button variant="primary" class="w-32" @click="handleTransaction">
          Submit
        </b-button>
      </div>
    </div>

    <div class="mt-16 max-h-96 overflow-auto" v-if="data">
      <b-table striped hover :items="data"></b-table>
    </div>
  </div>
</template>

<script setup>
import {computed, ref} from "vue";

const chain = ref("bsc testnet")
const address = ref()
const from_date = ref()
const to_date = ref()
const from_block = ref()
const to_block = ref()
const limit = ref()
const data = ref()

// const optionalChain = computed(() => {})
const handleCancel = () => {
  this.chain = "bsc testnet";
  this.address = null;
  this.from_date = null;
  this.to_date = null;
  this.from_block = null;
  this.to_block = null;
  this.limit = null;
  this.data = null;
}

// const handleTransaction = async () => {
//   try {
//     // get BSC transactions for a given address
//     // with most recent transactions appearing first
//     const options = {
//       chain: this.chain,
//       address: this.address,
//       from_date: this.from_date,
//       to_date: this.to_date,
//       from_block: this.from_block,
//       to_block: this.to_block,
//       limit: this.limit,
//     };
//     const transactions = await window.ethereum.request({ method: '', params}) (
//         options
//     );
//
//     this.data = transactions.result.map((transaction) => ({
//       "Txn Hash": transaction.hash,
//       Block: transaction.block_number,
//       From: transaction.from_address,
//       To: transaction.to_address,
//       Value: transaction.value,
//       Gas: transaction.gas,
//       "Gas Price": transaction.gas_price,
//     }));
//   } catch (error) {
//     alert(error.error);
//   }
// }
</script>

<style scoped lang="scss"></style>
