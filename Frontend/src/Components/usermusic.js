return (
  <Box sx={{ 
    padding: 3, 
    backgroundColor: '#121212', 
    minHeight: '100vh', 
    color: '#fff',
    backgroundImage: 'radial-gradient(circle at center, #2c3e50 0%, #1a1a1a 100%)',
    position: 'relative',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'url("data:image/svg+xml,%3Csvg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%239C92AC" fill-opacity="0.05"%3E%3Cpath d="M0 0h20L0 20z"/%3E%3C/g%3E%3C/svg%3E")',
      pointerEvents: 'none'
    }
  }}>
    <Card sx={{
      backgroundColor: 'rgba(18, 18, 18, 0.8)',
      backdropFilter: 'blur(20px)',
      borderRadius: '30px',
      overflow: 'hidden',
      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
      maxWidth: '1200px',
      margin: '0 auto',
      position: 'relative',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '200px',
        background: 'linear-gradient(180deg, rgba(138, 43, 226, 0.2) 0%, transparent 100%)',
        zIndex: 0
      }
    }}>
      <Box sx={{ 
        display: 'flex',
        padding: 4,
        gap: 4,
        alignItems: 'flex-start',
        flexDirection: { xs: 'column', md: 'row' },
        position: 'relative',
        zIndex: 1
      }}>
        {/* Album Cover with Animation */}
        <Box sx={{ 
          flexShrink: 0,
          width: { xs: '100%', md: '300px' },
          height: { xs: '300px', md: '300px' },
          position: 'relative',
          borderRadius: '20px',
          overflow: 'hidden',
          boxShadow: '0 15px 30px rgba(0, 0, 0, 0.4)',
          '&:hover': {
            transform: 'translateY(-10px) rotate(3deg)',
            transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(45deg, rgba(138, 43, 226, 0.4) 0%, transparent 100%)',
            opacity: 0,
            transition: 'opacity 0.3s ease',
            '&:hover': {
              opacity: 1
            }
          }
        }}>
          <img
            src={`http://localhost:8080/${music.coverPicPath}`}
            alt={music.songName}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
        </Box>

        {/* Song Details with Enhanced Typography */}
        <Box sx={{ flex: 1 }}>
          <Typography variant="h3" sx={{ 
            color: '#fff',
            fontWeight: '900',
            marginBottom: 2,
            textShadow: '2px 2px 20px rgba(138, 43, 226, 0.5)',
            letterSpacing: '-1px',
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: -10,
              left: 0,
              width: '60px',
              height: '4px',
              background: 'linear-gradient(90deg, #8a2be2, transparent)',
              borderRadius: '2px'
            }
          }}>
            {music.songName}
          </Typography>
          
          <Typography variant="h5" sx={{ 
            color: '#e0e0e0',
            marginBottom: 3,
            fontWeight: '500',
            letterSpacing: '1px'
          }}>
            {music.artistName}
          </Typography>

          <Box sx={{ 
            display: 'flex', 
            gap: 2, 
            marginBottom: 3,
            flexWrap: 'wrap'
          }}>
            <Chip 
              label={music.genre}
              sx={{ 
                backgroundColor: '#8a2be2',
                color: '#fff',
                fontWeight: 'bold',
                padding: '8px 16px',
                borderRadius: '15px',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: '0 5px 15px rgba(138, 43, 226, 0.3)'
                }
              }}
            />
            <Chip 
              label={music.language}
              sx={{ 
                backgroundColor: '#483d8b',
                color: '#fff',
                fontWeight: 'bold',
                padding: '8px 16px',
                borderRadius: '15px',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: '0 5px 15px rgba(72, 61, 139, 0.3)'
                }
              }}
            />
          </Box>

          {/* Enhanced Audio Player Container */}
          <Box sx={{ 
            backgroundColor: 'rgba(138, 43, 226, 0.1)',
            padding: 3,
            borderRadius: '20px',
            marginTop: 2,
            boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.2)',
            border: '1px solid rgba(138, 43, 226, 0.2)'
          }}>
            <audio
              controls
              style={{
                width: '100%',
                height: '50px',
                borderRadius: '15px'
              }}
            >
              <source src={`http://localhost:8080/${music.musicFilePath}`} type="audio/mp3" />
              Your browser does not support the audio element.
            </audio>
          </Box>

          {/* Animated Action Buttons */}
          <Box sx={{ 
            display: 'flex',
            gap: 2,
            marginTop: 3,
            flexWrap: 'wrap'
          }}>
            <Button
              variant="contained"
              startIcon={<QueueMusicIcon />}
              onClick={handleAddToQueue}
              sx={{
                backgroundColor: '#8a2be2',
                padding: '12px 24px',
                borderRadius: '25px',
                fontWeight: 'bold',
                boxShadow: '0 4px 15px rgba(138, 43, 226, 0.3)',
                '&:hover': {
                  backgroundColor: '#9f3eff',
                  transform: 'translateY(-3px)',
                  boxShadow: '0 8px 25px rgba(138, 43, 226, 0.4)'
                },
                transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
              }}
            >
              Add to Queue
            </Button>
            <Button
              variant="contained"
              startIcon={<DownloadIcon />}
              onClick={handleDownload}
              sx={{
                backgroundColor: '#483d8b',
                padding: '12px 24px',
                borderRadius: '25px',
                fontWeight: 'bold',
                boxShadow: '0 4px 15px rgba(72, 61, 139, 0.3)',
                '&:hover': {
                  backgroundColor: '#5a4aa2',
                  transform: 'translateY(-3px)',
                  boxShadow: '0 8px 25px rgba(72, 61, 139, 0.4)'
                },
                transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
              }}
            >
              Download
            </Button>
          </Box>
        </Box>
      </Box>
    </Card>
  </Box>
);