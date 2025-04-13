import React from 'react';
import { 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  LinearProgress, 
  Chip, 
  Divider,
  List,
  ListItem,
  ListItemText,
  Grid,
  Paper,
  IconButton,
  Tooltip,
  useTheme,
  useMediaQuery,
  alpha,
  Avatar,
  Stack
} from '@mui/material';
import GradeIcon from '@mui/icons-material/Grade';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import IosShareIcon from '@mui/icons-material/IosShare';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import BiotechOutlinedIcon from '@mui/icons-material/BiotechOutlined';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined';
import VerifiedIcon from '@mui/icons-material/Verified';
import WarningIcon from '@mui/icons-material/Warning';
import ScienceIcon from '@mui/icons-material/Science';

const ResultCard = ({ result }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isMedium = useMediaQuery(theme.breakpoints.down('md'));
  
  if (!result) return null;

  const { 
    productName, 
    brandName = '',
    score, 
    isSafe, 
    allergies = [], 
    additives = [],
    aiComment = '', 
    ingredients = []
  } = result;

  // Health rating color based on score
  const getRatingColor = (rating) => {
    if (rating < 30) return theme.palette.error.main;
    if (rating < 60) return theme.palette.warning.main;
    if (rating < 80) return theme.palette.success.main;
    return theme.palette.success.dark;
  };

  // Get rating text based on score
  const getRatingText = (rating) => {
    if (rating < 30) return 'Poor';
    if (rating < 60) return 'Moderate';
    if (rating < 80) return 'Good';
    return 'Excellent';
  };
  
  // Get rating icon based on score
  const getRatingIcon = (rating) => {
    if (rating < 30) return <SentimentVeryDissatisfiedIcon fontSize="small" />;
    if (rating < 60) return <SentimentNeutralIcon fontSize="small" />;
    if (rating < 80) return <SentimentSatisfiedAltIcon fontSize="small" />;
    return <AutoAwesomeIcon fontSize="small" />;
  };

  // Determine allergen severity
  const getAllergySeverity = () => {
    if (!allergies || allergies.length === 0) return 'none';
    const highSeverity = allergies.some(a => a.severity === 'high');
    const mediumSeverity = allergies.some(a => a.severity === 'medium');
    if (highSeverity) return 'high';
    if (mediumSeverity) return 'medium';
    return 'low';
  };

  // Get appropriate allergen summary tag
  const getAllergenSummaryTag = () => {
    const severity = getAllergySeverity();
    
    switch(severity) {
      case 'high':
        return {
          text: "High Allergy Risk",
          color: "error",
          icon: <ReportProblemOutlinedIcon />,
        };
      case 'medium':
        return {
          text: "Moderate Allergy Risk",
          color: "warning",
          icon: <WarningIcon />,
        };
      case 'low':
        return {
          text: "Low Allergy Risk",
          color: "info",
          icon: <InfoOutlinedIcon />,
        };
      default:
        return {
          text: "Allergy Safe",
          color: "success",
          icon: <CheckCircleIcon />,
        };
    }
  };

  // Get additive concern level count
  const getAdditiveCounts = () => {
    const counts = { high: 0, medium: 0, low: 0 };
    additives.forEach(additive => {
      if (counts[additive.concern]) {
        counts[additive.concern]++;
      }
    });
    return counts;
  };

  const allergenTag = getAllergenSummaryTag();
  const additiveCounts = getAdditiveCounts();

  return (
    <Card 
      elevation={3} 
      sx={{ 
        borderRadius: '24px',
        overflow: 'hidden',
        position: 'relative',
        mt: 6,
        mb: 2,
        boxShadow: '0 12px 24px rgba(0, 0, 0, 0.08)'
      }}
    >
      {/* Health Score Badge */}
      <Box
        sx={{
          position: 'absolute',
          top: -36,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Paper
          elevation={4}
          sx={{
            width: 88,
            height: 88,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            backgroundImage: `linear-gradient(135deg, ${getRatingColor(score)} 0%, ${alpha(getRatingColor(score), 0.85)} 100%)`,
            color: '#fff',
            border: '4px solid #fff',
            boxShadow: '0 8px 16px ' + alpha(getRatingColor(score), 0.24)
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 800, lineHeight: 1 }}>
            {score}
          </Typography>
          <Typography variant="caption" sx={{ fontSize: '0.7rem', opacity: 0.9, letterSpacing: '0.03em' }}>
            HEALTH SCORE
          </Typography>
        </Paper>
      </Box>
      
      {/* Header */}
      <Box 
        sx={{ 
          p: 3,
          pt: { xs: 5, md: 5 },
          pb: 3,
          mt: 2,
          textAlign: 'center',
          backgroundColor: alpha(theme.palette.background.default, 0.5),
          borderBottom: '1px solid',
          borderColor: alpha(theme.palette.divider, 0.8)
        }}
      >
        <Typography 
          variant="h4" 
          sx={{ 
            textAlign: 'center',
            fontWeight: 700,
            mb: 1,
            color: theme.palette.text.primary,
            letterSpacing: '-0.01em'
          }}
        >
          {productName || 'Product Analysis'}
        </Typography>
        
        {brandName && (
          <Typography 
            variant="subtitle1" 
            sx={{ 
              mb: 1.5,
              color: theme.palette.text.secondary,
              fontWeight: 500
            }}
          >
            {brandName}
          </Typography>
        )}
        
        <Stack 
          direction="row" 
          spacing={2} 
          justifyContent="center" 
          alignItems="center"
          divider={<Divider orientation="vertical" flexItem />}
          sx={{ mb: 1 }}
        >
          <Chip
            icon={getRatingIcon(score)}
            label={getRatingText(score) + ' Quality'}
            color={score >= 60 ? 'success' : score >= 30 ? 'warning' : 'error'}
            variant="filled"
            size="small"
            sx={{ 
              fontWeight: 600,
              px: 1,
              height: 28,
              '& .MuiChip-icon': { 
                color: 'inherit',
                mr: 0.5 
              }
            }}
          />
          
          <Chip 
            icon={allergenTag.icon}
            label={allergenTag.text} 
            color={allergenTag.color} 
            variant="filled"
            size="small"
            sx={{ 
              fontWeight: 600,
              px: 1,
              height: 28,
              '& .MuiChip-icon': { 
                color: 'inherit',
                mr: 0.5 
              }
            }}
          />
        </Stack>
      </Box>
      
      <CardContent sx={{ p: { xs: 2, md: 3 } }}>
        <Grid container spacing={3}>
          {/* Left Column */}
          <Grid item xs={12} md={6}>
            {/* Health Rating Bar */}
            <Paper 
              elevation={0} 
              sx={{ 
                p: 3, 
                mb: 3, 
                borderRadius: 3,
                backgroundColor: theme.palette.background.paper,
                border: '1px solid',
                borderColor: alpha(theme.palette.divider, 0.8)
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box 
                  sx={{ 
                    width: 32, 
                    height: 32, 
                    borderRadius: '10px', 
                    backgroundColor: alpha(getRatingColor(score), 0.1),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mr: 1.5
                  }}
                >
                  <LocalFireDepartmentIcon sx={{ color: getRatingColor(score), fontSize: 18 }} />
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.text.primary }}>
                  Health Rating
                </Typography>
                <Tooltip title="This score is based on ingredient quality, processing level, additives, and nutritional value.">
                  <IconButton size="small" sx={{ ml: 'auto' }}>
                    <HelpOutlineIcon fontSize="small" color="action" />
                  </IconButton>
                </Tooltip>
              </Box>
              
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Box sx={{ width: '100%', mr: 1.5 }}>
                    <LinearProgress 
                      variant="determinate" 
                      value={score} 
                      sx={{ 
                        height: 12, 
                        borderRadius: 10,
                        backgroundColor: alpha(theme.palette.grey[300], 0.5),
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: getRatingColor(score),
                          backgroundImage: `linear-gradient(90deg, ${alpha(getRatingColor(score), 0.8)} 0%, ${getRatingColor(score)} 100%)`,
                          borderRadius: 10,
                        }
                      }} 
                    />
                  </Box>
                  <Box sx={{ minWidth: 45 }}>
                    <Typography variant="body2" sx={{ fontWeight: 700, color: getRatingColor(score) }}>
                      {score}/100
                    </Typography>
                  </Box>
                </Box>
              </Box>
              
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  backgroundColor: alpha(getRatingColor(score), 0.05),
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: alpha(getRatingColor(score), 0.1)
                }}
              >
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                  {
                    score < 30 ? 'This product contains several concerning ingredients. Consider healthier alternatives.' :
                    score < 60 ? 'This product has some questionable ingredients but is acceptable for occasional consumption.' :
                    score < 80 ? 'This product has minimal concerning ingredients and is a fairly good choice.' :
                    'This product has high-quality ingredients with minimal processing and is an excellent choice.'
                  }
                </Typography>
              </Paper>
            </Paper>
            
            {/* AI Insight */}
            {aiComment && (
              <Paper 
                elevation={0} 
                sx={{ 
                  p: 3, 
                  mb: 3, 
                  borderRadius: 3,
                  backgroundColor: theme.palette.background.paper,
                  border: '1px solid',
                  borderColor: alpha(theme.palette.divider, 0.8)
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box 
                    sx={{ 
                      width: 32, 
                      height: 32, 
                      borderRadius: '10px', 
                      backgroundColor: alpha(theme.palette.info.main, 0.1),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mr: 1.5
                    }}
                  >
                    <LightbulbOutlinedIcon sx={{ color: theme.palette.info.main, fontSize: 18 }} />
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.text.primary }}>
                    AI Insight
                  </Typography>
                </Box>
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    backgroundColor: alpha(theme.palette.info.main, 0.05),
                    borderRadius: 2,
                    border: '1px solid',
                    borderColor: alpha(theme.palette.info.main, 0.1)
                  }}
                >
                  <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                    {aiComment}
                  </Typography>
                </Paper>
              </Paper>
            )}
            
            {/* Additives Section */}
            {additives && additives.length > 0 && (
              <Paper 
                elevation={0} 
                sx={{ 
                  p: 3, 
                  mb: 3, 
                  borderRadius: 3,
                  backgroundColor: theme.palette.background.paper,
                  border: '1px solid',
                  borderColor: alpha(theme.palette.divider, 0.8)
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box 
                    sx={{ 
                      width: 32, 
                      height: 32, 
                      borderRadius: '10px', 
                      backgroundColor: alpha(theme.palette.warning.main, 0.1),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mr: 1.5
                    }}
                  >
                    <ScienceIcon sx={{ color: theme.palette.warning.main, fontSize: 18 }} />
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.text.primary }}>
                    Additives
                  </Typography>
                  <Tooltip title="Food additives are substances added to food to preserve flavor or enhance taste, appearance, or shelf life.">
                    <IconButton size="small" sx={{ ml: 'auto' }}>
                      <HelpOutlineIcon fontSize="small" color="action" />
                    </IconButton>
                  </Tooltip>
                </Box>
                
                {(additiveCounts.high > 0 || additiveCounts.medium > 0) ? (
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      backgroundColor: alpha(theme.palette.warning.main, 0.05),
                      borderRadius: 2,
                      border: '1px solid',
                      borderColor: alpha(theme.palette.warning.main, 0.1),
                      mb: 2
                    }}
                  >
                    <Typography variant="body2" sx={{ fontWeight: 500, color: theme.palette.text.primary }}>
                      {`This product contains ${additives.length} additives: `}
                      {additiveCounts.high > 0 && (
                        <Box component="span" sx={{ color: theme.palette.error.main, fontWeight: 700 }}>
                          {additiveCounts.high} high concern
                        </Box>
                      )}
                      {additiveCounts.high > 0 && additiveCounts.medium > 0 && ', '}
                      {additiveCounts.medium > 0 && (
                        <Box component="span" sx={{ color: theme.palette.warning.main, fontWeight: 700 }}>
                          {additiveCounts.medium} moderate concern
                        </Box>
                      )}
                      .
                    </Typography>
                  </Paper>
                ) : (
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      backgroundColor: alpha(theme.palette.success.main, 0.05),
                      borderRadius: 2,
                      border: '1px solid',
                      borderColor: alpha(theme.palette.success.main, 0.1),
                      mb: 2
                    }}
                  >
                    <Typography variant="body2" sx={{ fontWeight: 500, color: theme.palette.text.primary }}>
                      This product contains only low-concern additives.
                    </Typography>
                  </Paper>
                )}
                
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {additives.map((additive, index) => (
                    <Chip 
                      key={index} 
                      label={additive.name} 
                      color={
                        additive.concern === 'high' ? 'error' : 
                        additive.concern === 'medium' ? 'warning' : 
                        'default'
                      } 
                      variant={additive.concern === 'high' ? 'filled' : 'outlined'} 
                      size="small"
                      sx={{ fontWeight: 500 }}
                    />
                  ))}
                </Box>
              </Paper>
            )}
            
            {/* Actions */}
            {!isMobile && (
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                <Tooltip title="Save this product">
                  <IconButton 
                    color="primary" 
                    sx={{ 
                      border: '1px solid', 
                      borderColor: alpha(theme.palette.primary.main, 0.5),
                      mr: 1
                    }}
                  >
                    <BookmarkBorderIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Share results">
                  <IconButton 
                    color="primary"
                    sx={{ 
                      border: '1px solid', 
                      borderColor: alpha(theme.palette.primary.main, 0.5) 
                    }}
                  >
                    <IosShareIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
            )}
          </Grid>
          
          {/* Right Column */}
          <Grid item xs={12} md={6}>
            {/* Allergen Alert */}
            {allergies.length > 0 && (
              <Paper 
                elevation={0} 
                sx={{ 
                  p: 3, 
                  mb: 3, 
                  borderRadius: 3,
                  backgroundColor: theme.palette.background.paper,
                  border: '1px solid',
                  borderColor: alpha(theme.palette.divider, 0.8)
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box 
                    sx={{ 
                      width: 32, 
                      height: 32, 
                      borderRadius: '10px', 
                      backgroundColor: alpha(theme.palette.error.main, 0.1),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mr: 1.5
                    }}
                  >
                    <ErrorIcon sx={{ color: theme.palette.error.main, fontSize: 18 }} />
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.text.primary }}>
                    Allergen Alert
                  </Typography>
                </Box>
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    backgroundColor: alpha(theme.palette.error.main, 0.05),
                    borderRadius: 2,
                    border: '1px solid',
                    borderColor: alpha(theme.palette.error.main, 0.1),
                    mb: 2
                  }}
                >
                  <Typography variant="body2" sx={{ fontWeight: 500, color: theme.palette.text.primary }}>
                    {allergies.length === 1 
                      ? 'This product contains an allergen you selected:'
                      : `This product contains ${allergies.length} allergens you selected:`}
                  </Typography>
                </Paper>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {allergies.map((allergen, index) => (
                    <Chip 
                      key={index} 
                      label={`${allergen.name} (${allergen.severity} risk)`} 
                      color={
                        allergen.severity === 'high' ? 'error' : 
                        allergen.severity === 'medium' ? 'warning' : 
                        'default'
                      } 
                      variant={allergen.severity === 'high' ? 'filled' : 'outlined'} 
                      size="small"
                      sx={{ fontWeight: 500 }}
                    />
                  ))}
                </Box>
              </Paper>
            )}
            
            {/* Ingredients List */}
            {ingredients.length > 0 && (
              <Paper 
                elevation={0} 
                sx={{ 
                  p: 3, 
                  borderRadius: 3,
                  backgroundColor: theme.palette.background.paper,
                  border: '1px solid',
                  borderColor: alpha(theme.palette.divider, 0.8),
                  maxHeight: allergies.length > 0 ? 320 : 420,
                  overflow: 'auto'
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box 
                    sx={{ 
                      width: 32, 
                      height: 32, 
                      borderRadius: '10px', 
                      backgroundColor: alpha(theme.palette.grey[500], 0.1),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mr: 1.5
                    }}
                  >
                    <ArticleOutlinedIcon sx={{ color: theme.palette.grey[600], fontSize: 18 }} />
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.text.primary }}>
                    Ingredients
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ ml: 'auto', fontWeight: 500 }}>
                    {ingredients.length} total
                  </Typography>
                </Box>
                <Paper
                  elevation={0}
                  sx={{
                    backgroundColor: alpha(theme.palette.background.default, 0.6),
                    borderRadius: 2,
                    border: '1px solid',
                    borderColor: alpha(theme.palette.divider, 0.3),
                    overflow: 'hidden'
                  }}
                >
                  <List dense disablePadding>
                    {ingredients.map((ingredient, index) => {
                      // Check if ingredient contains any allergen
                      const isAllergen = allergies.some(allergen => 
                        ingredient.toLowerCase().includes(allergen.name.toLowerCase())
                      );
                      
                      // Check if ingredient contains any additive
                      const isAdditive = additives.some(additive => 
                        ingredient.toLowerCase().includes(additive.name.toLowerCase())
                      );
                      
                      // Determine the label and color
                      let chipLabel = null;
                      let chipColor = "default";
                      
                      if (isAllergen) {
                        chipLabel = "Allergen";
                        chipColor = "error";
                      } else if (isAdditive) {
                        const additive = additives.find(a => 
                          ingredient.toLowerCase().includes(a.name.toLowerCase())
                        );
                        if (additive) {
                          chipLabel = additive.concern === 'high' ? "Additive (High)" : 
                                      additive.concern === 'medium' ? "Additive (Med)" : 
                                      "Additive";
                          chipColor = additive.concern === 'high' ? "error" : 
                                     additive.concern === 'medium' ? "warning" : 
                                     "default";
                        }
                      }
                      
                      return (
                        <ListItem 
                          key={index}
                          disablePadding
                          sx={{ 
                            py: 1,
                            px: 2,
                            borderBottom: index < ingredients.length - 1 ? '1px solid' : 'none',
                            borderColor: alpha(theme.palette.divider, 0.3),
                            backgroundColor: isAllergen 
                              ? alpha(theme.palette.error.light, 0.1) 
                              : isAdditive 
                                ? alpha(theme.palette.warning.light, 0.05)
                                : 'transparent'
                          }}
                        >
                          <ListItemText 
                            primary={ingredient} 
                            primaryTypographyProps={{ 
                              variant: 'body2',
                              color: isAllergen 
                                ? theme.palette.error.main 
                                : isAdditive 
                                  ? theme.palette.warning.dark
                                  : theme.palette.text.primary,
                              fontWeight: isAllergen || isAdditive ? 600 : 400
                            }}
                          />
                          {chipLabel && (
                            <Chip 
                              label={chipLabel} 
                              color={chipColor} 
                              size="small" 
                              sx={{ height: 24, fontSize: '0.7rem' }}
                            />
                          )}
                        </ListItem>
                      );
                    })}
                  </List>
                </Paper>
              </Paper>
            )}
          </Grid>
        </Grid>
        
        {/* Mobile Actions */}
        {isMobile && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            <Tooltip title="Save this product">
              <IconButton 
                color="primary" 
                sx={{ 
                  border: '1px solid', 
                  borderColor: alpha(theme.palette.primary.main, 0.5),
                  mr: 2
                }}
              >
                <BookmarkBorderIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Share results">
              <IconButton 
                color="primary"
                sx={{ 
                  border: '1px solid', 
                  borderColor: alpha(theme.palette.primary.main, 0.5) 
                }}
              >
                <IosShareIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default ResultCard; 