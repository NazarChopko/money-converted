import { FC,useState,useEffect } from "react";
import Image from 'next/image'
import axios from "axios";
import CurrencyRow from "../Components/CurrencyRow"
import arrow from '../public/arrow.png'
import { ICurrencyData } from "../types/types";

const BASIC_URL:string = `https://api.frankfurter.app/latest`;

const Converted:FC = () => {

    const [currency,setCurrency] = useState<string[]>([])
    const [fromCurrency,setFromCurrency] = useState<string>('')
    const [toCurrency,setToCurrency] = useState<any>(null)
    const [exchangeRate,setExchangeRate] = useState<number>(1)
    const [amount,setAmount] = useState<number>(1)
    const [amountInFromCurrency,setAmountInFromCurrency] = useState<boolean>(true)


    let toAmount:number | string,fromAmount:number | string
    if(amountInFromCurrency){
        fromAmount = amount
        toAmount = Number(amount * exchangeRate).toFixed(2)
    }else{
        toAmount = amount
        fromAmount = Number(amount/exchangeRate).toFixed(2)
    }
    

    useEffect(()=> {
        try{
            axios.get<ICurrencyData>(BASIC_URL).then(({data}) => { 
                const firstCurrency = Object.keys(data.rates)[0]
                setCurrency([data.base,...Object.keys(data.rates)]);
                setFromCurrency(data.base);
                setToCurrency(firstCurrency);
                setExchangeRate(data.rates[firstCurrency])
        })
        }catch(error){
                console.error(error)
    }},[])

    useEffect(()=>{
        if(fromCurrency !== null && toCurrency !== null){
           try{
            axios.get<ICurrencyData>(`${BASIC_URL}?from=${fromCurrency}&to=${toCurrency}`)
                .then(({data})=>setExchangeRate(data.rates[toCurrency]))
           }catch(e){
               console.error(e)
           } 
        }
    },
    [fromCurrency,toCurrency])

    const handleFromAmountChange = (e) =>{
        setAmount(e.target.value)
        setAmountInFromCurrency(true)
    }
    
    const handleToAmountChange = (e) => {
        setAmount(e.target.value)
        setAmountInFromCurrency(false)
    }

    const validate = (event) => {
        var theEvent = event || window.event;
        var key = theEvent.keyCode || theEvent.which;
        key = String.fromCharCode( key );
        var regex = /[0-9]|\./;
        if( !regex.test(key) ) {
          theEvent.returnValue = false;
          if(theEvent.preventDefault) theEvent.preventDefault();
        }
      }
    
    return (
        <>
        <div className='converted-container'>
            <h1>Конвертировать валюту</h1>
        <div className='converted-container_currency'>
            <CurrencyRow 
                currency={currency}
                selectedCurrency={fromCurrency}
                onChangeCurrency={(e)=>setFromCurrency(e.target.value)}
                onChangeAmount={handleFromAmountChange}
                amount={fromAmount}
                validate={validate}
            />
            <div className='converted-image'><Image  width={60} height={45} src={arrow} alt='arrow'/></div>
            <CurrencyRow
                currency={currency}
                selectedCurrency={toCurrency}
                onChangeCurrency={(e)=>setToCurrency(e.target.value)}
                onChangeAmount={handleToAmountChange}
                amount={toAmount}
                validate={validate}
            />
        </div>
        </div>
        </>
    )
}

export default Converted