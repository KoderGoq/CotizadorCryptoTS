import { ChangeEvent, FormEvent, useState } from 'react';
import { useCryptoStore } from '../store';
import { currencies } from '../data';
import { Pair } from '../types';
import ErrorMessage from './ErrorMessage';


const CriptoSearchForm = () => {

  const { crytoCurrencies, fetchData } = useCryptoStore();
  const [pair, setPair] = useState<Pair>({
    currency: '',
    cirptocurrency: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setPair({
      ...pair,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (Object.values(pair).includes('')) {
      setError('Todos los campos son obligatorios');
      return;
    }
    setError('');
    fetchData(pair);

  }


  return (
    <form className='form' onSubmit={handleSubmit}>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <div className='field'>
        <label htmlFor="currency">Moneda : </label>
        <select name="currency" value={pair.currency} id="currency" onChange={handleChange}>
          <option value="">== Seleccione == </option>
          {currencies.map(currency => (
            <option key={currency.code} value={currency.code}>{currency.name}</option>
          ))}
        </select>
      </div>

      <div className='field'>
        <label htmlFor="cirptocurrency">Criptomoneda : </label>
        <select name="cirptocurrency" value={pair.cirptocurrency} id="cirptocurrency" onChange={handleChange}>
          <option>== Seleccione == </option>
          {crytoCurrencies.map(cripto => (
            <option
              key={cripto.CoinInfo.FullName}
              value={cripto.CoinInfo.Name}>
              {cripto.CoinInfo.FullName}
            </option>
          ))}
        </select>
      </div>

      <input type="submit" value='Cotizar' />

    </form>
  )
}

export default CriptoSearchForm