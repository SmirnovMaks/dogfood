import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';
import { theme } from '../../utils/themeMUI'

export const CustomButton = styled(Button)(({ theme }) => ({
    color: theme.palette.primary,
    '&.Mui-hover': {
        color: theme.palette.secondary,
    },
}));