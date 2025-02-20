import axios from "axios";
import { ChangeEvent, FormEvent, KeyboardEvent, useEffect, useState } from "react";

interface IToken {
    currency: string;
    date: string;
    price: number
}

function SwapForm() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [tokens, setTokens] = useState<IToken[] | null>(null);
    const [currencyFrom, setCurrencyFrom] = useState<IToken | null>(null);
    const [currencyTo, setCurrencyTo] = useState<IToken | null>(null);
    const [amount, setAmount] = useState<number>(0)
    const [error, setError] = useState<string>("")
    const [swapResult, setSwapResult] = useState<number>(-1)

    const getTokens = async () => {
        try {
            setIsLoading(true)
            const result = await axios.get("https://interview.switcheo.com/prices.json")
            setTokens(result.data)
            setCurrencyFrom(result.data[0])
            setCurrencyTo(result.data[0])
        } catch (error) {
            console.log(error);
        }
        setIsLoading(false)
    }

    const handleSelecToken = (e: ChangeEvent<HTMLSelectElement>, setCurrency: (token: IToken) => void) => {
        const token = tokens?.find((item) => item.currency === e.target.value)
        if (token) setCurrency(token);
    }

    const swapCurrency = () => {
        if (currencyFrom && currencyTo ) {
            if(!amount){
                setError("Please Enter Amount!")
                setSwapResult(-1);
                return
            }
            setError("")
            const result = amount * (currencyFrom.price / currencyTo.price)
            setSwapResult(result)
        }
    }

    const handleKeyPressInputNumber = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === '+' || e.key === '-' || e.key === 'e') {
            e.preventDefault();
        }
    }

    const handleAmount = (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setAmount(parseInt(newValue));
    }

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        swapCurrency();
    }

    useEffect(() => {
        getTokens()
    }, [])
    return (
        <>
            {isLoading ? <div className="text-2xl">Loading ...</div> :
                <form className="w-full flex flex-col gap-4" onSubmit={onSubmit}>
                    <h1 className="font-bold text-center">Swap Currency</h1>
                    <div className='flex flex-col gap-3'>
                        <span>Currency</span>
                        <div className="flex gap-4">
                            <div className="flex items-center gap-2">
                                <label>From</label>
                                <select className='rounded border-2 border-blue-300 p-1' onChange={(e) => handleSelecToken(e, setCurrencyFrom)}>
                                    {tokens && tokens.map((token, index) => {
                                        return (
                                            <option key={index} value={token.currency}>{token.currency}</option>
                                        )
                                    })}
                                </select>
                            </div>

                            <div className="flex items-center gap-2">
                                <label>To</label>
                                <select className='rounded border-2 border-blue-300 p-1' onChange={(e) => handleSelecToken(e, setCurrencyTo)}>
                                    {tokens && tokens.map((token, index) => {
                                        return (
                                            <option key={index} value={token.currency}>{token.currency}</option>
                                        )
                                    })}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className='flex flex-col gap-1'>
                        <label>Amount to change</label>
                        <input type="number" min={0} value={amount} onChange={handleAmount} onKeyDown={handleKeyPressInputNumber} className='rounded border-2 border-blue-300 p-1' />
                    </div>

                    <button className="text-white bg-blue-400 rounded-2xl p-2">CONFIRM SWAP</button>
                    {error && <span className="text-red-600">{error}</span>}
                    {swapResult > 0 && <span>Result: {swapResult}</span>}
                </form>}
        </>
    );
}

export default SwapForm;