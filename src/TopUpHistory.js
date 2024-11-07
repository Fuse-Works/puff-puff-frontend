import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Pagination } from '@mui/material';
import axios from 'axios';
import Sidebar from './Sidebar';

const TopUpHistory = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0); // Current page number
    const [totalPages, setTotalPages] = useState(0); // Total number of pages

    const pageSize = 10; // Number of items per page

    const fetchTopUpHistory = (page) => {
        setLoading(true);
        axios
            .get(`https://puff-puff-production.up.railway.app/api/v1/private/admin/top-up-history`, {
                params: { page, size: pageSize },
            })
            .then((response) => {
                setData(response.data.content); // Set response data to table content
                setTotalPages(response.data.totalPages); // Set total pages for pagination
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching top-up history:', error);
                setLoading(false);
            });
    };

    // Fetch data when the component loads or when page number changes
    useEffect(() => {
        fetchTopUpHistory(page);
    }, [page]);

    const handlePageChange = (event, newPage) => {
        setPage(newPage - 1); // Adjust page index for 0-based pagination
    };

    if (loading) {
        return <CircularProgress />;
    }

    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <Sidebar />
            <div style={{ flex: 1, padding: '20px', overflowX: 'auto' }}>
                <h2>Top-Up History</h2>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="top-up history table">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold' }}>Customer Name</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Amount</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Previous Balance</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Updated Balance</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Customer QR</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Date</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((topUp) => (
                                <TableRow key={topUp.id}>
                                    <TableCell>{topUp.customerName}</TableCell>
                                    <TableCell>{topUp.amount}</TableCell>
                                    <TableCell>{topUp.previousBalance}</TableCell>
                                    <TableCell>{topUp.updatedBalance}</TableCell>
                                    <TableCell>{topUp.customerQr}</TableCell>
                                    <TableCell sx={{ textAlign: 'center' }}>
                                        {new Date(topUp.createdAt).toLocaleString('en-US', {
                                            year: 'numeric',
                                            month: 'long',  // 'short' for abbreviated month (e.g., Jan)
                                            day: 'numeric',
                                            hour: 'numeric',
                                            minute: 'numeric',
                                            hour12: true
                                        })}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* Pagination Controls */}
                <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
                    <Pagination
                        count={totalPages}
                        page={page + 1}
                        onChange={handlePageChange}
                        color="primary"
                    />
                </div>
            </div>
        </div>
    );
};

export default TopUpHistory;
