import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
//import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import { Link as MuiLink } from '@mui/material';
import { User } from '../types';
//import AdbIcon from '@mui/icons-material/Adb';
//todo check about this appbar stuff if materialui should be used or just react-bootstrap?
const pages = ['Posts', 'Users'];
const settings = ['Profile', 'Account', 'Logout'];

interface Props {
  user: User | null
  onLogout: () => void
}

const ResponsiveAppBar = ({ user, onLogout }: Props) => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logoutButton = () => <Button onClick={onLogout}>logout</Button>;

  const handleSettingClick = (setting: string) => {
    handleCloseUserMenu(); // Close the user menu
    if (setting === 'Logout') {
      onLogout(); // Call onLogout if Logout setting is clicked
    } else {
      // Handle other settings here
    }
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
        {['flex','none'].map((displayValue,index)=> (
          <Typography
          key={index}
          variant="h6"
          noWrap
          sx={{
            mr: 2,
            display: { xs: displayValue, md: index === 0 ? 'none' : 'flex' },
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: 'inherit',
            textDecoration: 'none',
          }}
        >
          <Link style={{ textDecoration: "none", color: "white" }}
            to="/">
            wiki
          </Link>
        </Typography>      
          ))}
          {['flex', 'none'].map((displayValue, index) => (
            <Box key={index} sx={{ flexGrow: 1, display: { xs: displayValue, md: index === 0 ? 'none' : 'flex' } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  <Link style={{ textDecoration: "none", color: "white" }} to={`/${page}`}>
                    {page}
                  </Link>
                </Button>
              ))}
            </Box>
          ))}

          {user ? (//do we need this type of settings?? 
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Gosh" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={() => handleSettingClick(setting)}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          ) : (
            
            ['flex', 'none'].map((displayValue, index) => (
            <Typography
            key={index}
          variant="h6"
          noWrap
          sx={{
            mr: 2,
            display: { xs: displayValue, md: index === 0 ? 'none' : 'flex' },
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: 'inherit',
            textDecoration: 'none',
          }}
        >
                  <Link style={{ textDecoration: "none", color: "white" }} to={"/login"}>
              login
            </Link>
            </Typography>
            )))}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
