import { useState } from 'react';
import {
    Box,
    Button,
    Chip,
    Avatar,
    IconButton,
    Menu,
    MenuItem as MuiMenuItem,
    alpha,
    useTheme
} from '@mui/material';
import {
    AccountCircle,
    Settings,
    Logout,
    MenuOpen,
    Add
} from '@mui/icons-material';
import { NavLink } from 'react-router';
import { useAccount } from '../../lib/hooks/useAccount.ts';

export default function UserMenu() {
    const { currentUser, logoutUser } = useAccount();
    const theme = useTheme();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (e: React.MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget);
    const handleClose = () => setAnchorEl(null);

    const handleLogout = async () => {
        await logoutUser.mutateAsync();
        handleClose();
    };

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {!currentUser ? (
                <>
                    <Button
                        component={NavLink}
                        to='/login'
                        variant="outlined"
                        sx={{
                            borderRadius: 2,
                            px: 3,
                            py: 1,
                            textTransform: 'none',
                            fontWeight: 500
                        }}
                    >
                        Login
                    </Button>
                    <Button
                        component={NavLink}
                        to='/login'
                        variant="contained"
                        sx={{
                            borderRadius: 2,
                            px: 3,
                            py: 1,
                            textTransform: 'none',
                            fontWeight: 500
                        }}
                    >
                        Register
                    </Button>
                </>
            ) : (
                <>
                    <Chip
                        avatar={
                            <Avatar sx={{ bgcolor: 'secondary.main' }}>
                                {currentUser.displayName?.charAt(0).toUpperCase()}
                            </Avatar>
                        }
                        label={`Welcome, ${currentUser.displayName || 'User'}`}
                        sx={{
                            background: `transparent`,
                            borderRadius: 2,
                            py: 2,
                            display: { xs: 'none', sm: 'flex' }
                        }}
                    />
                    <IconButton
                        onClick={handleClick}
                        sx={{
                            bgcolor: alpha(theme.palette.primary.main, 0.1),
                            '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.2) }
                        }}
                    >
                        <MenuOpen />
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        PaperProps={{
                            sx: {
                                borderRadius: 2,
                                mt: 1,
                                minWidth: 220,
                                boxShadow: theme.shadows[8]
                            }
                        }}
                    >
                        <MuiMenuItem
                            component={NavLink}
                            to='/create-activity'
                            onClick={handleClose}
                            sx={{ gap: 2 }}
                        >
                            <Add fontSize="small" />
                            Create Activity
                        </MuiMenuItem>
                        <MuiMenuItem
                            component={NavLink}
                            to='/account'
                            onClick={handleClose}
                            sx={{ gap: 2 }}
                        >
                            <AccountCircle fontSize="small" />
                            Account
                        </MuiMenuItem>
                        <MuiMenuItem
                            component={NavLink}
                            to='/settings'
                            onClick={handleClose}
                            sx={{ gap: 2 }}
                        >
                            <Settings fontSize="small" />
                            Settings
                        </MuiMenuItem>
                        <MuiMenuItem
                            onClick={handleLogout}
                            sx={{ gap: 2, color: 'error.main' }}
                        >
                            <Logout fontSize="small" />
                            Logout
                        </MuiMenuItem>
                    </Menu>
                </>
            )}
        </Box>
    );
}