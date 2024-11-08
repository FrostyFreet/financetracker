
import { Box, CssBaseline } from '@mui/material';
import Header from '../Header.tsx';
import Sidebar from '../Sidebar.tsx';
import Footer from '../Footer.tsx';
import TransactionForm from "../TransactionForm.tsx";
import {inputTypes} from '../TransactionForm.tsx'
import Pie from '../charts/PieChart.tsx';
import { useState } from 'react';

import Line from '../charts/LineChart.tsx';
interface inputTypesProps {
	transactions: inputTypes[];
    onSubmit: (newTransaction: inputTypes) => void
}

export default function DashBoard({onSubmit,transactions}:inputTypesProps){
	const [chartType, setChartType] = useState<string>("pie");
    
    return(
        <>
            <Box sx={{ display: 'flex', height: '100vh' }}>
                <CssBaseline />
                <Sidebar />
                <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <Header />
                    <Box sx={{ flexGrow: 1, p: 3, bgcolor: '#f5f5f5' }}>
                        <TransactionForm onSubmit={onSubmit} setChartType={setChartType} chartType={chartType}/>
                        {chartType === "pie" ? (<Pie transactions={transactions} />) 
                        : chartType === "line" ? (<Line transactions={transactions} />) 
                        : <h1>No Transactions Added</h1>}
                       
                    </Box>
                    <Footer />
                </Box>
            </Box>

        </>
    )
}