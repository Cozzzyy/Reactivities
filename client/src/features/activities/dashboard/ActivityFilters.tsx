import Box from "@mui/material/Box";
import {ListItemText, MenuItem, MenuList, Paper, Typography} from "@mui/material";
import { FilterList, Event } from "@mui/icons-material";
import 'react-calendar/dist/Calendar.css';
import '../../../app/layout/styles.css'
import Calendar from "react-calendar";

export default function ActivityFilters() {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
            borderRadius: 4,
            mx: 'auto',
        }}>
            <Paper elevation={3} sx={{
                p: 3,
                borderRadius: 4,
                boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
                bgcolor: 'background.paper',
            }}>
                <Box sx={{width: '100%'}}>
                    <Typography variant='h6' sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        mb: 2,
                        fontWeight: 700,
                        color: 'primary.main',
                    }}>
                        <FilterList />
                        Filters
                    </Typography>
                    <MenuList>
                        <MenuItem sx={{
                            borderRadius: 2,
                            transition: 'background 0.2s',
                            '&:hover': { bgcolor: 'primary.light', color: 'primary.contrastText' }
                        }}>
                            <ListItemText primary={'All events'} />
                        </MenuItem>
                        <MenuItem sx={{
                            borderRadius: 2,
                            transition: 'background 0.2s',
                            '&:hover': { bgcolor: 'primary.light', color: 'primary.contrastText' }
                        }}>
                            <ListItemText primary={"I'm going"} />
                        </MenuItem>
                        <MenuItem sx={{
                            borderRadius: 2,
                            transition: 'background 0.2s',
                            '&:hover': { bgcolor: 'primary.light', color: 'primary.contrastText' }
                        }}>
                            <ListItemText primary={"I'm hosting"} />
                        </MenuItem>
                    </MenuList>
                </Box>
            </Paper>
            <Box component={Paper} elevation={3} sx={{
                width: '100%',
                p: 3,
                borderRadius: 4,
                bgcolor: '#f8fafc',
                boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
            }}>
                <Typography variant={'h6'} sx={{
                    display: 'flex',
                    mb: 2,
                    alignItems: 'center',
                    fontWeight: 700,
                    color: 'primary.main',
                }}>
                    <Event sx={{mr: 1}} />
                    Select a date
                </Typography>
                <Box sx={{
                    '.react-calendar': {
                        border: 'none',
                        borderRadius: 3,
                        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                        p: 1,
                        bgcolor: 'background.paper',
                    },
                    '.react-calendar__tile--active': {
                        bgcolor: 'primary.main',
                        color: 'white',
                    },
                    '.react-calendar__tile': {
                        borderRadius: 2,
                        transition: 'background 0.2s',
                        '&:hover': { bgcolor: 'primary.light', color: 'primary.contrastText' }
                    }
                }}>
                    <Calendar />
                </Box>
            </Box>
        </Box>
    );
}