import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import {Container, LinearProgress, MenuItem, Typography} from "@mui/material";
import Group from '@mui/icons-material/Group';
import MenuItemLink from "../shared/components/MenuItemLink.tsx";
import {NavLink} from "react-router";
import {useStore} from "../../lib/hooks/useStore.ts";
import {Observer} from "mobx-react-lite";

export default function NavBar() {

    const {uiStore} = useStore();

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static"
                    sx={{bgcolor:'bg.default', color:'text.primary', boxShadow: 'none',
                    position:'relative'}}>
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
                            <MenuItemLink to='/counter'>
                                Counter
                            </MenuItemLink>
                        </Box>
                        <MenuItem>
                            User menu
                        </MenuItem>
                    </Toolbar>
                </Container>
                <Observer>
                    {() => uiStore.isLoading ? (
                        <LinearProgress
                            color={'secondary'}
                            sx={{
                                position: 'absolute',
                                left: 0,
                                right: 0,
                                bottom: 0,
                            }}
                        />
                    ) : null}
                </Observer>
            </AppBar>
        </Box>
    )
}