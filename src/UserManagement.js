import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import axios from 'axios';
import SkeletonTable from './SkeletonTable';
import BatteryCharging50Icon from '@mui/icons-material/BatteryCharging50';
import VerifiedIcon from '@mui/icons-material/Verified';

const VerificationRequests = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    qrCode: '',
    amount: '',
  });

  // Fetch data from the API
  useEffect(() => {
    axios
      .get('https://puff-puff-production.up.railway.app/api/v1/private/users')
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  // Handle dialog open and form data prefill
  const handleRechargeClick = (qrCode) => {
    setFormData({ qrCode, amount: '' }); // Prefill qrCode and clear amount
    setDialogOpen(true);
  };

  // Handle form input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle recharge submission
  const handleSubmit = () => {
    // Retrieve the access_token from localStorage
    const accessToken = localStorage.getItem('access_token');

    if (!accessToken) {
      console.error('Access token is missing or expired');
      return;
    }

    // Add the Authorization header with Bearer token to the request
    axios
      .post(
        'https://puff-puff-production.up.railway.app/api/v1/private/agent/top-up',
        formData,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`, // Include the token in the Authorization header
            'Content-Type': 'application/json', // Ensure JSON is sent if needed
          },
        }
      )
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          setDialogOpen(false);
          // Reload the current page
          window.location.reload();
        }
      })
      .catch((error) => {
        console.error('Error processing recharge:', error);
      });
  };

  // Function to handle user verification
  const verifyUser = (userId) => {
    const formData = new FormData();
    formData.append('userId', userId);

    axios
      .put('https://puff-puff-production.up.railway.app/api/v1/private/verify-account', formData)
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

  return (
    <div style={{ flex: 1, padding: '20px', overflowX: 'auto' }}>
      <h2>User Management</h2>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="verification requests table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Full Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Email</TableCell>
              <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>QR Code</TableCell>
              <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Balance</TableCell>
              <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Puff Points</TableCell>
              <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Update Status</TableCell>
              <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <SkeletonTable columns={8} rows={10} />
            ) : (
              data.map((user) => (
                <TableRow key={user.id}>
                  <TableCell sx={{ textAlign: 'center' }}>{user.fullName}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>{user.email}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>{user.qrCode}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>{user.balance}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>{user.puffPoint}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>
                    {user.verified ? (
                      <Button
                        variant="contained"
                        color="success"
                        size="small" // Compact button
                        disabled
                        sx={{ minWidth: '120px' }} // Ensure consistent width
                      >
                        <VerifiedIcon></VerifiedIcon>
                        Verified
                      </Button>
                    ) : (
                      <Button
                        variant="outlined"
                       color="secondary"
                        size="small" // Compact button
                        sx={{ minWidth: '120px' }} // Ensure consistent width
                        onClick={() => verifyUser(user.id)}
                      >
                        Verify User
                      </Button>
                    )}
                  </TableCell>

                  <TableCell sx={{ textAlign: 'center' }}>
                    <Button
                      variant="outlined"
                      color="success"
                      size="small" // Compact button
                      onClick={() => handleRechargeClick(user.qrCode)}
                    >
                      <BatteryCharging50Icon></BatteryCharging50Icon>
                      Recharge
                    </Button>
                  </TableCell>

                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Recharge Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Recharge</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="QR Code"
            type="text"
            fullWidth
            name="qrCode"
            value={formData.qrCode}
            onChange={handleInputChange}
            disabled
          />
          <TextField
            margin="dense"
            label="Amount"
            type="number"
            fullWidth
            name="amount"
            value={formData.amount}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary" variant="contained">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default VerificationRequests;
