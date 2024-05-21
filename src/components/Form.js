// src/components/Form.js
import React from 'react';
import { TextField, Button, Box } from '@mui/material';

const Form = () => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, marginTop: 2 }}>
            <TextField label="Field 1" variant="outlined" />
            <TextField label="Field 2" variant="outlined" />
            <TextField label="Field 3" variant="outlined" />
            <Button variant="contained" color="primary">Resubmit</Button>
        </Box>
    );
}

export default Form;
