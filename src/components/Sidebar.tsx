import { Drawer, List, ListItemText, ListItemIcon, Box} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { Link } from 'react-router-dom';


export default function Sidebar() {
    return (
        <Drawer
            variant="permanent"
            sx={{
                width: 200,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: 200,
                    boxSizing: 'border-box',
                    bgcolor: '#343a40',
                    color: '#fff',
                },
            }}
        >
            <List>
                <Link to="/" style={{textDecoration:"none", color:"white"}}>
                <Box component="li" sx={{ display: 'flex', alignItems: 'center', padding: '8px 16px', cursor: 'pointer', '&:hover': { backgroundColor: '#555' } }}>
                    <ListItemIcon sx={{ color: '#fff' }}>
                        <DashboardIcon />
                    </ListItemIcon>
                    <ListItemText primary="Overview" />
                </Box>
                </Link>
                <Link to="/transactions" style={{textDecoration:"none", color:"white"}}>
                    <Box component="li" sx={{ display: 'flex', alignItems: 'center', padding: '8px 16px', cursor: 'pointer', '&:hover': { backgroundColor: '#555' } }} >
                        <ListItemIcon sx={{ color: '#fff' }}>
                            <ListAltIcon />
                        </ListItemIcon>
                        <ListItemText primary="Transactions" />
                    </Box>
                </Link>
               
            </List>
        </Drawer>
    );
}
