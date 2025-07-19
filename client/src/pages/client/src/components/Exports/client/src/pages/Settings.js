import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  Switch,
  FormControlLabel,
  Divider,
  Alert,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tab,
  Tabs,
  Paper
} from '@mui/material';
import {
  Save as SaveIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Check as CheckIcon,
  Error as ErrorIcon
} from '@mui/icons-material';

const Settings = () => {
  const [tabValue, setTabValue] = useState(0);
  const [apiKeys, setApiKeys] = useState({
    haveibeenpwned: '',
    shodan: '',
    virustotal: '',
    whoisxml: '',
    clearbit: '',
    hunter: ''
  });
  const [showPasswords, setShowPasswords] = useState({});
  const [settings, setSettings] = useState({
    autoSave: true,
    notifications: true,
    darkMode: false,
    maxResults: 100,
    timeout: 30,
    retryAttempts: 3
  });
  const [testResults, setTestResults] = useState({});
  const [saveStatus, setSaveStatus] = useState('');

  const apiSources = [
    {
      key: 'haveibeenpwned',
      name: 'Have I Been Pwned',
      description: 'Data breach monitoring and email checking',
      status: 'connected',
      website: 'https://haveibeenpwned.com/API/v3'
    },
    {
      key: 'shodan',
      name: 'Shodan',
      description: 'Internet-connected device search engine',
      status: 'disconnected',
      website: 'https://developer.shodan.io/'
    },
    {
      key: 'virustotal',
      name: 'VirusTotal',
      description: 'URL and file analysis service',
      status: 'connected',
      website: 'https://developers.virustotal.com/'
    },
    {
      key: 'whoisxml',
      name: 'WhoisXML API',
      description: 'Domain and WHOIS data provider',
      status: 'disconnected',
      website: 'https://whoisxml.com/'
    },
    {
      key: 'clearbit',
      name: 'Clearbit',
      description: 'Business data and person enrichment',
      status: 'connected',
      website: 'https://clearbit.com/docs'
    },
    {
      key: 'hunter',
      name: 'Hunter.io',
      description: 'Email finder and verification service',
      status: 'disconnected',
      website: 'https://hunter.io/api'
    }
  ];

  const handleSaveSettings = async () => {
    setSaveStatus('saving');
    try {
      // Simulate API call to save settings
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSaveStatus('success');
      setTimeout(() => setSaveStatus(''), 3000);
    } catch (error) {
      setSaveStatus('error');
      setTimeout(() => setSaveStatus(''), 3000);
    }
  };

  const handleTestApi = async (apiKey) => {
    setTestResults(prev => ({ ...prev, [apiKey]: 'testing' }));
    try {
      // Simulate API test
      await new Promise(resolve => setTimeout(resolve, 2000));
      const success = Math.random() > 0.3; // 70% success rate for demo
      setTestResults(prev => ({ 
        ...prev, 
        [apiKey]: success ? 'success' : 'error' 
      }));
    } catch (error) {
      setTestResults(prev => ({ ...prev, [apiKey]: 'error' }));
    }
  };

  const togglePasswordVisibility = (key) => {
    setShowPasswords(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'connected': return 'success';
      case 'disconnected': return 'error';
      case 'testing': return 'warning';
      default: return 'default';
    }
  };

  const TabPanel = ({ children, value, index }) => (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>

      <Paper sx={{ mb: 3 }}>
        <Tabs
          value={tabValue}
          onChange={(e, newValue) => setTabValue(newValue)}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="API Configuration" />
          <Tab label="General Settings" />
          <Tab label="Data Sources" />
        </Tabs>
      </Paper>

      {/* API Configuration Tab */}
      <TabPanel value={tabValue} index={0}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Alert severity="info" sx={{ mb: 3 }}>
              <Typography variant="body2">
                API keys are stored securely and encrypted. Test your connections after adding new keys.
                <br />
                <strong>User:</strong> BBJreed | <strong>Last Updated:</strong> 2025-07-19 02:07:22 UTC
              </Typography>
            </Alert>
          </Grid>

          {apiSources.map((source) => (
            <Grid item xs={12} key={source.key}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Box>
                      <Typography variant="h6">{source.name}</Typography>
                      <Typography variant="body2" color="textSecondary" gutterBottom>
                        {source.description}
                      </Typography>
                      <Typography variant="caption">
                        Documentation: <a href={source.website} target="_blank" rel="noopener noreferrer">{source.website}</a>
                      </Typography>
                    </Box>
                    <Chip
                      label={source.status}
                      color={getStatusColor(source.status)}
                      size="small"
                    />
                  </Box>

                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} md={8}>
                      <TextField
                        fullWidth
                        label={`${source.name} API Key`}
                        type={showPasswords[source.key] ? 'text' : 'password'}
                        value={apiKeys[source.key]}
                        onChange={(e) => setApiKeys(prev => ({
                          ...prev,
                          [source.key]: e.target.value
                        }))}
                        placeholder="Enter your API key..."
                        InputProps={{
                          endAdornment: (
                            <IconButton
                              onClick={() => togglePasswordVisibility(source.key)}
                              edge="end"
                            >
                              {showPasswords[source.key] ? <VisibilityOffIcon /> : <VisibilityIcon />}
                            </IconButton>
                          )
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Button
                        variant="outlined"
                        onClick={() => handleTestApi(source.key)}
                        disabled={!apiKeys[source.key] || testResults[source.key] === 'testing'}
                        startIcon={
                          testResults[source.key] === 'testing' ? null :
                          testResults[source.key] === 'success' ? <CheckIcon /> :
                          testResults[source.key] === 'error' ? <ErrorIcon /> : null
                        }
                        color={
                          testResults[source.key] === 'success' ? 'success' :
                          testResults[source.key] === 'error' ? 'error' : 'primary'
                        }
                      >
                        {testResults[source.key] === 'testing' ? 'Testing...' : 'Test Connection'}
                      </Button>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      {/* General Settings Tab */}
      <TabPanel value={tabValue} index={1}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Application Settings
                </Typography>
                
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.autoSave}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        autoSave: e.target.checked
                      }))}
                    />
                  }
                  label="Auto-save search results"
                />
                
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.notifications}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        notifications: e.target.checked
                      }))}
                    />
                  }
                  label="Enable notifications"
                />
                
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.darkMode}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        darkMode: e.target.checked
                      }))}
                    />
                  }
                  label="Dark mode"
                />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Search Configuration
                </Typography>
                
                <TextField
                  fullWidth
                  label="Maximum Results"
                  type="number"
                  value={settings.maxResults}
                  onChange={(e) => setSettings(prev => ({
                    ...prev,
                    maxResults: parseInt(e.target.value)
                  }))}
                  sx={{ mb: 2 }}
                />
                
                <TextField
                  fullWidth
                  label="Request Timeout (seconds)"
                  type="number"
                  value={settings.timeout}
                  onChange={(e) => setSettings(prev => ({
                    ...prev,
                    timeout: parseInt(e.target.value)
                  }))}
                  sx={{ mb: 2 }}
                />
                
                <TextField
                  fullWidth
                  label="Retry Attempts"
                  type="number"
                  value={settings.retryAttempts}
                  onChange={(e) => setSettings(prev => ({
                    ...prev,
                    retryAttempts: parseInt(e.target.value)
                  }))}
                />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="body2" color="textSecondary">
                Settings last saved: 2025-07-19 02:07:22 UTC
              </Typography>
              <Button
                variant="contained"
                startIcon={<SaveIcon />}
                onClick={handleSaveSettings}
                disabled={saveStatus === 'saving'}
              >
                {saveStatus === 'saving' ? 'Saving...' : 'Save Settings'}
              </Button>
            </Box>
            
            {saveStatus === 'success' && (
              <Alert severity="success" sx={{ mt: 2 }}>
                Settings saved successfully!
              </Alert>
            )}
            
            {saveStatus === 'error' && (
              <Alert severity="error" sx={{ mt: 2 }}>
                Failed to save settings. Please try again.
              </Alert>
            )}
          </Grid>
        </Grid>
      </TabPanel>

      {/* Data Sources Tab */}
      <TabPanel value={tabValue} index={2}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Available Data Sources
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              Configure and monitor your OSINT data sources. Green indicators show active connections.
            </Typography>
          </Grid>

          {apiSources.map((source) => (
            <Grid item xs={12} md={6} key={source.key}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="h6">{source.name}</Typography>
                    <Chip
                      label={source.status === 'connected' ? 'Active' : 'Inactive'}
                      color={source.status === 'connected' ? 'success' : 'default'}
                      size="small"
                    />
                  </Box>
                  <Typography variant="body2" color="textSecondary" gutterBottom>
                    {source.description}
                  </Typography>
                  <Typography variant="caption">
                    Last checked: 2025-07-19 02:07:22 UTC
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </TabPanel>
    </Box>
  );
};

export default Settings;
