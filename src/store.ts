import { devtools } from 'zustand/middleware';
import { create } from 'zustand';
import { CryptoCurrency, CryptoPrice, Pair } from './types';
import { getCryptos, fetchCurrencyCrytoPrice } from './services/CryptoService';

type cryptoStore = {
  crytoCurrencies: CryptoCurrency[],
  result: CryptoPrice,
  loading: boolean,
  fetchCryptos: () => Promise<void>,
  fetchData: (pair: Pair) => Promise<void>,
}

export const useCryptoStore = create<cryptoStore>()(devtools((set) => ({
  crytoCurrencies: [],
  result: {
    IMAGEURL: '',
    PRICE: '',
    HIGHDAY: '',
    LOWDAY: '',
    CHANGEPCT24HOUR: '',
    LASTUPDATE: ''
  },
  loading: false,
  fetchCryptos: async () => {
    const crytoCurrencies = await getCryptos();
    set(() => ({
      crytoCurrencies
    }))
  },
  fetchData: async (pair) => {
    set(() => ({
      loading: true
    }))

    const result = await fetchCurrencyCrytoPrice(pair);

    set(() => ({
      result,
      loading: false
    }))
  }
})));