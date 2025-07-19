import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  Chip,
  Alert,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
  Divider
} from '@mui/material';
import {
  Search as SearchIcon,
  Email as EmailIcon,
  ExpandMore as ExpandMoreIcon,
  Security as SecurityIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon
} from '@mui/icons-material';

const EmailInvestigation = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);

  const handleSearch = async () => {
    setLoading(true);
    try {
      // Simulate API call
      setTimeout(() => {
        setResults({
          email: email,
          valid: true,
          deliverable: true,
          breaches: [
            {
              name: 'LinkedIn',
              date: '2021-06-01',
              description: 'Professional network breach affecting 700M users',
              severity: 'High',
              dataClasses: ['Email addresses', 'Full names', 'Phone numbers']
            },
            {
              name: 'Adobe',
              date: '2013-10-01',
              description: 'Creative software company breach',
              severity: 'Medium',
              dataClasses: ['Email addresses', 'Passwords', 'Usernames']
            }
          ],
          socialMedia: [
            { platform: 'Twitter', found: true, username: 'user123' },
            { platform: 'Facebook', found: true, username: 'john.doe.123' },
            { platform: 'Instagram', found: false, username: null },
            { platform: 'LinkedIn', found: true, username: 'johndoe' }
          ],
          domainInfo: {
            domain: 'gmail.com',
            registrar: 'Google Inc.',
            created: '2005-01-15',
            type: 'Personal Email Provider'
          },
          reputation: {
            score: 75,
            status: 'Good',
            spamLists: 0,
            malwareDetected: false
          }
        });
        setLoading(false);
      }, 2000);
    } catch (error) {
      setLoading(false);
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity.toLowerCase()) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'info';
      default: return 'default';
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Email Investigation
      </Typography>
      
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Email Analysis
          </Typography>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={8}>
              <TextField
                fullWidth
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="user@example.com"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Button
                variant="contained"
                fullWidth
                startIcon={loading ? <CircularProgress size={20} /> : <SearchIcon />}
                onClick={handleSearch}
                disabled={loading || !email}
              >
                {loading ? 'Analyzing...' : 'Investigate'}
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {results && (
        <Grid container spacing={3}>
          {/* Email Validation */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  <EmailIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                  Email Validation
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Chip
                    icon={results.valid ? <CheckCircleIcon /> : <ErrorIcon />}
                    label={results.valid ? 'Valid Format' : 'Invalid Format'}
                    color={results.valid ? 'success' : 'error'}
                    sx={{ mr: 1, mb: 1 }}
                  />
                  <Chip
                    icon={results.deliverable ? <CheckCircleIcon /> : <ErrorIcon />}
                    label={results.deliverable ? 'Deliverable' : 'Undeliverable'}
                    color={results.deliverable ? 'success' : 'error'}
                    sx={{ mb: 1 }}
                  />
                </Box>
                <Typography variant="body2" color="textSecondary">
                  Email: {results.email}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Reputation Score */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  <SecurityIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                  Reputation Score
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h4" sx={{ mr: 2 }}>
                    {results.reputation.score}/100
                  </Typography>
                  <Chip
                    label={results.reputation.status}
                    color={results.reputation.score > 70 ? 'success' : results.reputation.score > 40 ? 'warning' : 'error'}
                  />
                </Box>
                <Typography variant="body2">
                  Spam Lists: {results.reputation.spamLists}
                </Typography>
                <Typography variant="body2">
                  Malware: {results.reputation.malwareDetected ? 'Detected' : 'None'}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Data Breaches */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  <WarningIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                  Data Breaches ({results.breaches.length} found)
                </Typography>
                {results.breaches.length > 0 ? (
                  <TableContainer component={Paper} variant="outlined">
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Service</TableCell>
                          <TableCell>Date</TableCell>
                          <TableCell>Severity</TableCell>
                          <TableCell>Data Compromised</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {results.breaches.map((breach, index) => (
                          <TableRow key={index}>
                            <TableCell>
                              <Typography variant="body2" fontWeight="bold">
                                {breach.name}
                              </Typography>
                              <Typography variant="caption" color="textSecondary">
                                {breach.description}
                              </Typography>
                            </TableCell>
                            <TableCell>{new Date(breach.date).toLocaleDateString()}</TableCell>
                            <TableCell>
                              <Chip
                                label={breach.severity}
                                color={getSeverityColor(breach.severity)}
                                size="small"
                              />
                            </TableCell>
                            <TableCell>
                              {breach.dataClasses.map((dataClass, i) => (
                                <Chip
                                  key={i}
                                  label={dataClass}
                                  size="small"
                                  variant="outlined"
                                  sx={{ mr: 0.5, mb: 0.5 }}
                                />
                              ))}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                ) : (
                  <Alert severity="success">No known data breaches found for this email.</Alert>
                )}
              </CardContent>
            </Card>
          </Grid>

          {/* Social Media Presence */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Social Media Accounts
                </Typography>
                <List>
                  {results.socialMedia.map((social, index) => (
                    <React.Fragment key={index}>
                      <ListItem>
                        <ListItemText
                          primary={social.platform}
                          secondary={
                            social.found
                              ? `Found: ${social.username}`
                              : 'Not found'
                          }
                        />
                        <Chip
                          label={social.found ? 'Found' : 'Not Found'}
                          color={social.found ? 'success' : 'default'}
                          size="small"
                        />
                      </ListItem>
                      {index < results.socialMedia.length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>

          {/* Domain Information */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Domain Information
                </Typography>
                <Typography variant="body2" gutterBottom>
                  <strong>Domain:</strong> {results.domainInfo.domain}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  <strong>Type:</strong> {results.domainInfo.type}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  <strong>Registrar:</strong> {results.domainInfo.registrar}
                </Typography>
                <Typography variant="body2">
                  <strong>Created:</strong> {new Date(results.domainInfo.created).toLocaleDateString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default EmailInvestigation;
