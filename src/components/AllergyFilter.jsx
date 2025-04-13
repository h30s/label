import React from 'react';
import { 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Chip, 
  Box, 
  Typography, 
  Paper, 
  ListItemIcon,
  ListItemText,
  Divider,
  useTheme,
  alpha,
  Avatar
} from '@mui/material';
import EggIcon from '@mui/icons-material/EggAlt';
import GrassIcon from '@mui/icons-material/Grass';
import KitchenIcon from '@mui/icons-material/Kitchen';
import WaterIcon from '@mui/icons-material/Water';
import SoupKitchenIcon from '@mui/icons-material/SoupKitchen';
import GrainIcon from '@mui/icons-material/Grain';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import BakeryDiningIcon from '@mui/icons-material/BakeryDining';
import CrueltyFreeIcon from '@mui/icons-material/CrueltyFree';
import SetMealIcon from '@mui/icons-material/SetMeal';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ScienceIcon from '@mui/icons-material/Science';
import RiceBowlIcon from '@mui/icons-material/RiceBowl';

const AllergyFilter = ({ selectedAllergies, setSelectedAllergies }) => {
  const theme = useTheme();

  // Define a color for each allergen
  const allergenColors = {
    'Milk': '#91D7F2',
    'Eggs': '#FFC107',
    'Fish': '#64B5F6',
    'Shellfish': '#FF80AB',
    'Tree Nuts': '#AED581',
    'Peanuts': '#FFB74D',
    'Wheat': '#FFEE58',
    'Soybeans': '#81C784',
    'Sesame': '#CE93D8',
    'Gluten': '#FFCC80',
    'Sulfites': '#E0E0E0',
    'Mustard': '#FFAB91',
    'MSG': '#B39DDB',
    'Artificial Sweeteners': '#F48FB1'
  };

  // Icons for allergens
  const allergenIcons = {
    'Milk': <KitchenIcon />,
    'Eggs': <EggIcon />,
    'Fish': <SetMealIcon />,
    'Shellfish': <SetMealIcon />,
    'Tree Nuts': <GrainIcon />,
    'Peanuts': <GrainIcon />,
    'Wheat': <BakeryDiningIcon />,
    'Soybeans': <GrassIcon />,
    'Sesame': <GrassIcon />,
    'Gluten': <BakeryDiningIcon />,
    'Sulfites': <ScienceIcon />,
    'Mustard': <SoupKitchenIcon />,
    'MSG': <ScienceIcon />,
    'Artificial Sweeteners': <ScienceIcon />
  };

  const handleChange = (event) => {
    setSelectedAllergies(event.target.value);
  };

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Box 
        sx={{ 
          p: 3, 
          pb: 2,
          backgroundColor: alpha(theme.palette.primary.main, 0.04),
          borderBottom: '1px solid',
          borderColor: alpha(theme.palette.divider, 0.7)
        }}
      >
        <Typography 
          variant="h5" 
          gutterBottom
          sx={{ 
            fontWeight: 700,
            color: 'text.primary',
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}
        >
          <FilterAltIcon sx={{ fontSize: 24, color: theme.palette.primary.main }} />
          Allergy Check
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          Select any allergies you want to check for in the product
        </Typography>
      </Box>

      <Box sx={{ p: 3 }}>
        <FormControl fullWidth variant="outlined" sx={{ mb: 3 }}>
          <InputLabel id="allergies-label">Select allergens</InputLabel>
          <Select
            labelId="allergies-label"
            id="allergies"
            multiple
            value={selectedAllergies}
            onChange={handleChange}
            label="Select allergens"
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip 
                    key={value} 
                    label={value} 
                    size="small"
                    sx={{ 
                      bgcolor: allergenColors[value] ? alpha(allergenColors[value], 0.15) : undefined,
                      borderColor: allergenColors[value] ? alpha(allergenColors[value], 0.3) : undefined,
                      color: 'text.primary',
                      fontWeight: 500,
                      '& .MuiChip-icon': {
                        color: allergenColors[value] ? alpha(allergenColors[value], 0.7) : undefined,
                      }
                    }}
                    avatar={
                      <Avatar
                        sx={{ 
                          bgcolor: allergenColors[value] ? alpha(allergenColors[value], 0.2) : 'transparent',
                          color: allergenColors[value],
                          border: 'none'
                        }}
                      >
                        {allergenIcons[value]}
                      </Avatar>
                    }
                  />
                ))}
              </Box>
            )}
            sx={{
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: alpha(theme.palette.primary.main, 0.2),
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: alpha(theme.palette.primary.main, 0.3),
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: theme.palette.primary.main,
              }
            }}
          >
            {Object.keys(allergenColors).map((name) => (
              <MenuItem key={name} value={name} sx={{ py: 1 }}>
                <ListItemIcon sx={{ 
                  color: allergenColors[name],
                  minWidth: 36
                }}>
                  {allergenIcons[name]}
                </ListItemIcon>
                <ListItemText primary={name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {selectedAllergies.length > 0 ? (
          <Paper
            elevation={0}
            sx={{ 
              p: 2.5, 
              bgcolor: alpha(theme.palette.primary.main, 0.04),
              borderRadius: 3,
              border: '1px solid',
              borderColor: alpha(theme.palette.primary.main, 0.12)
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1.5, gap: 1.5 }}>
              <CheckCircleOutlineIcon 
                color="success" 
                fontSize="small"
                sx={{ mt: 0.3 }}
              />
              <Box>
                <Typography 
                  variant="subtitle1" 
                  color="text.primary"
                  sx={{ fontWeight: 600, mb: 0.5, fontSize: '0.95rem' }}
                >
                  We'll check for {selectedAllergies.length} {selectedAllergies.length === 1 ? 'allergen' : 'allergens'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Upload a product label to see if it contains any of your selected allergens
                </Typography>
              </Box>
            </Box>
            
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
              {selectedAllergies.map((allergen) => (
                <Chip
                  key={allergen}
                  label={allergen}
                  size="medium"
                  sx={{
                    bgcolor: allergenColors[allergen] ? alpha(allergenColors[allergen], 0.12) : undefined,
                    borderColor: allergenColors[allergen] ? alpha(allergenColors[allergen], 0.3) : undefined,
                    color: 'text.primary',
                    fontWeight: 500,
                    '& .MuiChip-icon': {
                      color: allergenColors[allergen],
                    },
                    px: 0.5,
                  }}
                  avatar={
                    <Avatar
                      sx={{
                        bgcolor: allergenColors[allergen] ? alpha(allergenColors[allergen], 0.2) : 'transparent',
                        color: allergenColors[allergen],
                        border: 'none'
                      }}
                    >
                      {allergenIcons[allergen]}
                    </Avatar>
                  }
                />
              ))}
            </Box>
          </Paper>
        ) : (
          <Paper
            elevation={0}
            sx={{ 
              p: 2.5, 
              bgcolor: alpha(theme.palette.warning.main, 0.05),
              borderRadius: 3,
              border: '1px solid',
              borderColor: alpha(theme.palette.warning.main, 0.2)
            }}
          >
            <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 500 }}>
              No allergens selected. Choose allergens from the dropdown above to check products for those ingredients.
            </Typography>
          </Paper>
        )}
      </Box>
    </Box>
  );
};

export default AllergyFilter; 