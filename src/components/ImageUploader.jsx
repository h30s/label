import React, { useState, useRef, useEffect } from 'react';
import { 
  Button, 
  Box, 
  Typography, 
  Grid, 
  CircularProgress,
  Paper,
  useTheme,
  useMediaQuery,
  IconButton,
  Divider,
  alpha,
  Fade,
  Alert
} from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import ImageIcon from '@mui/icons-material/Image';

const ImageUploader = ({ onImageSelected, loading }) => {
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const [showCamera, setShowCamera] = useState(false);
  const streamRef = useRef(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const [imageError, setImageError] = useState('');
  const [cameraError, setCameraError] = useState('');
  const [cameraReady, setCameraReady] = useState(false);
  const [initializing, setInitializing] = useState(false);
  const videoHandlersAdded = useRef(false);
  const [debugInfo, setDebugInfo] = useState('');

  // Enhanced cleanup effect
  useEffect(() => {
    return () => {
      cleanupCamera();
    };
  }, []);
  
  // Add a useEffect to check for HTTPS - but don't show debug message
  useEffect(() => {
    // Camera API might be restricted to secure contexts (HTTPS)
    if (window.location.protocol !== 'https:' && window.location.hostname !== 'localhost') {
      console.warn('Camera access may be restricted because the site is not served over HTTPS');
      // Don't set debug info to keep UI clean
    }
  }, []);
  
  // Add effect to handle component visibility changes
  useEffect(() => {
    // Handle page visibility changes (user switches tabs)
    const handleVisibilityChange = () => {
      if (document.hidden && streamRef.current) {
        console.log('Page hidden, pausing camera');
        cleanupCamera();
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Handle when component unmounts or visibility changes
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);
  
  // Function to clean up all camera resources
  const cleanupCamera = () => {
    console.log('Cleaning up camera resources');
    
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => {
        try {
          track.stop();
          console.log('Track stopped:', track.kind);
        } catch (e) {
          console.error('Error stopping track:', e);
        }
      });
      streamRef.current = null;
    }
    
    if (videoRef.current) {
      try {
        videoRef.current.pause();
        videoRef.current.srcObject = null;
      } catch (e) {
        console.error('Error cleaning up video element:', e);
      }
    }
    
    setShowCamera(false);
    setCameraError('');
    setCameraReady(false);
    setInitializing(false);
    videoHandlersAdded.current = false;
  };

  const validateImageQuality = (imageData) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        // Check image dimensions
        if (img.width < 200 || img.height < 200) {
          reject('Image is too small. Please provide a larger, clearer image.');
          return;
        }
        
        // Create canvas to analyze image
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        
        // Get image data
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        
        // Calculate average brightness
        let totalBrightness = 0;
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          // Calculate luminance
          totalBrightness += (0.299 * r + 0.587 * g + 0.114 * b);
        }
        const avgBrightness = totalBrightness / (data.length / 4);
        
        // Check if image is too dark
        if (avgBrightness < 40) {
          reject('Image is too dark. Please provide a better lit image.');
          return;
        }
        
        // Check if image is just black/blank
        if (avgBrightness < 10) {
          reject('Image appears to be blank or completely dark. Please capture a clear photo of the ingredients list.');
          return;
        }
        
        // Calculate contrast
        let minBrightness = 255;
        let maxBrightness = 0;
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const brightness = 0.299 * r + 0.587 * g + 0.114 * b;
          minBrightness = Math.min(minBrightness, brightness);
          maxBrightness = Math.max(maxBrightness, brightness);
        }
        const contrast = maxBrightness - minBrightness;
        
        // Check if image has poor contrast
        if (contrast < 30) {
          reject('Image has poor contrast. Please provide a clearer image with better contrast.');
          return;
        }
        
        resolve(imageData);
      };
      
      img.onerror = () => {
        reject('Error loading image. Please try a different image.');
      };
      
      img.src = imageData;
    });
  };

  const handleFileUpload = async (event) => {
    setImageError('');
    const file = event.target.files[0];
    if (file) {
      // Check file type
      if (!file.type.startsWith('image/')) {
        setImageError('Please select a valid image file (JPG, PNG, etc.)');
        return;
      }
      
      // Check file size (max 10 MB)
      if (file.size > 10 * 1024 * 1024) {
        setImageError('Image is too large. Please select an image under 10 MB.');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = async () => {
        try {
          setPreviewUrl(reader.result);
          await validateImageQuality(reader.result);
          onImageSelected(reader.result);
        } catch (error) {
          setImageError(error);
          setPreviewUrl(reader.result); // Still show the preview so user can see what's wrong
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const openCamera = async () => {
    setShowCamera(true);
    setCameraError('');
    setCameraReady(false);
    setInitializing(true);
    videoHandlersAdded.current = false;
    
    // Clean up any existing camera resources first
    if (streamRef.current) {
      cleanupCamera();
    }
    
    try {
      // First check if the user's device supports getUserMedia
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Your browser does not support camera access. Please try uploading an image instead.');
      }
      
      // Check for HTTPS (camera may not work on non-secure contexts)
      if (window.location.protocol !== 'https:' && window.location.hostname !== 'localhost') {
        console.warn('Camera access may be restricted because the site is not served over HTTPS');
      }
      
      // Detect browser
      const isFirefox = navigator.userAgent.indexOf("Firefox") > -1;
      const isChrome = navigator.userAgent.indexOf("Chrome") > -1;
      const isSafari = navigator.userAgent.indexOf("Safari") > -1 && !isChrome;
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
      
      // Try different constraints based on browser
      let constraints = { audio: false, video: true };
      
      // For iOS Safari, need simpler constraints
      if (isIOS && isSafari) {
        constraints = { audio: false, video: true };
      } 
      // For modern browsers, try to get the back camera
      else {
        constraints = { 
          audio: false,
          video: { 
            facingMode: { ideal: 'environment' } 
          } 
        };
      }
      
      console.log('Requesting camera with constraints:', constraints);
      
      // Get camera stream
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      console.log('Camera stream obtained:', stream);
      
      if (!stream) {
        throw new Error('Failed to get camera stream');
      }
      
      streamRef.current = stream;
      
      if (videoRef.current) {
        console.log('Setting video source');
        
        // Make sure video element is visible and has dimensions
        videoRef.current.style.display = 'block';
        videoRef.current.style.width = '100%';
        videoRef.current.style.height = isMobile ? '280px' : '400px';
        
        // Force hardware acceleration
        videoRef.current.style.transform = 'translateZ(0)';
        
        // Set srcObject
        videoRef.current.srcObject = stream;
        
        if (!videoHandlersAdded.current) {
          // Multiple event listeners for different browsers
          const handleVideoReady = () => {
            console.log('Video is ready');
            setCameraReady(true);
            setInitializing(false);
          };
          
          videoRef.current.onloadeddata = handleVideoReady;
          videoRef.current.oncanplay = handleVideoReady;
          videoRef.current.onplaying = handleVideoReady;
          videoRef.current.onerror = (e) => {
            console.error('Video element error:', e);
            setCameraError('Video element error: ' + (e.target.error ? e.target.error.message : 'Unknown error'));
          };
          
          videoHandlersAdded.current = true;
        }
        
        try {
          await videoRef.current.play();
          console.log('Video playback started');
        } catch (playError) {
          console.error('Error playing video:', playError);
          
          // For iOS Safari, play might need user interaction
          if (isIOS) {
            setCameraError('Tap on the screen to activate your camera (iOS requirement)');
          } else {
            setCameraError('Unable to start video. Please check camera permissions and try again.');
          }
        }
      } else {
        throw new Error('Video element not available');
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      setInitializing(false);
      
      // Provide specific error messages
      if (error.name === 'NotAllowedError') {
        setCameraError('Camera permission denied. Please allow camera access and refresh the page.');
      } 
      else if (error.name === 'NotFoundError') {
        setCameraError('No camera found on your device. Please try uploading an image instead.');
      } 
      else if (error.name === 'NotReadableError' || error.name === 'AbortError') {
        setCameraError('Camera is in use by another application or unavailable. Please close other apps using your camera.');
      } 
      else if (error.name === 'OverconstrainedError') {
        // Try again with simpler constraints
        setCameraError('Camera constraints not satisfied. Trying simplified mode...');
        setTimeout(() => {
          setCameraError('');
          openCameraWithSimpleConstraints();
        }, 1000);
        return;
      } 
      else {
        setCameraError(error.message || 'Failed to access camera. Please try uploading an image instead.');
      }
    }
  };
  
  const openCameraWithSimpleConstraints = async () => {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera API not supported');
      }
      
      // Use the simplest possible constraints
      const stream = await navigator.mediaDevices.getUserMedia({ audio: false, video: true });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        
        videoRef.current.onloadeddata = () => setCameraReady(true);
        videoRef.current.oncanplay = () => setCameraReady(true);
        
        try {
          await videoRef.current.play();
          setInitializing(false);
        } catch (e) {
          setCameraError('Cannot play video. Try uploading an image instead.');
        }
      }
    } catch (e) {
      setCameraError('Camera access failed. Please use the upload option instead.');
      setInitializing(false);
    }
  };

  const captureImage = async () => {
    setImageError('');
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas.getContext('2d').drawImage(videoRef.current, 0, 0);
    const imageUrl = canvas.toDataURL('image/png');
    
    try {
      setPreviewUrl(imageUrl);
      await validateImageQuality(imageUrl);
      onImageSelected(imageUrl);
      closeCamera();
    } catch (error) {
      setImageError(error);
      // Don't close camera so user can try again
    }
  };

  const closeCamera = () => {
    cleanupCamera();
  };

  const resetImage = () => {
    setPreviewUrl(null);
    setImageError('');
  };

  return (
    <Box sx={{ position: 'relative' }}>
      <Typography 
        variant="h5" 
        align="center" 
        gutterBottom 
        sx={{ 
          fontWeight: 700,
          color: 'text.primary',
          mb: 3,
          letterSpacing: '-0.01em'
        }}
      >
        Scan Your Product Label
      </Typography>
      
      {imageError && (
        <Fade in={Boolean(imageError)}>
          <Alert 
            severity="error" 
            sx={{ 
              mb: 3, 
              borderRadius: 3,
              '& .MuiAlert-icon': {
                color: 'error.main' 
              }
            }}
            variant="outlined"
          >
            <Typography variant="body2" fontWeight={500}>
              {imageError}
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>
              Tip: Ensure good lighting and focus on the ingredients list.
            </Typography>
          </Alert>
        </Fade>
      )}
      
      {!showCamera && !loading && !previewUrl && (
        <Box 
          sx={{ 
            p: { xs: 3, md: 4 },
            backgroundColor: alpha(theme.palette.primary.main, 0.03),
            borderRadius: 3,
            border: '1.5px dashed',
            borderColor: alpha(theme.palette.primary.main, 0.2),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '240px',
            textAlign: 'center',
            transition: 'all 0.3s ease',
            '&:hover': {
              backgroundColor: alpha(theme.palette.primary.main, 0.05),
              borderColor: alpha(theme.palette.primary.main, 0.3),
              cursor: 'pointer',
              transform: 'translateY(-4px)',
            }
          }}
          onClick={() => fileInputRef.current.click()}
          className="dropzone"
        >
          <Box 
            sx={{ 
              width: 64, 
              height: 64, 
              borderRadius: '16px', 
              backgroundColor: alpha(theme.palette.primary.main, 0.08),
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 2.5
            }}
          >
            <InsertPhotoIcon 
              sx={{ 
                fontSize: 32, 
                color: theme.palette.primary.main
              }} 
            />
          </Box>
          <Typography variant="h6" gutterBottom fontWeight={600}>
            Upload a product label image
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Drag & drop or click to browse your files
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ mt: 1.5, display: 'block' }}>
            Supports JPG, PNG • Max 10MB
          </Typography>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            style={{ display: 'none' }}
            accept="image/*"
          />
        </Box>
      )}

      {!showCamera && !loading && !previewUrl && (
        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Divider sx={{ my: 2 }}>
            <Typography variant="body2" color="text.secondary" fontWeight={500}>
              OR
            </Typography>
          </Divider>
          <Button 
            variant="contained" 
            color="secondary"
            startIcon={<PhotoCameraIcon />}
            onClick={openCamera}
            fullWidth={isMobile}
            size="large"
            sx={{ 
              mt: 1, 
              mb: 1,
              py: 1.5
            }}
          >
            Take a Photo
          </Button>
        </Box>
      )}

      {showCamera && (
        <Paper
          elevation={3} 
          sx={{ 
            p: 0, 
            borderRadius: 4,
            overflow: 'hidden',
            position: 'relative',
            mb: 2
          }}
        >
          <Box sx={{ position: 'relative' }}>
            <IconButton 
              onClick={closeCamera} 
              sx={{ 
                position: 'absolute', 
                top: 12, 
                right: 12, 
                zIndex: 2, 
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                }
              }}
              size="small"
            >
              <CloseIcon />
            </IconButton>
            
            {/* Video element that shows camera feed */}
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline
              muted
              style={{ 
                width: '100%', 
                height: isMobile ? '280px' : '400px', 
                objectFit: 'cover',
                backgroundColor: '#000',
                display: 'block',  // Always display the video element
                transform: 'translateZ(0)'  // Force hardware acceleration
              }}
              onClick={() => {
                // Try to play on click (helps on iOS)
                if (videoRef.current) {
                  videoRef.current.play().catch(e => console.error("Click to play failed:", e));
                }
              }}
            />
            
            {/* Loading indicator while camera initializes */}
            {(initializing || (!cameraReady && !cameraError)) && (
              <Box 
                sx={{ 
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%', 
                  height: '100%', 
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'rgba(0, 0, 0, 0.7)'
                }}
              >
                <CircularProgress color="primary" size={60} thickness={4} />
                <Typography color="white" variant="body1" sx={{ mt: 2 }}>
                  Initializing camera...
                </Typography>
              </Box>
            )}
            
            {/* Camera error message */}
            {cameraError && (
              <Box 
                sx={{ 
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%', 
                  height: '100%', 
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  p: 3,
                  backgroundColor: 'rgba(0, 0, 0, 0.8)'
                }}
              >
                <Typography 
                  variant="subtitle1" 
                  color="error" 
                  sx={{ mb: 2, textAlign: 'center', fontWeight: 600 }}
                >
                  {cameraError}
                </Typography>
                <Button 
                  variant="contained" 
                  onClick={() => fileInputRef.current.click()} 
                  startIcon={<FileUploadIcon />}
                  color="primary"
                >
                  Upload an Image Instead
                </Button>
              </Box>
            )}
          </Box>
          
          {/* Camera controls */}
          <Box sx={{ p: 3, textAlign: 'center', backgroundColor: alpha(theme.palette.background.default, 0.9) }}>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={captureImage} 
              startIcon={<CameraAltIcon />}
              size="large"
              fullWidth={isMobile}
              sx={{ py: 1.5 }}
              disabled={!cameraReady || !!cameraError}
            >
              Capture Image
            </Button>
          </Box>
        </Paper>
      )}

      {loading && (
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column',
          justifyContent: 'center', 
          alignItems: 'center',
          py: 8
        }}>
          <CircularProgress 
            size={60} 
            thickness={4} 
            color="primary" 
            sx={{
              '& .MuiCircularProgress-circle': {
                strokeLinecap: 'round',
              }
            }}
          />
          <Typography variant="h6" sx={{ mt: 3, color: 'text.primary', fontWeight: 600 }}>
            Analyzing ingredients...
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Examining product label for health insights
          </Typography>
        </Box>
      )}

      {previewUrl && !showCamera && !loading && (
        <Fade in={Boolean(previewUrl)}>
          <Paper 
            elevation={3} 
            sx={{ 
              borderRadius: 4,
              overflow: 'hidden',
              position: 'relative'
            }}
          >
            <Box sx={{ position: 'relative' }}>
              <IconButton 
                onClick={resetImage} 
                sx={{ 
                  position: 'absolute', 
                  top: 12, 
                  right: 12, 
                  zIndex: 2, 
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  }
                }}
                size="small"
              >
                <RestartAltIcon />
              </IconButton>
              <Box 
                sx={{ 
                  width: '100%', 
                  height: 'auto',
                  position: 'relative',
                  backgroundColor: '#f8f9fa'
                }}
              >
                <img 
                  src={previewUrl} 
                  alt="Uploaded label" 
                  style={{ 
                    width: '100%', 
                    maxHeight: '400px',
                    objectFit: 'contain',
                    display: 'block',
                    padding: '24px',
                  }} 
                />
              </Box>
            </Box>
            <Box sx={{ 
              p: 3, 
              backgroundColor: alpha(theme.palette.primary.main, 0.04),
              borderTop: '1px solid',
              borderColor: alpha(theme.palette.primary.main, 0.1)
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ImageIcon sx={{ color: theme.palette.primary.main, mr: 1.5 }} />
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'text.primary' }}>
                    Image Uploaded Successfully
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Your product label is being analyzed
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Paper>
        </Fade>
      )}
    </Box>
  );
};

export default ImageUploader; 