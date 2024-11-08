import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import  {useState} from "react";
import {Button, FormGroup, Input} from "@mui/material";
import { v4 as uuidv4 } from 'uuid';
export interface inputTypes{
    id:string;
    amount: number;
    category: string;
    description: string;
    type?:string;
    date:string;
}
export default function TransactionForm({onSubmit}:{ onSubmit: (newTransaction: inputTypes) => void }){

    const [transactionType, setTransactionType] = useState("expense");
    const [inputValue, setInputValue] = useState<inputTypes>({
        id:uuidv4(),
        amount: 0,
        category: "",
        description: "",
        date:new Date().toISOString().split('T')[0]
    });


    function handleTransactionTypeChange(e:SelectChangeEvent){
        setTransactionType(e.target.value);
    }
    function handleChange(e:React.ChangeEvent<HTMLInputElement>) {
        setInputValue((prevState)=>({
            ...prevState,
            [e.target.name]: e.target.value
        }))

    }

    function addTransaction(e:React.FormEvent){
        e.preventDefault();
        if (inputValue.amount > 0) {
          // Pass the new transaction to the parent
          onSubmit({
            ...inputValue,
            type: transactionType,
          });
          setInputValue({
            id:uuidv4(),
            amount: 0,
            category: "",
            description: "",
            date: new Date().toISOString().split('T')[0],
          });
        }
    }
    

    return(
            <form onSubmit={addTransaction}>
                <Box sx={{ minWidth: 120 }}>
                    <FormControl sx={{ m: 1, minWidth: 120 }} size="medium">
                        <InputLabel id="demo-simple-select-label">Transaction Type</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={transactionType}
                            label="Transaction Type"
                            onChange={handleTransactionTypeChange}
                        >
                            <MenuItem value={"expense"}>Expense</MenuItem>
                            <MenuItem value={"income"}>Income</MenuItem>
                            
                        </Select>

                    </FormControl>
                    <FormGroup>
                        <Input placeholder="Amount" type="number" name="amount" value={inputValue.amount} onChange={handleChange} required/>
                        <Input placeholder="Category" type="text" name="category" value={inputValue.category} onChange={handleChange} required/>
                        <Input placeholder="Description" type="text" name="description" value={inputValue.description} onChange={handleChange}/>
                        <Input placeholder="Date" type="date" name="date" value={inputValue.date} onChange={handleChange}/>
                        <Button type={"submit"} variant="contained" size={"medium"}>Submit</Button>
                    </FormGroup>

                </Box>
            </form>
        
    )

}