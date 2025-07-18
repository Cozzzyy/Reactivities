import './index.css'
import {Container, CssBaseline} from "@mui/material";
import NavBar from "./NavBar.tsx";
import Box from "@mui/material/Box";
import { Outlet } from 'react-router';

function App() {
    return (
        <Box sx={{bgcolor: '#e6e5e5', minHeight: '100vh'}}>
            <CssBaseline/>
            <NavBar />
            <Container maxWidth='xl' sx={{mt: 3}}>
                    <Outlet/>
            </Container>
        </Box>
    )
}

export default App
