import { Group } from "@mui/icons-material";
import {Button, Paper, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import {Link} from "react-router";

export default function HomePage() {
    return (
        <Paper sx={{
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
            gap: 6,
            alignItems: 'center',
            alignContent: 'center',
            justifyContent: 'center',
            height: '100vh',
            backgroundImage: 'linear-gradient(135deg, #182a73 0%, #218aae 69%, #20a7ac 89%)',

        }}>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                alignContent: 'center',
                color: 'white',
                gap:3,
            }}>
                <Group sx={{
                    height:110, width:110
                }}/>
                <Typography variant={'h1'}>
                    Reactivities
                </Typography>
            </Box>
            <Typography variant={'h2'}>
                Welcome to Reactivities
            </Typography>
            <Button component={Link} to={'/activities'} variant={'contained'} size={'large'} sx={{width: 200, fontSize:15, textAlign:'center', borderRadius: 2, color: 'white', backgroundColor: 'primary.main'}}>
                Take me to the activities!
            </Button>
        </Paper>
    );
}