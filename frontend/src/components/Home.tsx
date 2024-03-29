import { useState } from 'react';

import { User } from '../types';
import ResponsiveAppBar from './ResponsiveAppBar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
interface Props {
    user: User
}
const Home = ({user} : Props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const  defaultTheme = createTheme()

 return(
  <ThemeProvider theme={defaultTheme}>
    <Container component="main" maxWidth="xl">
    <CssBaseline />
    <Box
        sx={{
          marginTop: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'left',
        }}
      >
    <Typography component="h1" variant="h4">
          welcome to the wiki
        </Typography>
    </Box>
    </Container>
    </ThemeProvider>
 );


};
export default Home;
