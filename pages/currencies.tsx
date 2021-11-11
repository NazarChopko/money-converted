import React,{ ChangeEvent, FC, useEffect,useState} from 'react'
import Image from 'next/image'
import axios from 'axios'
import eur from '../public/eur.png'
import usd from '../public/usd.png'
import gbp from '../public/gbp.png'
import cny from '../public/cny.png'
import chf from '../public/chf.png'
import { ICurrencyData } from '../types/types'



const Currencies:FC = () => {

    const [currencyOptions,setCurrencyOptions] = useState<string[]>([])
    const [fromCurrency,setFromCurrency] = useState<string>('RUB')
    const [currencyTo,setCurrencyTo] = useState<ICurrencyData[]>([])
    
    

    const BASIC_URL:string = `https://api.frankfurter.app/latest`

    const getCurrerciesMoney = async (url:string) => {
        try{
             const {data} = await axios.get<ICurrencyData>(`${url}?from=${fromCurrency}`)
             setCurrencyOptions([data.base,...Object.keys(data.rates)])
             const getToCurrencyUSD = fromCurrency === 'USD' ? {data:1}  : await axios.get(`${url}?from=USD&to=${fromCurrency}&amount=1`)
             const getToCurrencyEUR = fromCurrency === 'EUR' ? {data:1}  : await axios.get(`${url}?from=EUR&to=${fromCurrency}&amount=1`)
             const getToCurrencyGBP = fromCurrency === 'GBP' ? {data:1}  : await axios.get(`${url}?from=GBP&to=${fromCurrency}&amount=1`)
             const getToCurrencyCHF = fromCurrency === 'CHF' ? {data:1}  : await axios.get(`${url}?from=CHF&to=${fromCurrency}&amount=1`)
             const getToCurrencyCNY = fromCurrency === 'CNY' ? {data:1}  : await axios.get(`${url}?from=CNY&to=${fromCurrency}&amount=1`)
             setCurrencyTo([getToCurrencyUSD.data,getToCurrencyEUR.data,getToCurrencyGBP.data,getToCurrencyCHF.data,getToCurrencyCNY.data])
            }
        catch(e){
             console.log(e)
            }
 }

    useEffect(()=>{
        getCurrerciesMoney(BASIC_URL)
    },
    [fromCurrency])

    

    const changeFromCurrency = (e:ChangeEvent<HTMLSelectElement>)=>{
        setFromCurrency(e.target.value)
        }



    return (
        <>
        <div className='currencies'>
            <div className='currencies_title'><h1>Текущий курс валют</h1></div>
            <div className='currencies_container'>
                <div className='currencies_container-row'>
                    <input disabled type="text" value={1} />
                    <select value={fromCurrency} onChange={changeFromCurrency}>
                        {currencyOptions.map((option,i)=> <option value={option} key={i}>{option}</option>)}
                    </select>
                </div>
                <div className='currencies_container-equls'><span>=</span></div>
                <div className='currencies_container-list'>
                    <ul>
                        {currencyTo.map((el,i) => {
                            switch(el.base){
                                case 'USD': 
                                 return <li key={i}><Image src={usd} width={100} height={80} alt="usd" placeholder='blur'/> <span>USA</span> {Number(el.rates[fromCurrency]).toFixed(2)}</li>
                                case 'EUR':
                                 return <li key={i}><Image src={eur} width={100} height={80} alt="eur" placeholder='blur'/> <span>EUR</span> {Number(el.rates[fromCurrency]).toFixed(2)}</li>   
                                case 'GBP':
                                 return <li key={i}><Image src={gbp} width={100} height={80} alt="gbp" placeholder='blur'/> <span>GBP</span> {Number(el.rates[fromCurrency]).toFixed(2)}</li>  
                                case 'CHF':
                                 return <li key={i}><Image src={chf} width={100} height={80} alt="chf" placeholder='blur'/> <span>CHF</span> {Number(el.rates[fromCurrency]).toFixed(2)}</li>
                                case 'CNY':
                                 return <li key={i}><Image src={cny} width={105} height={80} alt="cny" placeholder='blur'/> <span>CNY {Number(el.rates[fromCurrency]).toFixed(2)}</span></li>
                            }})}
                    </ul>
                </div>
            </div>
        </div>
        </>
    )
}

export default Currencies