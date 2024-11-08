import { Box, Typography } from '@mui/material';

export default function Footer(){
    return (
        <>
            <Box
                component="footer"
                sx={{
                    py: 2,
                    px: 3,
                    mt: 'auto',
                    bgcolor: '#343a40',
                    color: '#fff',
                    textAlign: 'center',
                }}
            >
                <Typography variant="body2">© 2024 Finance Tracker - All Rights Reserved</Typography>
            </Box>
        </>
    );
}