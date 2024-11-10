import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BarChartIcon from "@mui/icons-material/BarChart";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import SettingsIcon from "@mui/icons-material/Settings";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NewReleasesIcon from "@mui/icons-material/NewReleases";
import { useNavigate, useLocation } from "react-router-dom";

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
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: "#ffffff",
          color: "#000",
          marginTop: "15px",
          height: `calc(100vh - 30px)`,
          marginLeft: "17px",
          borderRadius: "15px",
          boxShadow: "1",
          padding: "10px",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar button onClick={() => navigate("/dashboard")}>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "15px",
            justifyItems: "start",
            paddingLeft: "0px",
            fontStyle: "italic",
            cursor: 'pointer'
          }}
        >
          <DashboardIcon /> Dashboard
        </Typography>
      </Toolbar>
      <List>
        <Stack spacing={1}>
          <ListItem
            button
            onClick={() => navigate("/verification-requests")}
            sx={{
              backgroundColor: isActive("/verification-requests")
                ? "#FC2861"
                : "inherit",
              borderRadius: "10px",
              color: isActive("/verification-requests") ? "#ffffff" : "inherit",
              "&:hover": {
                backgroundColor: "grey",
              },
              cursor: "pointer",
            }}
          >
            <ListItemIcon>
              <NewReleasesIcon
                sx={{
                  color: isActive("/verification-requests")
                    ? "#ffffff"
                    : "inherit",
                }}
              />
            </ListItemIcon>
            <ListItemText primary="Verification Requests" />
          </ListItem>
          <ListItem
            button
            onClick={() => navigate("/purchase-history")}
            sx={{
              backgroundColor: isActive("/purchase-history")
                ? "#FC2861"
                : "inherit",
              borderRadius: "10px",
              color: isActive("/purchase-history") ? "#ffffff" : "inherit",
              "&:hover": {
                backgroundColor: "grey",
              },
              cursor: "pointer",
            }}
          >
            <ListItemIcon>
              <BarChartIcon
                sx={{
                  color: isActive("/purchase-history") ? "#ffffff" : "inherit",
                }}
              />
            </ListItemIcon>
            <ListItemText primary="Purchase History" />
          </ListItem>
          <ListItem
            button
            onClick={() => navigate("/top-up-history")}
            sx={{
              backgroundColor: isActive("/top-up-history")
                ? "#FC2861"
                : "inherit",
              borderRadius: "10px",
              color: isActive("/top-up-history") ? "#ffffff" : "inherit",
              "&:hover": {
                backgroundColor: "grey",
              },
              cursor: "pointer",
            }}
          >
            <ListItemIcon>
              <AnalyticsIcon
                sx={{
                  color: isActive("/top-up-history") ? "#ffffff" : "inherit",
                }}
              />
            </ListItemIcon>
            <ListItemText primary="Top Up History" />
          </ListItem>
          <ListItem
            button
            onClick={() => navigate("/settings")}
            sx={{
              backgroundColor: isActive("/settings") ? "#FC2861" : "inherit",
              color: isActive("/settings") ? "#ffffff" : "inherit",
              borderRadius: "10px",
              "&:hover": {
                backgroundColor: "grey",
              },
              cursor: "pointer",
            }}
          >
            <ListItemIcon>
              <SettingsIcon
                sx={{
                  color: isActive("/settings") ? "#ffffff" : "inherit",
                }}
              />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItem>
          <ListItem
            button
            onClick={() => navigate("/logout")}
            sx={{
              backgroundColor: isActive("/logout") ? "#FC2861" : "inherit",
              color: isActive("/logout") ? "#ffffff" : "inherit",
              borderRadius: "10px",
              "&:hover": {
                backgroundColor: "grey",
              },
              cursor: "pointer",
            }}
          >
            <ListItemIcon>
              <ExitToAppIcon
                sx={{
                  color: isActive("/logout") ? "#ffffff" : "inherit",
                }}
              />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </Stack>
      </List>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          position: "absolute",
          bottom: "10px",
          left: "0px",
          right: "0px",
          margin: "auto",
        }}
      >
        <img
          style={{ height: "30px", width: "30px", borderRadius: "50%" }}
          src="https://via.placeholder.com/50"
          alt="Not Found"
        />
        <h5 style={{ fontSize: "14px", fontStyle: "italic", color: '#14b8a6', }}>
          Mohammad Masudul Alam
        </h5>
        {/* <button
          style={{
            background: "crimson",
            color: "white",
            padding: "5px 7px",
            border: "none",
            borderRadius: '7px'
          }}
        >
          Logout
        </button> */}
      </div>
    </Drawer>
  );
};

export default Sidebar;
