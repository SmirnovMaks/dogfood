import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Box, styled } from '@mui/system';
import ModalUnstyled from '@mui/base/ModalUnstyled';
import Fade from '@mui/material/Fade';
import Button from '@mui/base/ButtonUnstyled';
import { MainForm } from '../Form/MainForm';

const BackdropUnstyled = React.forwardRef((props, ref) => {
    const { open, className, ...other } = props;
    return (
        <div
            className={clsx({ 'MuiBackdrop-open': open }, className)}
            ref={ref}
            {...other}
        />
    );
});

BackdropUnstyled.propTypes = {
    className: PropTypes.string.isRequired,
    open: PropTypes.bool,
};

const Modal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Backdrop = styled(BackdropUnstyled)`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7);
  -webkit-tap-highlight-color: transparent;
`;

const style = (theme) => ({
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    height: 350,
    backgroundColor: theme.palette.mode === 'dark' ? '#0A1929' : 'white',
    border: '2px solid currentColor',
    borderRadius: '5%',
    boxShadow: 24,
    padding: '16px 32px 24px 32px',
});

export default function TransitionModal({ openModal, setOpenModal, handleRequestLogin }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true)
    const handleClose = () => {
        setOpen(false)
        setOpenModal(false)
    }

    React.useEffect(() => {
        if (openModal) {
            handleOpen()
        } else {
            handleClose()
        }
    }, [openModal])

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open && openModal}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
            >
                <Fade in={open} timeout={300}>
                    <Box sx={style}>
                        <MainForm handleRequestLogin={handleRequestLogin} />
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}