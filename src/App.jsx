import { useState, useEffect } from 'react'
import { 
  Container, 
  CssBaseline, 
  ThemeProvider, 
  Box, 
  Paper, 
  Grid, 
  Fade, 
  Zoom, 
  alpha,
  useMediaQuery,
  useTheme,
  BottomNavigation,
  BottomNavigationAction
} from '@mui/material'
import Header from './components/Header'
import ImageUploader from './components/ImageUploader'
import AllergyFilter from './components/AllergyFilter'
import ResultCard from './components/ResultCard'
import { extractTextFromImage, analyzeIngredients } from './services/ImageAnalysisService'
import HomeIcon from '@mui/icons-material/Home'
import ScannerIcon from '@mui/icons-material/Scanner'
import HistoryIcon from '@mui/icons-material/History'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import theme from './theme'

function App() {
  const [selectedAllergies, setSelectedAllergies] = useState([])
  const [analysisResult, setAnalysisResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [appReady, setAppReady] = useState(false)
  const [value, setValue] = useState(0)
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  // Set app as ready after initial render
  useEffect(() => {
    const timer = setTimeout(() => {
      setAppReady(true)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  const handleImageSelected = async (imageData) => {
    setLoading(true)
    setError('')
    setAnalysisResult(null)
    
    try {
      // Step 1: Extract text from image using OCR
      const extractedText = await extractTextFromImage(imageData)
      
      if (!extractedText || extractedText.trim().length < 10) {
        throw new Error('Could not detect enough text in the image. Please upload a clearer image of product ingredients.')
      }
      
      console.log('Extracted Text:', extractedText)
      
      // Check if text looks like actual ingredients
      if (!looksLikeIngredientsList(extractedText)) {
        throw new Error('The image does not appear to contain an ingredients list. Please upload an image of product ingredients.')
      }
      
      // Step 2: Analyze the ingredients
      const result = await analyzeIngredients(extractedText, selectedAllergies)
      
      // Step 3: Update state with results
      setAnalysisResult(result)
    } catch (err) {
      console.error('Analysis failed:', err)
      setError(err.message || 'Failed to analyze the image. Please try again with a clearer image of product ingredients.')
    } finally {
      setLoading(false)
    }
  }
  
  // Simple validation to check if text looks like an ingredient list
  const looksLikeIngredientsList = (text) => {
    const lowercaseText = text.toLowerCase()
    
    // Check for common ingredient list indicators
    const hasIngredientsWord = lowercaseText.includes('ingredients')
    const hasCommas = (text.match(/,/g) || []).length >= 2 // At least 3 ingredients separated by commas
    const hasCommonIngredients = [
      'water', 'sugar', 'salt', 'flour', 'oil', 'milk', 'soy', 'wheat', 
      'corn', 'extract', 'natural', 'artificial', 'flavor', 'preservative',
      'vitamin', 'acid', 'color', 'sodium', 'starch', 'protein'
    ].some(ingredient => lowercaseText.includes(ingredient))
    
    // Look for E-numbers (food additives)
    const hasENumbers = /e\d{3}|e-\d{3}/i.test(lowercaseText)
    
    // Calculate a confidence score
    let score = 0
    if (hasIngredientsWord) score += 2
    if (hasCommas) score += 2
    if (hasCommonIngredients) score += 3
    if (hasENumbers) score += 2
    
    return score >= 3 // Threshold for considering it an ingredient list
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          background: theme.palette.background.default,
          display: 'flex',
          flexDirection: 'column',
          pb: isMobile ? 8 : 6 // Add padding for mobile bottom nav
        }}
      >
        <Fade in={appReady} timeout={800}>
          <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header />
            
            <Container 
              maxWidth="lg" 
              sx={{ 
                flexGrow: 1, 
                py: { xs: 2, md: 4 },
                px: { xs: 1.5, md: 3 }
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <Zoom in={appReady} style={{ transitionDelay: appReady ? '300ms' : '0ms' }}>
                    <Paper 
                      elevation={1} 
                      sx={{ 
                        p: 0, 
                        mb: { xs: 2, md: 0 },
                        height: '100%',
                        borderRadius: 3,
                        overflow: 'hidden',
                        border: '1px solid',
                        borderColor: theme.palette.divider,
                        transition: 'all 0.2s ease-in-out',
                        '&:hover': {
                          boxShadow: '0 5px 15px rgba(0, 0, 0, 0.08)',
                        }
                      }}
                    >
                      <AllergyFilter 
                        selectedAllergies={selectedAllergies} 
                        setSelectedAllergies={setSelectedAllergies} 
                      />
                    </Paper>
                  </Zoom>
                </Grid>
                <Grid item xs={12} md={8}>
                  <Zoom in={appReady} style={{ transitionDelay: appReady ? '500ms' : '0ms' }}>
                    <Paper 
                      elevation={1} 
                      sx={{ 
                        p: 0,
                        borderRadius: 3,
                        overflow: 'hidden',
                        border: '1px solid',
                        borderColor: theme.palette.divider,
                        transition: 'all 0.2s ease-in-out',
                        '&:hover': {
                          boxShadow: '0 5px 15px rgba(0, 0, 0, 0.08)',
                        }
                      }}
                    >
                      <Box sx={{ p: 3 }}>
                        <ImageUploader 
                          onImageSelected={handleImageSelected}
                          loading={loading}
                        />
                      </Box>
                    </Paper>
                  </Zoom>
                </Grid>
              </Grid>
              
              {error && (
                <Fade in={Boolean(error)} timeout={600}>
                  <Paper 
                    elevation={0} 
                    sx={{ 
                      p: 2.5, 
                      mt: 3, 
                      borderRadius: 2,
                      backgroundColor: alpha(theme.palette.error.main, 0.05),
                      borderLeft: '4px solid',
                      borderColor: theme.palette.error.main,
                      color: theme.palette.error.dark
                    }}
                  >
                    {error}
                  </Paper>
                </Fade>
              )}
              
              {analysisResult && (
                <Fade in={!!analysisResult} timeout={800}>
                  <Box>
                    <ResultCard 
                      result={analysisResult}
                    />
                  </Box>
                </Fade>
              )}
            </Container>
            
            {/* Instagram-style bottom navigation for mobile */}
            {isMobile && (
              <Paper 
                sx={{ 
                  position: 'fixed', 
                  bottom: 0, 
                  left: 0, 
                  right: 0,
                  zIndex: 1000,
                  borderTop: '1px solid',
                  borderColor: theme.palette.divider
                }} 
                elevation={0}
              >
                <BottomNavigation
                  value={value}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                  showLabels={false}
                  sx={{ 
                    height: 56,
                    backgroundColor: theme.palette.background.paper
                  }}
                >
                  <BottomNavigationAction 
                    icon={<HomeIcon />} 
                    sx={{ minWidth: 'auto' }} 
                  />
                  <BottomNavigationAction 
                    icon={<ScannerIcon />} 
                    sx={{ minWidth: 'auto' }} 
                  />
                  <BottomNavigationAction 
                    icon={<HistoryIcon />} 
                    sx={{ minWidth: 'auto' }} 
                  />
                  <BottomNavigationAction 
                    icon={<PersonOutlineIcon />} 
                    sx={{ minWidth: 'auto' }} 
                  />
                </BottomNavigation>
              </Paper>
            )}
          </Box>
        </Fade>
      </Box>
    </ThemeProvider>
  )
}

export default App
