import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import {
    Container,
    LinearProgress,
    Typography,
    Button,
    Avatar,
    useTheme,
    alpha
} from "@mui/material";
import { Group } from '@mui/icons-material';
import { NavLink } from "react-router";
import { useStore } from "../../lib/hooks/useStore.ts";
import { Observer } from "mobx-react-lite";
import UserMenu from "../../features/account/UserMenu.tsx";

export default function NavBar() {
    const { uiStore } = useStore();
    const theme = useTheme();

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar
                position="static"
                elevation={0}
                sx={{
                    bgcolor: 'background.paper',
                    borderBottom: `1px solid ${alpha(theme.palette.divider, 0.12)}`,
                    backdropFilter: 'blur(8px)',
                }}
            >
                <Container maxWidth="xl">
                    <Toolbar sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        minHeight: '64px !important',
                        py: 1
                    }}>
                        <Box
                            component={NavLink}
                            to='/'
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                                textDecoration: 'none',
                                color: 'inherit',
                                '&:hover': { opacity: 0.8 }
                            }}
                        >
                            <Avatar sx={{ bgcolor: 'primary.main', width: 40, height: 40 }}>
                                <Group />
                            </Avatar>
                            <Typography
                                variant='h5'
                                fontWeight='700'
                                sx={{
                                    background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                                    backgroundClip: 'text',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                }}
                            >
                                Reactivities
                            </Typography>
                        </Box>

                        <Box sx={{
                            display: { xs: 'none', md: 'flex' },
                            gap: 1,
                            alignItems: 'center'
                        }}>
                            <Button
                                component={NavLink}
                                to='/activities'
                                sx={{
                                    borderRadius: 2,
                                    px: 2,
                                    py: 1,
                                    textTransform: 'none',
                                    fontWeight: 500,
                                    '&.active': {
                                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                                        color: 'primary.main'
                                    }
                                }}
                            >
                                Activities
                            </Button>
                            <Button
                                component={NavLink}
                                to='/counter'
                                sx={{
                                    borderRadius: 2,
                                    px: 2,
                                    py: 1,
                                    textTransform: 'none',
                                    fontWeight: 500,
                                    '&.active': {
                                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                                        color: 'primary.main'
                                    }
                                }}
                            >
                                Counter
                            </Button>
                        </Box>

                        <UserMenu />
                    </Toolbar>
                </Container>

                <Observer>
                    {() => uiStore.isLoading ? (
                        <LinearProgress
                            color='primary'
                            sx={{
                                position: 'absolute',
                                left: 0,
                                right: 0,
                                bottom: 0,
                                height: 2
                            }}
                        />
                    ) : null}
                </Observer>
            </AppBar>
        </Box>
    );
}