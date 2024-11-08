import { Box, CssBaseline } from "@mui/material";
import Footer from "../Footer";
import Header from "../Header";
import Sidebar from "../Sidebar";


export default function DashBoard(){
    return(
        <>
                <Box sx={{ display: 'flex', height: '100vh' }}>
                <CssBaseline />
                <Sidebar />
                <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <Header />
                    <Box sx={{ flexGrow: 1, p: 3, bgcolor: '#f5f5f5' }}>
                    
                    
                    </Box>
                    <Footer />
                </Box>
            </Box>
    </>
    )
}