import { createTheme } from '@mui/material/styles';
import { alpha } from '@mui/material/styles';

// Create a theme that mimics Instagram's clean aesthetic with medical professionalism
const theme = createTheme({
  palette: {
    // Instagram-inspired gradient colors with a medical twist
    primary: {
      main: '#5851DB', // Instagram purple
      light: '#8a3ab9', // Instagram gradient purple
      dark: '#4a3acf',
      contrastText: '#FFFFFF'
    },
    secondary: {
      main: '#E1306C', // Instagram pink/red
      light: '#F56040', // Instagram orange/red
      dark: '#C13584', // Instagram magenta
      contrastText: '#FFFFFF'
    },
    error: {
      main: '#ED4956', // Instagram error red
      light: '#FF6B6B',
      dark: '#D2374A'
    },
    warning: {
      main: '#FFDC80', // Instagram warm yellow
      light: '#FFE9A8',
      dark: '#F2C94C'
    },
    info: {
      main: '#3897F0', // Instagram blue
      light: '#63B3F5',
      dark: '#1877F2' // Facebook blue
    },
    success: {
      main: '#43BD64', // Medical green
      light: '#78E296',
      dark: '#2E8540'
    },
    text: {
      primary: '#262626', // Instagram text black
      secondary: '#8E8E8E', // Instagram secondary text
      disabled: 'rgba(142, 142, 142, 0.5)'
    },
    background: {
      default: '#FAFAFA', // Instagram background
      paper: '#FFFFFF'
    },
    divider: 'rgba(219, 219, 219, 0.8)' // Instagram dividers
  },
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif', // Instagram's font stack
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 600,
    fontWeightBold: 700,
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
      lineHeight: 1.2,
      letterSpacing: '-0.02em'
    },
    h2: {
      fontWeight: 700,
      fontSize: '2rem',
      lineHeight: 1.2,
      letterSpacing: '-0.01em'
    },
    h3: {
      fontWeight: 700,
      fontSize: '1.75rem',
      lineHeight: 1.2,
      letterSpacing: '-0.01em' 
    },
    h4: {
      fontWeight: 700,
      fontSize: '1.5rem',
      lineHeight: 1.2
    },
    h5: {
      fontWeight: 700,
      fontSize: '1.25rem',
      lineHeight: 1.2
    },
    h6: {
      fontWeight: 700,
      fontSize: '1.125rem',
      lineHeight: 1.2
    },
    subtitle1: {
      fontWeight: 600,
      fontSize: '1rem',
      lineHeight: 1.5
    },
    subtitle2: {
      fontWeight: 600,
      fontSize: '0.875rem',
      lineHeight: 1.5
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5
    },
    button: {
      fontWeight: 600,
      fontSize: '0.875rem',
      textTransform: 'none'
    },
    caption: {
      fontSize: '0.75rem',
      lineHeight: 1.5
    },
    overline: {
      fontWeight: 600,
      fontSize: '0.75rem',
      letterSpacing: '0.05em',
      textTransform: 'uppercase',
      lineHeight: 1.5
    }
  },
  shape: {
    borderRadius: 8 // Instagram uses more subtle rounded corners
  },
  shadows: [
    'none',
    '0px 1px 3px rgba(0, 0, 0, 0.08)',
    '0px 2px 6px rgba(0, 0, 0, 0.06)',
    '0px 3px 8px rgba(0, 0, 0, 0.08)',
    '0px 4px 12px rgba(0, 0, 0, 0.06)',
    '0px 5px 16px rgba(0, 0, 0, 0.08)',
    '0px 6px 20px rgba(0, 0, 0, 0.08)',
    '0px 7px 24px rgba(0, 0, 0, 0.08)',
    '0px 8px 28px rgba(0, 0, 0, 0.10)',
    '0px 9px 32px rgba(0, 0, 0, 0.12)',
    '0px 10px 36px rgba(0, 0, 0, 0.12)',
    '0px 11px 40px rgba(0, 0, 0, 0.14)',
    '0px 12px 44px rgba(0, 0, 0, 0.14)',
    '0px 13px 48px rgba(0, 0, 0, 0.14)',
    '0px 14px 52px rgba(0, 0, 0, 0.16)',
    '0px 15px 56px rgba(0, 0, 0, 0.16)',
    '0px 16px 60px rgba(0, 0, 0, 0.18)',
    '0px 17px 64px rgba(0, 0, 0, 0.18)',
    '0px 18px 68px rgba(0, 0, 0, 0.20)',
    '0px 19px 72px rgba(0, 0, 0, 0.20)',
    '0px 20px 76px rgba(0, 0, 0, 0.20)',
    '0px 21px 80px rgba(0, 0, 0, 0.22)',
    '0px 22px 84px rgba(0, 0, 0, 0.22)',
    '0px 23px 88px rgba(0, 0, 0, 0.24)',
    '0px 24px 92px rgba(0, 0, 0, 0.24)'
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '10px 20px',
          boxShadow: 'none',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-1px)',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
          }
        },
        contained: {
          boxShadow: '0 1px 2px rgba(0, 0, 0, 0.08)',
        },
        containedPrimary: {
          background: 'linear-gradient(45deg, #5851DB, #833AB4)', // Instagram gradient
          '&:hover': {
            background: 'linear-gradient(45deg, #4a3acf, #7636a0)'
          }
        },
        containedSecondary: {
          background: 'linear-gradient(45deg, #E1306C, #F77737)', // Instagram gradient
          '&:hover': {
            background: 'linear-gradient(45deg, #d02a60, #e56b2f)'
          }
        },
        outlined: {
          borderWidth: 1,
          '&:hover': {
            borderWidth: 1
          }
        },
        textPrimary: {
          '&:hover': {
            backgroundColor: alpha('#5851DB', 0.06)
          }
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 1px 5px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden'
        }
      }
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: 16
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12
        },
        outlined: {
          borderWidth: 1,
          borderColor: '#dbdbdb' // Instagram border color
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          borderRadius: 16 // Instagram uses full rounded chips
        },
        filled: {
          boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 6,
            '& fieldset': {
              borderWidth: 1,
              borderColor: '#dbdbdb' // Instagram input border
            },
            '&:hover fieldset': {
              borderWidth: 1
            },
            '&.Mui-focused fieldset': {
              borderWidth: 2,
              borderColor: '#5851DB' // Instagram primary
            }
          }
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          '& fieldset': {
            borderWidth: 1,
            borderColor: '#dbdbdb',
            transition: 'all 0.2s'
          },
          '&:hover fieldset': {
            borderWidth: 1,
            borderColor: '#a8a8a8'
          },
          '&.Mui-focused fieldset': {
            borderWidth: 2,
            borderColor: '#5851DB'
          }
        }
      }
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          height: 6 // Instagram has thin progress bars
        }
      }
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          alignItems: 'center'
        },
        standardSuccess: {
          backgroundColor: alpha('#43BD64', 0.12),
          color: '#2E8540'
        },
        standardInfo: {
          backgroundColor: alpha('#3897F0', 0.12),
          color: '#1877F2'
        },
        standardWarning: {
          backgroundColor: alpha('#FFDC80', 0.12),
          color: '#F2994A'
        },
        standardError: {
          backgroundColor: alpha('#ED4956', 0.12),
          color: '#D2374A'
        }
      }
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 0 #dbdbdb', // Instagram uses a single hairline border
          backdropFilter: 'blur(8px)',
          backgroundColor: alpha('#fff', 0.95)
        }
      }
    },
    MuiBottomNavigation: {
      styleOverrides: {
        root: {
          height: 60,
          borderTop: '1px solid #dbdbdb'
        }
      }
    },
    MuiBottomNavigationAction: {
      styleOverrides: {
        root: {
          padding: '8px 0',
          '&.Mui-selected': {
            paddingTop: 8
          }
        }
      }
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          borderRadius: 8
        }
      }
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 8
        }
      }
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: '#dbdbdb' // Instagram divider
        }
      }
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: 6
        }
      }
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          '& .MuiTab-root': {
            fontWeight: 600,
            textTransform: 'none',
            '&:hover': {
              backgroundColor: alpha('#FAFAFA', 0.8)
            }
          },
          '& .MuiTabs-indicator': {
            height: 1, // Instagram has a thin indicator
            backgroundColor: '#262626'
          }
        }
      }
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          border: '2px solid #fff', // Instagram avatar border
          boxShadow: '0 0 0 1px #dbdbdb' // Instagram avatar outline
        }
      }
    },
    MuiBadge: {
      styleOverrides: {
        badge: {
          fontWeight: 'bold',
          fontSize: '0.65rem'
        }
      }
    }
  }
});

export default theme; 