
import { Box, CssBaseline } from '@mui/material';
import Header from '../Header.tsx';
import Sidebar from '../Sidebar.tsx';
import Footer from '../Footer.tsx';
import TransactionForm from "../TransactionForm.tsx";
import {inputTypes} from '../TransactionForm.tsx'


export default function DashBoard({onSubmit}:{ onSubmit: (newTransaction: inputTypes) => void }){

    return(
        <>
            <Box sx={{ display: 'flex', height: '100vh' }}>
                <CssBaseline />
                <Sidebar />
                <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <Header />
                    <Box sx={{ flexGrow: 1, p: 3, bgcolor: '#f5f5f5' }}>
                        <TransactionForm onSubmit={onSubmit}/>
                    </Box>
                    <Footer />
                </Box>
            </Box>

        </>
    )
}