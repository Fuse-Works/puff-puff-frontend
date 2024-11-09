// VerificationRequests.js
import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Button } from '@mui/material';
import axios from 'axios';
import Sidebar from './Sidebar';

const VerificationRequests = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from the API
  useEffect(() => {
    axios.get(`https://puff-puff-production.up.railway.app/api/v1/private/users`)
      .then((response) => {
        setData(response.data); // Store response data in state
        setLoading(false); // Stop the loading spinner
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false); // Stop loading in case of error
      });
  }, []);

  // Function to handle verification request
  const verifyUser = (userId) => {
    const formData = new FormData();
    formData.append('userId', userId);

    axios.put(`https://puff-puff-production.up.railway.app/api/v1/private/verify-account`, formData)
      .then(() => {
        // Update the user's verified status in the local state
        setData((prevData) =>
          prevData.map((user) =>
            user.id === userId ? { ...user, verified: true } : user
          )
        );
      })
      .catch((error) => {
        console.error('Error verifying user:', error);
      });
  };

  // If data is still loading, show a spinner
  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div style={{ display: 'flex', gap: '14px',}}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main content area */}
      <div style={{ flex: 1, padding: '20px', overflowX: 'auto' }}>
        <h2>Verification Requests</h2>
        
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="verification requests table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Full Name</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>QR Code</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Balance</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Puff Points</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Verified</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Update Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.fullName}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.qrCode}</TableCell>
                  <TableCell>{user.balance}</TableCell>
                  <TableCell>{user.puffPoint}</TableCell>
                  <TableCell>{user.verified ? 'Yes' : 'No'}</TableCell>
                  <TableCell>
                    {user.verified ? (
                      <Button variant="contained" color="success" disabled>
                        Verified
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => verifyUser(user.id)}
                      >
                        Verify User
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default VerificationRequests;
