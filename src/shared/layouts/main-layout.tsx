import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import {Box, IconButton, Stack, Typography} from "@mui/material";
import {ArrowBack} from "@mui/icons-material";

type Props = {
    children: React.ReactNode
}

function MainLayout({ children }: Props) {
    return (
        <Box>
            <AppBar position="static">
                <Container maxWidth="xl" disableGutters>
                    <Toolbar disableGutters >
                        <Stack spacing={1} direction={"row"} alignItems={"center"}>
                        <IconButton>
                            <ArrowBack sx={{
                                color: "white"
                            }}/>
                        </IconButton>
                        <Typography>
                            Створення персони
                        </Typography>
                        </Stack>
                    </Toolbar>
                </Container>
            </AppBar>
            {children}
        </Box>

    );
}
export { MainLayout };
