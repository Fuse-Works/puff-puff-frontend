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
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    CircularProgress, // Import CircularProgress for the loading spinner
} from '@mui/material';
import axios from 'axios';
import SkeletonTable from './SkeletonTable';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

const ChalanDetails = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [productList, setProductList] = useState([]);
    const [newChalan, setNewChalan] = useState([{ productName: '', numberOfPieces: '', buyingPrice: '' }]);
    const [isSubmitting, setIsSubmitting] = useState(false); // State for submit button loading

    const pageSize = 10;

    // Fetch Chalan Details
    const fetchChalanDetails = (page) => {
        setLoading(true);
        axios
            .get(`https://puff-puff-production.up.railway.app/api/v1/private/admin/chalan-details`, {
                params: { page, size: pageSize },
            })
            .then((response) => {
                setData(response.data.content);
                setTotalPages(response.data.totalPages);
            })
            .catch((error) => console.error('Error fetching chalan details:', error))
            .finally(() => setLoading(false));
    };

    // Fetch Product List
    const fetchProducts = () => {
        axios
            .get('https://puff-puff-production.up.railway.app/api/v1/private/agent/products')
            .then((response) => setProductList(response.data))
            .catch((error) => console.error('Error fetching products:', error));
    };

    useEffect(() => {
        fetchChalanDetails(page);
        fetchProducts();
    }, [page]);

    // Pagination Handler
    const handlePageChange = (event, newPage) => {
        setPage(newPage - 1);
    };

    // Open Dialog
    const handleOpenDialog = () => {
        setNewChalan([{ productName: '', numberOfPieces: '', buyingPrice: '' }]); // Reset state
        setDialogOpen(true);
    };

    // Close Dialog
    const handleCloseDialog = () => {
        setDialogOpen(false);
    };

    // Update Chalan Row State
    const handleNewChalanChange = (index, field, value) => {
        const updatedChalan = [...newChalan];
        updatedChalan[index][field] = value;
        setNewChalan(updatedChalan);
    };

    // Add Row
    const addChalanRow = () => {
        setNewChalan([...newChalan, { productName: '', numberOfPieces: '', buyingPrice: '' }]);
    };

    // Remove Row
    const removeChalanRow = (index) => {
        const updatedChalan = newChalan.filter((_, i) => i !== index);
        setNewChalan(updatedChalan);
    };

    // Submit New Chalan
    const handleSubmitChalan = () => {
        setIsSubmitting(true); // Set loading state to true
        const payload = { chalanDetailsList: newChalan };
        axios
            .post('https://puff-puff-production.up.railway.app/api/v1/private/admin/chalan-details', payload)
            .then(() => {
                handleCloseDialog();
                fetchChalanDetails(page);
            })
            .catch((error) => console.error('Error creating new chalan:', error))
            .finally(() => setIsSubmitting(false)); // Reset loading state when done
    };

    return (
        <div style={{ flex: 1, padding: '20px', overflowX: 'auto' }}>
            {/* Header Section */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2>Chalan Details</h2>
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={handleOpenDialog}
                    style={{ alignSelf: 'flex-end' }}
                >
                    Add New Chalan
                </Button>
            </div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="chalan details table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Chalan ID</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Product Name</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Number of Pieces</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Buying Price</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading ? (
                            <SkeletonTable columns={5} rows={pageSize} />
                        ) : (
                            data.map((chalan) =>
                                chalan.chalanDetailsList.map((details) => (
                                    <TableRow key={details.id}>
                                        <TableCell sx={{ textAlign: 'center' }}>{chalan.id}</TableCell>
                                        <TableCell sx={{ textAlign: 'center' }}>{details.productName}</TableCell>
                                        <TableCell sx={{ textAlign: 'center' }}>{details.numberOfPieces}</TableCell>
                                        <TableCell sx={{ textAlign: 'center' }}>{details.buyingPrice}</TableCell>
                                        <TableCell sx={{ textAlign: 'center' }}>{new Date(chalan.createdAt).toLocaleDateString()}</TableCell>
                                    </TableRow>
                                ))
                            )
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Pagination */}
            <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
                <Pagination count={totalPages} page={page + 1} onChange={handlePageChange} color="primary" />
            </div>

            {/* Add New Chalan Dialog */}
            <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
                <DialogTitle>Add New Chalan</DialogTitle>
                <DialogContent>
                    {newChalan.map((row, index) => (
                        <div key={index} style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                            <FormControl fullWidth>
                                <InputLabel>Product Name</InputLabel>
                                <Select
                                    value={row.productName}
                                    onChange={(e) => handleNewChalanChange(index, 'productName', e.target.value)}
                                >
                                    {productList.map((product) => (
                                        <MenuItem key={product.id} value={product.name}>
                                            {product.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <TextField
                                label="Number of Pieces"
                                type="number"
                                value={row.numberOfPieces}
                                onChange={(e) => handleNewChalanChange(index, 'numberOfPieces', e.target.value)}
                                fullWidth
                            />
                            <TextField
                                label="Buying Price"
                                type="number"
                                value={row.buyingPrice}
                                onChange={(e) => handleNewChalanChange(index, 'buyingPrice', e.target.value)}
                                fullWidth
                            />
                            {newChalan.length > 1 && (
                                <RemoveCircleOutlineIcon
                                    onClick={() => removeChalanRow(index)}
                                    fontSize="large"
                                    sx={{ marginTop: "10px" }}
                                    color="error" // Predefined red color in Material-UI
                                />
                            )}
                        </div>
                    ))}
                    <Button variant="outlined" onClick={addChalanRow}>
                        Add Row
                    </Button>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="secondary">
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSubmitChalan}
                        color="primary"
                        variant="contained"
                        disabled={isSubmitting} // Disable button during submission
                    >
                        {isSubmitting ? (
                            <CircularProgress size={24} sx={{ color: 'white' }} />
                        ) : (
                            'Submit'
                        )}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ChalanDetails;
