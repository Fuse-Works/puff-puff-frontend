import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BarChartIcon from '@mui/icons-material/BarChart';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import SettingsIcon from '@mui/icons-material/Settings';
import { useNavigate, useLocation } from 'react-router-dom';

const drawerWidth = 240;

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <Drawer
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                    backgroundColor: 'black',
                    color: '#fff',
                },
            }}
            variant="permanent"
            anchor="left"
        >
            <Toolbar button onClick={() => navigate('/dashboard')}>
                <Typography variant="h6" noWrap component="div">
                    Dashboard
                </Typography>
            </Toolbar>
            <List>
                <ListItem
                    button
                    onClick={() => navigate('/verification-requests')}
                    sx={{
                        backgroundColor: isActive('/verification-requests') ? '#3f51b5' : 'inherit',
                        '&:hover': {
                            backgroundColor: 'grey', // Change hover color to grey
                        },
                    }}
                >
                    <ListItemIcon>
                        <DashboardIcon sx={{ color: '#fff' }} />
                    </ListItemIcon>
                    <ListItemText primary="Verification Requests" />
                </ListItem>
                <ListItem
                    button
                    onClick={() => navigate('/purchase-history')}
                    sx={{
                        backgroundColor: isActive('/purchase-history') ? '#3f51b5' : 'inherit',
                        '&:hover': {
                            backgroundColor: 'grey',
                        },
                    }}
                >
                    <ListItemIcon>
                        <BarChartIcon sx={{ color: '#fff' }} />
                    </ListItemIcon>
                    <ListItemText primary="Purchase History" />
                </ListItem>
                <ListItem
                    button
                    onClick={() => navigate('/top-up-history')}
                    sx={{
                        backgroundColor: isActive('/top-up-history') ? '#3f51b5' : 'inherit',
                        '&:hover': {
                            backgroundColor: 'grey',
                        },
                    }}
                >
                    <ListItemIcon>
                        <AnalyticsIcon sx={{ color: '#fff' }} />
                    </ListItemIcon>
                    <ListItemText primary="Top Up History" />
                </ListItem>
                <ListItem
                    button
                    onClick={() => navigate('/settings')}
                    sx={{
                        backgroundColor: isActive('/settings') ? '#3f51b5' : 'inherit',
                        '&:hover': {
                            backgroundColor: 'grey',
                        },
                    }}
                >
                    <ListItemIcon>
                        <SettingsIcon sx={{ color: '#fff' }} />
                    </ListItemIcon>
                    <ListItemText primary="Settings" />
                </ListItem>
            </List>
        </Drawer>
    );
};

export default Sidebar;
