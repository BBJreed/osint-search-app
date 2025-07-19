import React, { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Grid,
  Typography,
  Chip
} from '@mui/material';
import {
  GetApp as ExportIcon,
  PictureAsPdf as PdfIcon,
  TableChart as CsvIcon,
  Code as JsonIcon
} from '@mui/icons-material';

const ExportResults = ({ data, searchType, open, onClose }) => {
  const [exportFormat, setExportFormat] = useState('pdf');
  const [includeMetadata, setIncludeMetadata] = useState(true);
  const [reportTitle, setReportTitle] = useState(`OSINT ${searchType} Report`);

  const handleExport = () => {
    const exportData = {
      title: reportTitle,
      generatedAt: new Date().toISOString(),
      searchType: searchType,
      includeMetadata: includeMetadata,
      data: data
    };

    switch (exportFormat) {
      case 'pdf':
        exportToPDF(exportData);
        break;
      case 'csv':
        exportToCSV(exportData);
        break;
      case 'json':
        exportToJSON(exportData);
        break;
      default:
        console.error('Unsupported export format');
    }
    
    onClose();
  };

  const exportToPDF = (data) => {
    // Simulate PDF generation
    const content = generateReportContent(data);
    const blob = new Blob([content], { type: 'application/pdf' });
    downloadFile(blob, `${data.title.replace(/\s+/g, '_')}.pdf`);
  };

  const exportToCSV = (data) => {
    const csvContent = convertToCSV(data);
    const blob = new Blob([csvContent], { type: 'text/csv' });
    downloadFile(blob, `${data.title.replace(/\s+/g, '_')}.csv`);
  };

  const exportToJSON = (data) => {
    const jsonContent = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json' });
    downloadFile(blob, `${data.title.replace(/\s+/g, '_')}.json`);
  };

  const generateReportContent = (data) => {
    return `
OSINT Investigation Report
==========================

Title: ${data.title}
Generated: ${new Date(data.generatedAt).toLocaleString()}
Search Type: ${data.searchType}

${JSON.stringify(data.data, null, 2)}
    `;
  };

  const convertToCSV = (data) => {
    // Simple CSV conversion - would need more sophisticated logic for real implementation
    const headers = Object.keys(data.data);
    const rows = headers.map(header => `${header},${JSON.stringify(data.data[header])}`);
    return `Title,${data.title}\nGenerated,${data.generatedAt}\n${rows.join('\n')}`;
  };

  const downloadFile = (blob, filename) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <ExportIcon sx={{ mr: 1 }} />
          Export Investigation Results
        </Box>
      </DialogTitle>
      
      <DialogContent>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Report Title"
              value={reportTitle}
              onChange={(e) => setReportTitle(e.target.value)}
              sx={{ mb: 2 }}
            />
          </Grid>

          <Grid item xs={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Export Format</FormLabel>
              <RadioGroup
                value={exportFormat}
                onChange={(e) => setExportFormat(e.target.value)}
                row
              >
                <FormControlLabel
                  value="pdf"
                  control={<Radio />}
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <PdfIcon sx={{ mr: 1 }} />
                      PDF Report
                    </Box>
                  }
                />
                <FormControlLabel
                  value="csv"
                  control={<Radio />}
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <CsvIcon sx={{ mr: 1 }} />
                      CSV Data
                    </Box>
                  }
                />
                <FormControlLabel
                  value="json"
                  control={<Radio />}
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <JsonIcon sx={{ mr: 1 }} />
                      JSON Raw Data
                    </Box>
                  }
                />
              </RadioGroup>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Export Preview
            </Typography>
            <Box sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
              <Typography variant="body2" gutterBottom>
                <strong>Title:</strong> {reportTitle}
              </Typography>
              <Typography variant="body2" gutterBottom>
                <strong>Format:</strong> <Chip label={exportFormat.toUpperCase()} size="small" />
              </Typography>
              <Typography variant="body2" gutterBottom>
                <strong>Generated:</strong> {new Date().toLocaleString()}
              </Typography>
              <Typography variant="body2">
                <strong>Search Type:</strong> {searchType}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
      
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button 
          variant="contained" 
          onClick={handleExport}
          startIcon={<ExportIcon />}
        >
          Export {exportFormat.toUpperCase()}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ExportResults;
