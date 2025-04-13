import React from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Container, 
  Box, 
  useTheme, 
  useMediaQuery, 
  Button,
  IconButton,
  Badge,
  alpha,
  Avatar,
  Divider
} from '@mui/material';
import ScannerIcon from '@mui/icons-material/Scanner';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import MenuIcon from '@mui/icons-material/Menu';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import VerifiedIcon from '@mui/icons-material/Verified';
import HomeIcon from '@mui/icons-material/Home';
import HistoryIcon from '@mui/icons-material/History';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';

const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <AppBar 
      position="sticky" 
      elevation={0}
      sx={{ 
        background: '#fff',
        borderBottom: '1px solid',
        borderColor: theme.palette.divider,
      }}
    >
      <Container maxWidth="lg" disableGutters={isMobile}>
        <Toolbar 
          sx={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            py: 1,
            px: { xs: 2, sm: 2 },
          }}
        >
          {/* Logo and name - Instagram style */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {isMobile && (
              <IconButton 
                edge="start" 
                color="inherit" 
                sx={{ mr: 1, color: theme.palette.text.primary }}
              >
                <MenuIcon />
              </IconButton>
            )}
            
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box 
                sx={{ 
                  width: 32,
                  height: 32,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  borderRadius: '8px',
                  mr: 1.5
                }}
              >
                <LocalHospitalIcon fontSize="small" sx={{ color: '#fff' }} />
              </Box>
              
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 700,
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica',
                  letterSpacing: '-0.5px',
                  display: 'flex',
                  alignItems: 'center',
                  color: theme.palette.text.primary
                }}
              >
                Label<span style={{ fontWeight: 900 }}>AI</span>
                <VerifiedIcon 
                  sx={{ 
                    ml: 0.5, 
                    fontSize: 16, 
                    color: theme.palette.primary.main 
                  }} 
                />
              </Typography>
            </Box>
          </Box>

          {/* Center navigation for desktop - Instagram style */}
          {/* {!isTablet && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <IconButton color="inherit" sx={{ color: theme.palette.text.primary }}>
                <HomeIcon />
              </IconButton>
              <IconButton color="inherit" sx={{ color: theme.palette.text.primary }}>
                <ScannerIcon />
              </IconButton>
              <IconButton color="inherit" sx={{ color: theme.palette.text.primary }}>
                <HistoryIcon />
              </IconButton>
              <IconButton color="inherit" sx={{ color: theme.palette.text.primary }}>
                <HealthAndSafetyIcon />
              </IconButton>
            </Box>
          )} */}
          
          {/* Right actions - Instagram style */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton 
              size="small"
              sx={{ color: theme.palette.text.primary }}
            >
              <SearchIcon sx={{ fontSize: 24 }} />
            </IconButton>
            
            {/* <IconButton 
              size="small"
              sx={{ ml: { xs: 1, sm: 1.5 }, color: theme.palette.text.primary }}
            >
              <Badge badgeContent={2} color="error" variant="dot">
                <NotificationsNoneIcon sx={{ fontSize: 24 }} />
              </Badge>
            </IconButton> */}
            
            <Box 
              sx={{ 
                ml: { xs: 1, sm: 1.5 },
                width: 30,
                height: 30,
                borderRadius: '50%',
                overflow: 'hidden',
                border: `1px solid ${theme.palette.divider}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Avatar sx={{ width: 30, height: 30 }}>
                <PersonOutlineIcon fontSize="small" />
              </Avatar>
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header; 