// src/components/Recommendation3.js
import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

const Recommendation3 = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        // Replace with actual data fetching logic
        fetch('/api/recommendation3')
            .then(response => response.json())
            .then(data => setData(data));
    }, []);

    return (
        <Box>
            {data.map((item, index) => (
                <Card key={index} sx={{ marginBottom: 2 }}>
                    <CardContent>
                        <Typography variant="h5">{item.title}</Typography>
                        <Typography variant="body2">{item.description}</Typography>
                    </CardContent>
                </Card>
            ))}
        </Box>
    );
}

export default Recommendation3;
