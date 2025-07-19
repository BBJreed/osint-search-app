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
  Alert
} from '@mui/material';
import {
  Search as SearchIcon,
  Language as DomainIcon,
  ExpandMore as ExpandMoreIcon,
  Security as SecurityIcon,
  Dns as DnsIcon,
  Public as PublicIcon
} from '@mui/icons-material';

const DomainAnalysis = () => {
  const [domain, setDomain] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);

  const handleSearch = async () => {
    setLoading(true);
    try {
      // Simulate API call
      setTimeout(() => {
        setResults({
          domain: domain,
          whoisData: {
            registrar: 'Example Registrar Inc.',
            registrationDate: '2020-01-15',
            expirationDate: '2025-01-15',
            nameServers: ['ns1.example.com', 'ns2.example.com'],
            registrantOrg: 'Example Corporation',
            registrantCountry: 'United States',
            status: ['clientTransferProhibited', 'clientUpdateProhibited']
          },
          dnsRecords: [
            { type: 'A', name: domain, value: '93.184.216.34', ttl: 3600 },
            { type: 'AAAA', name: domain, value: '2606:2800:220:1:248:1893:25c8:1946', ttl: 3600 },
            { type: 'MX', name: domain, value: '10 mail.example.com', ttl: 3600 },
            { type: 'TXT', name: domain, value: 'v=spf1 include:_spf.example.com ~all', ttl: 3600 },
            { type: 'CNAME', name: 'www.' + domain, value: domain, ttl: 3600 }
          ],
          subdomains: [
            { subdomain: 'www.' + domain, ip: '93.184.216.34', status: 'Active' },
            { subdomain: 'mail.' + domain, ip: '93.184.216.35', status: 'Active' },
            { subdomain: 'ftp.' + domain, ip: '93.184.216.36', status: 'Active' },
            { subdomain: 'test.' + domain, ip: '93.184.216.37', status: 'Inactive' },
            { subdomain: 'dev.' + domain, ip: '93.184.216.38', status: 'Active' }
          ],
          sslInfo: {
            valid: true,
            issuer: 'DigiCert Inc',
            validFrom: '2024-01-01',
            validTo: '2025-01-01',
            algorithm: 'SHA256withRSA',
            keySize: 2048
          },
          securityHeaders: {
            hsts: true,
            contentSecurityPolicy: true,
            xFrameOptions: true,
            xContentTypeOptions: true,
            referrerPolicy: true
          },
          technologies: [
            { name: 'Apache', version: '2.4.41', category: 'Web Server' },
            { name: 'PHP', version: '7.4.3', category: 'Programming Language' },
            { name: 'MySQL', version: '8.0.25', category: 'Database' },
            { name: 'jQuery', version: '3.6.0', category: 'JavaScript Library' }
          ]
        });
        setLoading(false);
      }, 2500);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Domain Analysis
      </Typography>
      
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Domain Investigation
          </Typography>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={8}>
              <TextField
                fullWidth
                label="Domain Name"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                placeholder="example.com"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Button
                variant="contained"
                fullWidth
                startIcon={loading ? <CircularProgress size={20} /> : <SearchIcon />}
                onClick={handleSearch}
                disabled={loading || !domain}
              >
                {loading ? 'Analyzing...' : 'Analyze Domain'}
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {results && (
        <Grid container spacing={3}>
          {/* WHOIS Information */}
          <Grid item xs={12}>
            <Accordion defaultExpanded>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6">
                  <DomainIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                  WHOIS Information
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="body2" gutterBottom>
                      <strong>Domain:</strong> {results.domain}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      <strong>Registrar:</strong> {results.whoisData.registrar}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      <strong>Registrant:</strong> {results.whoisData.registrantOrg}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      <strong>Country:</strong> {results.whoisData.registrantCountry}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="body2" gutterBottom>
                      <strong>Registered:</strong> {new Date(results.whoisData.registrationDate).toLocaleDateString()}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      <strong>Expires:</strong> {new Date(results.whoisData.expirationDate).toLocaleDateString()}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      <strong>Name Servers:</strong>
                    </Typography>
                    {results.whoisData.nameServers.map((ns, index) => (
                      <Typography key={index} variant="body2" sx={{ ml: 2 }}>
                        • {ns}
                      </Typography>
                    ))}
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
          </Grid>

          {/* DNS Records */}
          <Grid item xs={12}>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6">
                  <DnsIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                  DNS Records
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <TableContainer component={Paper} variant="outlined">
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Type</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Value</TableCell>
                        <TableCell>TTL</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {results.dnsRecords.map((record, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <Chip label={record.type} size="small" />
                          </TableCell>
                          <TableCell>{record.name}</TableCell>
                          <TableCell sx={{ fontFamily: 'monospace', fontSize: '0.875rem' }}>
                            {record.value}
                          </TableCell>
                          <TableCell>{record.ttl}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </AccordionDetails>
            </Accordion>
          </Grid>

          {/* Subdomains */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  <PublicIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                  Discovered Subdomains
                </Typography>
                <List>
                  {results.subdomains.map((sub, index) => (
                    <ListItem key={index}>
                      <ListItemText
                        primary={sub.subdomain}
                        secondary={`IP: ${sub.ip}`}
                      />
                      <Chip
                        label={sub.status}
                        color={sub.status === 'Active' ? 'success' : 'default'}
                        size="small"
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>

          {/* SSL Certificate */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  <SecurityIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                  SSL Certificate
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Chip
                    label={results.sslInfo.valid ? 'Valid Certificate' : 'Invalid Certificate'}
                    color={results.sslInfo.valid ? 'success' : 'error'}
                    sx={{ mb: 1 }}
                  />
                </Box>
                <Typography variant="body2" gutterBottom>
                  <strong>Issuer:</strong> {results.sslInfo.issuer}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  <strong>Valid From:</strong> {new Date(results.sslInfo.validFrom).toLocaleDateString()}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  <strong>Valid To:</strong> {new Date(results.sslInfo.validTo).toLocaleDateString()}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  <strong>Algorithm:</strong> {results.sslInfo.algorithm}
                </Typography>
                <Typography variant="body2">
                  <strong>Key Size:</strong> {results.sslInfo.keySize} bits
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Security Headers */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Security Headers
                </Typography>
                <Grid container spacing={1}>
                  {Object.entries(results.securityHeaders).map(([header, present]) => (
                    <Grid item xs={12} key={header}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
                          {header.replace(/([A-Z])/g, ' $1').trim()}
                        </Typography>
                        <Chip
                          label={present ? 'Present' : 'Missing'}
                          color={present ? 'success' : 'warning'}
                          size="small"
                        />
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Technologies */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Detected Technologies
                </Typography>
                <List>
                  {results.technologies.map((tech, index) => (
                    <ListItem key={index}>
                      <ListItemText
                        primary={`${tech.name} ${tech.version}`}
                        secondary={tech.category}
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default DomainAnalysis;
