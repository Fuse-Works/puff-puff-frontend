import React, { useEffect, useState } from 'react';
import { Grid, Card, CardContent, Typography, CircularProgress, CardActions, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import axios from 'axios';
import Sidebar from './Sidebar';

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState('');

  useEffect(() => {
    axios.get('https://puff-puff-production.up.railway.app/api/v1/private/admin/dashboard')
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching dashboard data:', error);
        setLoading(false);
      });
  }, []);

  

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setAmount('');
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleSubmit = async () => {
    try {
        const formData = new FormData();
        formData.append('amount', amount);

        await axios.post('https://puff-puff-production.up.railway.app/api/v1/private/cash-collection', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        // Update the collected cash amount in the data and close the dialog
        setData((prevData) => ({
            ...prevData, 
            collectedCash: parseFloat(prevData.collectedCash) + parseFloat(amount),
        }));
        
        setOpen(false);
    } catch (error) {
        console.error('Error updating cash collection:', error);
    }
};


  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div style={{ flex: 1, padding: '20px', overflowX: 'auto' }}>
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>
        <Grid container spacing={3}>
          {/* Card for Total Purchase Quantity */}
          <Grid item xs={12} sm={6} md={6}>
            <Card sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography variant="h6" component="div">
                  Total Purchase Quantity
                </Typography>
                <Typography variant="h4" color="primary">
                  {data.totalPurchaseQuantity} Pieces
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Card for Total Purchase Amount */}
          <Grid item xs={12} sm={6} md={6}>
            <Card sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography variant="h6" component="div">
                  Total Purchase Amount
                </Typography>
                <Typography variant="h4" color="primary">
                  {data.totalPurchaseAmount} Taka
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Card for Total Top Up Amount */}
          <Grid item xs={12} sm={6} md={6}>
            <Card sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography variant="h6" component="div">
                  Total Top Up Amount
                </Typography>
                <Typography variant="h4" color="primary">
                  {data.totalTopUpAmount} Taka
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Card for Total Top Up Count */}
          <Grid item xs={12} sm={6} md={6}>
            <Card sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography variant="h6" component="div">
                  Total Top Up Count
                </Typography>
                <Typography variant="h4" color="primary">
                  {data.totalTopUpCount} Times
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Card for Collected Cash Amount */}
          <Grid item xs={12} sm={6} md={6}>
            <Card sx={{ minWidth: 275, position: 'relative' }}>
              <CardContent>
                <Typography variant="h6" component="div">
                  Collected Cash Amount
                </Typography>
                <Typography variant="h4" color="primary">
                  {data.collectedCash} Taka
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'flex-end' }}>
                <Button variant="contained" color="primary" onClick={handleClickOpen}>
                  Update Amount
                </Button>
              </CardActions>
            </Card>
          </Grid>

          {/* Dialog for Cash Collection Update */}
          <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="sm"  // Adjust to "md" or "lg" for a larger dialog
            fullWidth
          >
            <DialogTitle>Cash Collection</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="amount"
                label="Amount"
                type="number"
                fullWidth
                variant="outlined"
                value={amount}
                onChange={handleAmountChange}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="secondary">
                Cancel
              </Button>
              <Button onClick={handleSubmit} color="primary" variant="contained">
                Submit
              </Button>
            </DialogActions>
          </Dialog>


        </Grid>
      </div>
    </div>
  );
};

export default Dashboard;
