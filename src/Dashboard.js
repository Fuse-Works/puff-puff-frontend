import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box,
  Grid,
  Skeleton
} from "@mui/material";
import axios from "axios";
import SkeletonTable from './SkeletonTable';


const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState("");

  useEffect(() => {
    axios
      .get(`https://puff-puff-production.up.railway.app/api/v1/private/admin/dashboard`)
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching dashboard data:", error);
        setLoading(false);
      });
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setAmount("");
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("amount", amount);

      await axios.post(
        `https://puff-puff-production.up.railway.app/api/v1/private/cash-collection`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setData((prevData) => ({
        ...prevData,
        collectedCash: parseFloat(prevData.collectedCash) + parseFloat(amount),
      }));

      setOpen(false);
    } catch (error) {
      console.error("Error updating cash collection:", error);
    }
  };

  if (loading) {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={3}>
          {[...Array(3)].map((_, idx) => (
            <Grid item xs={12} sm={4} key={idx}>
              <Skeleton variant="rectangular" height={200} />
              <Skeleton variant="text" height={40} sx={{ marginTop: 1 }} />
              <Skeleton variant="text" width="80%" sx={{ marginTop: 1 }} />
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom sx={{ display: "block" }}>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        {/* Total Purchase Quantity Card */}
        <Grid item xs={12} sm={4} md={4}>
          <Card sx={{ minWidth: 275, height: "100%" }}>
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

        {/* Total Purchase Amount Card */}
        <Grid item xs={12} sm={4} md={4}>
          <Card sx={{ minWidth: 275, height: "100%" }}>
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

        {/* Total Top Up Amount Card */}
        <Grid item xs={12} sm={4} md={4}>
          <Card sx={{ minWidth: 275, height: "100%" }}>
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

        {/* Total Top Up Count Card */}
        <Grid item xs={12} sm={4} md={4}>
          <Card sx={{ minWidth: 275, height: "100%" }}>
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

        {/* Collected Cash Amount Card */}
        <Grid item xs={12} sm={4} md={4}>
          <Card sx={{ minWidth: 275 }}>
            <CardContent sx={{ display: "flex", flexDirection: "column" }}>
              <Typography variant="h6" component="div">
                Collected Cash Amount
              </Typography>
              <Typography variant="h4" color="primary">
                {data.collectedCash} Taka
              </Typography>
              <Button
                  variant="outlined"
                  sx={{ width: '180px', mt: 2, ml: 'auto' }}
                  color="primary"
                  onClick={handleClickOpen}
                >
                  Update Amount
                </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Dialog for Cash Collection Update */}
        <Dialog
          open={open}
          onClose={handleClose}
          maxWidth="sm" // Adjust to "md" or "lg" for a larger dialog
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
            <Button
              onClick={handleSubmit}
              color="primary"
              variant="contained"
            >
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </Box>
  );
};

export default Dashboard;
