import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

export const SceletonsProduct = () => {
    return (
        <Stack spacing={1}>
            <Skeleton animation="wave" variant="text" width={250} sx={{ fontSize: '3rem' }} />
            <Skeleton animation="wave" variant="rectangular" width={250} height={200} />
            <Skeleton animation="wave" variant="text" width={100} sx={{ fontSize: '1rem' }} />
            {/* <Skeleton animation="wave" variant="rounded" width={210} height={60} /> */}
            <Skeleton animation="wave" variant="rounded" width={110} height={30} />
        </Stack>
    );
}