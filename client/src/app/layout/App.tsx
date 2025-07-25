import './index.css'
import {Container, CssBaseline} from "@mui/material";
import NavBar from "./NavBar.tsx";
import Box from "@mui/material/Box";
import {Outlet, useLocation} from 'react-router';
import HomePage from "../../features/home/HomePage.tsx";

function App() {
    const location = useLocation();


    return (
        <Box sx={{bgcolor: '#e6e5e5', minHeight: '100vh'}}>
            <CssBaseline/>
            {location.pathname === '/' ? <HomePage/> : (
                <>
                    <NavBar />
                    <Container maxWidth={'xl'} sx={{mt: 3}}>
                        <Outlet/>
                    </Container>
                </>
            )}
        </Box>
    )
}

export default App
