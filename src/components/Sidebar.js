// src/components/Sidebar.js
import React from 'react';
import { List, ListItem, ListItemText, ListItemButton } from '@mui/material';

const Sidebar = ({ onTabChange }) => {
    return (
        <List>
            <ListItem disablePadding>
                <ListItemButton onClick={() => onTabChange('recommendation1')}>
                    <ListItemText primary="Recommendation1" />
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton onClick={() => onTabChange('recommendation2')}>
                    <ListItemText primary="Recommendation2" />
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton onClick={() => onTabChange('recommendation3')}>
                    <ListItemText primary="Recommendation3" />
                </ListItemButton>
            </ListItem>
        </List>
    );
}

export default Sidebar;
