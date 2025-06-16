import React from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  Grid,
  Paper,
  useTheme,
} from '@mui/material';

export default function LandingPage() {
  const theme = useTheme();

  return (
    <>
      {/* Navbar */}
      <AppBar position="fixed" color="transparent" elevation={0}>
        <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, sm: 6 } }}>
          <Typography variant="h5" color="primary" fontWeight="bold">
            EventEase
          </Typography>
          <Box>
            <Button
              component={Link}
              to="/login"
              color="primary"
              variant="outlined"
              sx={{ mr: 2, borderRadius: '20px' }}
            >
              Login
            </Button>
            <Button
              component={Link}
              to="/login"
              variant="contained"
              sx={{
                background: `linear-gradient(to right, ${theme.palette.primary.main}, #5c6bc0)`,
                borderRadius: '20px',
              }}
            >
              Sign Up
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box
        sx={{
          mt: 10,
          minHeight: '80vh',
          display: 'flex',
          alignItems: 'center',
          background: 'linear-gradient(135deg, #e3f2fd 0%, #f5f5f5 100%)',
        }}
      >
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography variant="h2" fontWeight="bold" gutterBottom>
            Streamline Campus Events with <span style={{ color: theme.palette.primary.main }}>EventEase</span>
          </Typography>
          <Typography variant="h6" color="textSecondary" paragraph>
            Manage registrations, clubs, and feedback — all in one smart platform.
          </Typography>
          <Button
            component={Link}
            to="/login"
            variant="contained"
            size="large"
            sx={{
              mt: 3,
              px: 5,
              py: 1.5,
              fontSize: '1rem',
              borderRadius: '30px',
              background: `linear-gradient(to right, ${theme.palette.primary.main}, #5c6bc0)`,
            }}
          >
            Get Started
          </Button>
        </Container>
      </Box>

      {/* Features Section */}
      <Container sx={{ py: 12 }}>
        <Typography variant="h4" align="center" fontWeight="bold" gutterBottom>
          What You Can Expect
        </Typography>
        <Typography variant="body1" align="center" color="textSecondary" paragraph sx={{ mb: 6 }}>
          Built for simplicity, speed, and student engagement.
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          <FeatureCard
            icon="🎟️"
            title="Effortless Registration"
            description="Students can register quickly with clear event details and instant confirmation."
          />
          <FeatureCard
            icon="📋"
            title="Club Admin Tools"
            description="Create and manage events, monitor attendance, and generate instant reports."
          />
          <FeatureCard
            icon="📊"
            title="Feedback Insights"
            description="Gather post-event feedback and turn responses into actionable insights."
          />
        </Grid>
      </Container>

      {/* Footer */}
      <Box sx={{ py: 4, textAlign: 'center', backgroundColor: '#f1f1f1' }}>
        <Typography variant="body2" color="textSecondary">
          © {new Date().getFullYear()} EventEase. All rights reserved.
        </Typography>
      </Box>
    </>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Paper
        elevation={4}
        sx={{
          p: 4,
          textAlign: 'center',
          borderRadius: '20px',
          transition: '0.3s',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: 6,
          },
        }}
      >
        <Typography variant="h2" component="div">{icon}</Typography>
        <Typography
          variant="h6"
          fontWeight="bold"
          gutterBottom
          sx={{ mt: 2 }}
          color="primary"
        >
          {title}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {description}
        </Typography>
      </Paper>
    </Grid>
  );
}
