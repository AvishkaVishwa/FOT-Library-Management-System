import React from 'react';
import {
  Container,
  Typography,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  AppBar,
  Toolbar,
  Link,
  Divider,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ToastContainer } from 'react-toastify'; // ✅ Import ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // ✅ Import Toast styles

const HelpPage = () => {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'rgba(0, 0, 0, 0.5)', color: '#fff' }}>
      {/* Navbar */}
      <AppBar position="sticky" sx={{ bgcolor: '#1976d2', padding: '0.5rem' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Help Center
          </Typography>
          <Link href="/" color="inherit" underline="none" sx={{ marginRight: 2 }}>
            Home
          </Link>
        </Toolbar>
      </AppBar>

      {/* Header */}
      <Container sx={{ textAlign: 'center', paddingTop: 4 }}>
        <Typography variant="h3" fontWeight="bold">
          How Can We Help You?
        </Typography>
        <Typography variant="h6" sx={{ opacity: 0.8, marginBottom: 3 }}>
          Browse through the FAQs or contact us for further assistance.
        </Typography>
      </Container>

      <Divider sx={{ bgcolor: '#fff', marginBottom: 3 }} />

      {/* FAQ Section */}
      <Container sx={{ maxWidth: '700px', paddingBottom: 4 }}>
        <Typography variant="h4" align="center" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
          Frequently Asked Questions
        </Typography>

        <Accordion sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)', color: '#fff', marginBottom: 2 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: '#fff' }} />}>
            <Typography fontWeight="bold">How do I borrow a book?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Students need to visit the library in person to borrow a book. Once you select your desired book, the
              librarian will record your details in the system. You can borrow the book for two weeks. If needed, you
              can renew it for an additional two weeks before the due date.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)', color: '#fff', marginBottom: 2 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: '#fff' }} />}>
            <Typography fontWeight="bold">What happens if I return a book late?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>A fine of 10 LKR will be applied for each day past the due date.</Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)', color: '#fff', marginBottom: 2 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: '#fff' }} />}>
            <Typography fontWeight="bold">Can I renew a borrowed book?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>You can renew a book twice before its due date by meeting a librarian.</Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)', color: '#fff', marginBottom: 2 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: '#fff' }} />}>
            <Typography fontWeight="bold">How do I contact the librarian?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>You can use the contact details on the home page or visit the library during working hours.</Typography>
          </AccordionDetails>
        </Accordion>
      </Container>

      {/* Footer */}
      <Box sx={{ textAlign: 'center', opacity: 0.8, paddingY: 3 }}>
        <Typography variant="body2">&copy; 2024 Library Management System. All Rights Reserved.</Typography>
        <Box sx={{ marginTop: 1 }}>
          <Link href="/" color="inherit" underline="none" sx={{ marginRight: 2 }}>
            Home
          </Link>
          <Link href="/student-list" color="inherit" underline="none" sx={{ marginRight: 2 }}>
            Student List
          </Link>
          <Link href="/book-management" color="inherit" underline="none">
            Manage Books
          </Link>
        </Box>
      </Box>

      {/* ✅ Toast Notification Container */}
      <ToastContainer position="bottom-right" />
    </Box>
  );
};

export default HelpPage;
