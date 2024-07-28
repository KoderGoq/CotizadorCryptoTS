import axios from 'axios';
import { CryptoCurrenciesRespondeSchema, CryptoPriceSchema } from '../schema/cryto-schema';
import { Pair } from '../types';

export async function getCryptos() {
  const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD';
  const { data: { Data } } = await axios(url);

  const result = CryptoCurrenciesRespondeSchema.safeParse(Data)
  if (result.success) {
    return result.data;
  }
}

export async function fetchCurrencyCrytoPrice(pair: Pair) {
  const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${pair.cirptocurrency}&tsyms=${pair.currency}`;
  const { data: { DISPLAY } } = await axios(url);

  const result = CryptoPriceSchema.safeParse(DISPLAY[pair.cirptocurrency][pair.currency]);
  if (result.success) {
    return result.data;

  }

}