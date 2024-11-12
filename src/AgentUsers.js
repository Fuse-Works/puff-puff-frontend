import React, { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Pagination,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Box,
    Skeleton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import SignUp from './SignUp';

const AgentUsers = () => {
    const [agentUsers, setAgentUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [openDialog, setOpenDialog] = useState(false);

    const pageSize = 10;

    const fetchAgentUsers = (page) => {
        setLoading(true);
        axios
            .get(`https://puff-puff-production.up.railway.app/api/v1/private/users`, {
                params: { isAgentListing: true, page, size: pageSize },
            })
            .then((response) => {
                setAgentUsers(response.data.content || response.data);
                setTotalPages(response.data.totalPages || Math.ceil(response.data.length / pageSize));
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching agent users:', error);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchAgentUsers(page);
    }, [page]);

    const handlePageChange = (event, newPage) => {
        setPage(newPage - 1);
    };

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleSuccess = () => {
        handleCloseDialog();  // Close dialog
        window.location.reload();  // Reload the page after successful submission
    };

    return (
        <div style={{ flex: 1, padding: '20px', overflowX: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2>Agents</h2>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleOpenDialog}
                    style={{ alignSelf: 'flex-end' }}
                >
                    Add New Agent
                </Button>
            </div>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="agent users table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold' }}>User ID</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Full Name</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading
                            ? Array.from(new Array(pageSize)).map((_, index) => (
                                <TableRow key={index}>
                                    <TableCell>
                                        <Skeleton variant="text" width="80%" />
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton variant="text" width="60%" />
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton variant="text" width="70%" />
                                    </TableCell>
                                </TableRow>
                            ))
                            : agentUsers.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell>{user.id}</TableCell>
                                    <TableCell>{user.fullName}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
                <Pagination
                    count={totalPages}
                    page={page + 1}
                    onChange={handlePageChange}
                    color="primary"
                />
            </div>

            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                maxWidth="sm"
                fullWidth
                PaperProps={{
                    sx: {
                        overflowY: 'visible',
                        overflowX: 'hidden',
                    },
                }}
            >
                <DialogTitle>
                    Agent Onboarding
                    <IconButton
                        edge="end"
                        color="inherit"
                        onClick={handleCloseDialog}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent
                    dividers
                    sx={{
                        padding: 2,
                        overflowY: 'auto',
                        overflowX: 'hidden',
                    }}
                >
                    {/* Pass handleSuccess as a prop to trigger page reload */}
                    <SignUp onSuccess={handleSuccess} />
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default AgentUsers;
