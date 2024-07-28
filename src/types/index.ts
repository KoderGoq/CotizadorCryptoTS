import { z } from 'zod';
import { CurrencySchema, CryptoCurrencyRespondeSchema, PairSchema, CryptoPriceSchema } from '../schema/cryto-schema';


export type Currency = z.infer<typeof CurrencySchema>;
export type CryptoCurrency = z.infer<typeof CryptoCurrencyRespondeSchema>;
export type Pair = z.infer<typeof PairSchema>;
export type CryptoPrice = z.infer<typeof CryptoPriceSchema>;