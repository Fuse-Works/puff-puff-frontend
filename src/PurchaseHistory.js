import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Pagination } from '@mui/material';
import axios from 'axios';
import SkeletonTable from './SkeletonTable';

const PurchaseHistory = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const pageSize = 10;

  const fetchPurchaseHistory = (page) => {
    setLoading(true);
    axios
      .get(`https://puff-puff-production.up.railway.app/api/v1/private/admin/purchase-history`, {
        params: { page, size: pageSize },
      })
      .then((response) => {
        setData(response.data.content);
        setTotalPages(response.data.totalPages);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching purchase history:', error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchPurchaseHistory(page);
  }, [page]);

  const handlePageChange = (event, newPage) => {
    setPage(newPage - 1);
  };

  return (
    <div style={{ flex: 1, padding: '20px', overflowX: 'auto' }}>
      <h2>Purchase History</h2>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="purchase history table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Customer Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Product Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Quantity</TableCell>
              <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Unit Price</TableCell>
              <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Total Price</TableCell>
              <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <SkeletonTable columns={6} rows={pageSize} />
            ) : (
              data.map((purchase) => (
                <TableRow key={purchase.id}>
                  <TableCell sx={{ textAlign: 'center' }}>{purchase.customerName}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>{purchase.productName}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>{purchase.quantity}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>{purchase.unitPrice}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>{purchase.totalPrice}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>{new Date(purchase.createdAt).toLocaleString()}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
        <Pagination count={totalPages} page={page + 1} onChange={handlePageChange} color="primary" />
      </div>
    </div>
  );
};

export default PurchaseHistory;
