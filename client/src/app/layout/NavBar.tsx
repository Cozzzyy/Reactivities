import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import {Container, MenuItem, Typography} from "@mui/material";
import Group from '@mui/icons-material/Group';
import MenuItemLink from "../shared/components/MenuItemLink.tsx";
import {NavLink} from "react-router";

export default function NavBar() {
    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static"
                    sx={{backgroundImage: 'linear-gradient(135deg, #182a73 0%, #218aae 69%, #20a7ac 89%)'}}>
                <Container maxWidth="xl">
                    <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
                        <Box>
                            <MenuItem component={NavLink} to='/'>
                                <Group fontSize="large" />
                                <Typography variant='h4' fontWeight='bold'>Reactivities</Typography>

                            </MenuItem>
                        </Box>
                        <Box sx={{display: 'flex', gap: 2}}>
                            <MenuItemLink to='/activities'>
                                Activities
                            </MenuItemLink>
                            <MenuItemLink to='/create-activity'>
                                Create Activity
                            </MenuItemLink>
                        </Box>
                        <MenuItem>
                            User menu
                        </MenuItem>
                    </Toolbar>
                </Container>
            </AppBar>
        </Box>
    )
}