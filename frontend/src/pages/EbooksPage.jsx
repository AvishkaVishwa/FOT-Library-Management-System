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

// Import PDFs from public/books folder
const EnvironmentalTechPDF = `${process.env.PUBLIC_URL}/books/data_acquisition_systems.pdf`;
const AgriculturePDF = `${process.env.PUBLIC_URL}/books/digital_filters_reading_material.pdf`;
const IctPDF = `${process.env.PUBLIC_URL}/books/lecture_11.pdf`;
const AutomationPDF = `${process.env.PUBLIC_URL}/books/electrical_electronic_measurements.pdf`;

const EBooksPage = () => {
  // Static e-books data
  const sampleEBooks = [
    {
      name: "Data Acquisition Systems",
      department: "Instrumentation and Automation Technology",
      bookUrl: EnvironmentalTechPDF,
      description: "A comprehensive guide on Data Acquisition Systems.",
    },
    {
      name: "Introduction to Digital Filters",
      department: "Instrumentation and Automation Technology",
      bookUrl: AgriculturePDF,
      description: "Explore about Digital Filters.",
    },
    {
      name: "Forward Kinematics",
      department: "Instrumentation and Automation Technology",
      bookUrl: IctPDF,
      description: "Fundamentals of Robotics.",
    },
    {
      name: "Sensors and Transducers",
      department: "Instrumentation and Automation Technology",
      bookUrl: AutomationPDF,
      description: "Understanding the basics of Sensors and Transducers.",
    },
  ];

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredEBooks, setFilteredEBooks] = useState(sampleEBooks);

  // Handle search input
  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredEBooks(
      sampleEBooks.filter((book) =>
        book.name.toLowerCase().includes(query)
      )
    );
  };

  // Handle READ button click (Opens the book)
  const handleRead = (bookUrl) => {
    if (bookUrl) {
      window.open(bookUrl, '_blank');
    } else {
      toast.error("File not found. Please check the file path.");
    }
  };

  // Handle DOWNLOAD button click (Ensures file exists before downloading)
  const handleDownload = async (bookUrl, bookName) => {
    try {
      const response = await fetch(bookUrl, { method: 'HEAD' });
      if (response.ok) {
        const link = document.createElement('a');
        link.href = bookUrl;
        link.setAttribute('download', `${bookName}.pdf`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast.success(`${bookName} downloaded successfully!`);
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
            E-Books
          </Typography>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search e-books..."
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
          E-Books Collection
        </Typography>

        <Divider sx={{ marginBottom: 3 }} />

        <Grid container spacing={3} justifyContent="center">
          {filteredEBooks.length > 0 ? (
            filteredEBooks.map((book, index) => (
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
                      {book.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ marginBottom: 2, flexGrow: 1 }}>
                      {book.description}
                    </Typography>
                    <Box display="flex" justifyContent="center" gap={1}>
                      <Button variant="contained" color="primary" size="small" onClick={() => handleRead(book.bookUrl)}>
                        Read
                      </Button>
                      <Button variant="outlined" color="secondary" size="small" onClick={() => handleDownload(book.bookUrl, book.name)}>
                        Download
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography variant="h6" color="error" align="center">
              No matching e-books found.
            </Typography>
          )}
        </Grid>
      </Container>

      <ToastContainer position="bottom-right" />
    </Box>
  );
};

export default EBooksPage;
