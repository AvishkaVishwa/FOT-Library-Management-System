import React, { useState } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Container,
  Box,
  Toolbar,
  AppBar,
  Button,
  TextField,
  InputAdornment,
  Divider,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Ensure filenames match exactly in the `public/papers/` folder
const Paper1 = `${process.env.PUBLIC_URL}/papers/instrumentation_2022.pdf`;
const Paper2 = `${process.env.PUBLIC_URL}/papers/automation_2021.pdf`;
const Paper3 = `${process.env.PUBLIC_URL}/papers/robotics_2020.pdf`;
const Paper4 = `${process.env.PUBLIC_URL}/papers/sensors_2019.pdf`;

const PastPapersPage = () => {
  // Static past papers data
  const samplePapers = [
    {
      name: "Instrumentation Past Paper - 2022",
      department: "Instrumentation and Automation Technology",
      bookUrl: Paper1,
      description: "Instrumentation final exam paper from 2022.",
    },
    {
      name: "Automation Past Paper - 2021",
      department: "Instrumentation and Automation Technology",
      bookUrl: Paper2,
      description: "Automation final exam paper from 2021.",
    },
    {
      name: "Robotics Past Paper - 2020",
      department: "Instrumentation and Automation Technology",
      bookUrl: Paper3,
      description: "Robotics final exam paper from 2020.",
    },
    {
      name: "Sensors & Transducers Past Paper - 2019",
      department: "Instrumentation and Automation Technology",
      bookUrl: Paper4,
      description: "Final exam paper on Sensors and Transducers from 2019.",
    },
  ];

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPapers, setFilteredPapers] = useState(samplePapers);

  // Handle search input
  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredPapers(
      samplePapers.filter((paper) =>
        paper.name.toLowerCase().includes(query)
      )
    );
  };

  // Handle READ button click (Opens the paper)
  const handleRead = (paperUrl) => {
    if (paperUrl) {
      window.open(paperUrl, '_blank');
    } else {
      toast.error("File not found. Please check the file path.");
    }
  };

  // Handle DOWNLOAD button click (Ensures file exists before downloading)
  const handleDownload = async (paperUrl, paperName) => {
    try {
      const response = await fetch(paperUrl, { method: 'HEAD' });
      if (response.ok) {
        const link = document.createElement('a');
        link.href = paperUrl;
        link.setAttribute('download', `${paperName}.pdf`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast.success(`${paperName} downloaded successfully!`);
      } else {
        throw new Error('File not accessible');
      }
    } catch (error) {
      console.error("Download Error:", error);
      toast.error("File not found. Please check the file path.");
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', bgcolor: '#f4f4f4' }}>
      {/* Navbar */}
      <AppBar position="sticky" sx={{ padding: '0.5rem', boxShadow: 4, bgcolor: '#1976d2' }}>
        <Toolbar>
          <Typography variant="h6" color="inherit" sx={{ flexGrow: 1 }}>
            Past Papers
          </Typography>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search past papers..."
            value={searchQuery}
            onChange={handleSearch}
            sx={{ backgroundColor: 'white', borderRadius: 1 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Toolbar>
      </AppBar>

      <Container sx={{ paddingY: 4 }}>
        <Typography
          variant="h4"
          align="center"
          sx={{ fontWeight: 'bold', marginBottom: 3, color: '#333' }}
        >
          Past Papers Collection
        </Typography>

        <Divider sx={{ marginBottom: 3 }} />

        <Grid container spacing={3} justifyContent="center">
          {filteredPapers.length > 0 ? (
            filteredPapers.map((paper, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card
                  sx={{
                    boxShadow: 3,
                    padding: 2,
                    borderRadius: 2,
                    transition: 'transform 0.2s ease-in-out',
                    '&:hover': { transform: 'scale(1.05)' },
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    minHeight: 250, // Ensures equal height for all cards
                  }}
                >
                  <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <Typography variant="h6" fontWeight="bold">
                      {paper.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ marginBottom: 2, flexGrow: 1 }}>
                      {paper.description}
                    </Typography>
                    <Box display="flex" justifyContent="center" gap={1}>
                      <Button variant="contained" color="primary" size="small" onClick={() => handleRead(paper.bookUrl)}>
                        Read
                      </Button>
                      <Button variant="outlined" color="secondary" size="small" onClick={() => handleDownload(paper.bookUrl, paper.name)}>
                        Download
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography variant="h6" color="error" align="center">
              No matching past papers found.
            </Typography>
          )}
        </Grid>
      </Container>

      <ToastContainer position="bottom-right" />
    </Box>
  );
};

export default PastPapersPage;
