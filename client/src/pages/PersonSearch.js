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
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  Alert,
  CircularProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import {
  Search as SearchIcon,
  Person as PersonIcon,
  ExpandMore as ExpandMoreIcon,
  LocationOn as LocationIcon,
  Work as WorkIcon,
  Email as EmailIcon,
  Phone as PhoneIcon
} from '@mui/icons-material';

const PersonSearch = () => {
  const [searchQuery, setSearchQuery] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: ''
  });
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);

  const handleSearch = async () => {
    setLoading(true);
    try {
      // Simulate API call
      setTimeout(() => {
        setResults({
          profiles: [
            {
              id: 1,
              name: `${searchQuery.firstName} ${searchQuery.lastName}`,
              email: 'john.doe@email.com',
              phone: '+1-555-0123',
              location: 'New York, NY',
              occupation: 'Software Engineer',
              company: 'Tech Corp',
              socialProfiles: [
                { platform: 'LinkedIn', url: 'linkedin.com/in/johndoe' },
                { platform: 'Twitter', url: 'twitter.com/johndoe' },
                { platform: 'Facebook', url: 'facebook.com/john.doe' }
              ],
              additionalInfo: {
                age: '32-35',
                education: 'Computer Science, MIT',
                relatives: ['Jane Doe', 'Robert Doe']
              }
            }
          ],
          confidence: 85
        });
        setLoading(false);
      }, 2000);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Person Search
      </Typography>
      
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Search Parameters
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="First Name"
                value={searchQuery.firstName}
                onChange={(e) => setSearchQuery({...searchQuery, firstName: e.target.value})}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Last Name"
                value={searchQuery.lastName}
                onChange={(e) => setSearchQuery({...searchQuery, lastName: e.target.value})}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                value={searchQuery.email}
                onChange={(e) => setSearchQuery({...searchQuery, email: e.target.value})}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone"
                value={searchQuery.phone}
                onChange={(e) => setSearchQuery({...searchQuery, phone: e.target.value})}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Location"
                value={searchQuery.location}
                onChange={(e) => setSearchQuery({...searchQuery, location: e.target.value})}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                startIcon={loading ? <CircularProgress size={20} /> : <SearchIcon />}
                onClick={handleSearch}
                disabled={loading || (!searchQuery.firstName && !searchQuery.lastName && !searchQuery.email)}
              >
                {loading ? 'Searching...' : 'Search'}
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {results && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Search Results
              <Chip 
                label={`${results.confidence}% Confidence`} 
                color="success" 
                size="small" 
                sx={{ ml: 2 }} 
              />
            </Typography>
            
            {results.profiles.map((profile) => (
              <Box key={profile.id} sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar sx={{ mr: 2 }}>
                    <PersonIcon />
                  </Avatar>
                  <Box>
                    <Typography variant="h6">{profile.name}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {profile.occupation} at {profile.company}
                    </Typography>
                  </Box>
                </Box>

                <Grid container spacing={2} sx={{ mb: 2 }}>
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <EmailIcon sx={{ mr: 1, fontSize: 20 }} />
                      <Typography variant="body2">{profile.email}</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <PhoneIcon sx={{ mr: 1, fontSize: 20 }} />
                      <Typography variant="body2">{profile.phone}</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <LocationIcon sx={{ mr: 1, fontSize: 20 }} />
                      <Typography variant="body2">{profile.location}</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <WorkIcon sx={{ mr: 1, fontSize: 20 }} />
                      <Typography variant="body2">Age: {profile.additionalInfo.age}</Typography>
                    </Box>
                  </Grid>
                </Grid>

                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Social Media Profiles</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <List>
                      {profile.socialProfiles.map((social, index) => (
                        <ListItem key={index}>
                          <ListItemText
                            primary={social.platform}
                            secondary={social.url}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </AccordionDetails>
                </Accordion>

                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Additional Information</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant="body2" gutterBottom>
                      <strong>Education:</strong> {profile.additionalInfo.education}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Known Relatives:</strong> {profile.additionalInfo.relatives.join(', ')}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </Box>
            ))}
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default PersonSearch;
