import { reactive } from 'vue'
import {ethers} from "ethers";

export function useBalance(address, provider) {
    const balance = reactive({
        value: null,
        symbol: null,
        decimals: null
    })


    const getBalance = async () => {
        balance.value  = await provider.getBalance(address)

        balance.value = ethers.utils.formatEther(balance.value)
        return balance
    }

    getBalance()

    return { getBalance, provider, balance }
}

