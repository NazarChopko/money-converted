import React, { ChangeEvent, FC, KeyboardEventHandler} from 'react'

interface ICurrencyRowProps{
    currency:string[]
    selectedCurrency:string  
    onChangeCurrency:(e:ChangeEvent<HTMLSelectElement>)=>void
    onChangeAmount:(e:ChangeEvent<HTMLInputElement>)=>void
    amount:number | string
    validate:(e:any)=>void
}

const CurrencyRow:FC<ICurrencyRowProps> = ({currency,selectedCurrency,onChangeCurrency,amount,onChangeAmount,validate}) => {

    
    
    return (
       <>
       <div className='convertion_container-row'>
                    <input onKeyPress={validate} type="text" value={amount} onChange={onChangeAmount} />
                    <select value={selectedCurrency} onChange={onChangeCurrency}>
                        {currency.map((el)=> <option key={el} value={el}>{el}</option>)}
                    </select>
         </div>
       </>
    )
}

export default CurrencyRow
