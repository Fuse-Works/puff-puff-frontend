import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Skeleton, Pagination } from '@mui/material';
import axios from 'axios';

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
                            <TableCell sx={{ fontWeight: 'bold' }}>Customer Name</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Product Name</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Quantity</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Unit Price</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Total Price</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading ? (
                            Array.from({ length: 5 }).map((_, index) => (
                                <TableRow key={index}>
                                    <TableCell><Skeleton /></TableCell>
                                    <TableCell><Skeleton /></TableCell>
                                    <TableCell><Skeleton /></TableCell>
                                    <TableCell><Skeleton /></TableCell>
                                    <TableCell><Skeleton /></TableCell>
                                    <TableCell><Skeleton /></TableCell>
                                </TableRow>
                            ))
                        ) : (
                            data.map((purchase) => (
                                <TableRow key={purchase.id}>
                                    <TableCell>{purchase.customerName}</TableCell>
                                    <TableCell>{purchase.productName}</TableCell>
                                    <TableCell>{purchase.quantity}</TableCell>
                                    <TableCell>{purchase.unitPrice}</TableCell>
                                    <TableCell>{purchase.totalPrice}</TableCell>
                                    <TableCell>{new Date(purchase.createdAt).toLocaleString()}</TableCell>
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
