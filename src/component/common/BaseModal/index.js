import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          style={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function BaseModal({children, showButton=true, boolOpen=false, setBoolOpen = () => {}, title, titleButton, showAction , onOK, styleButton={}, classNameModal={}}) {
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    if (!showButton) setOpen(boolOpen);
  }, [boolOpen])
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    if (!showButton) setBoolOpen(false);
    setOpen(false);
  };
  const handleOk = async () => {
    await onOK();
    handleClose();
  }
  return (
    <div>
      {showButton ? 
        <Button  style={{...styleButton, textTransform: 'none'}} onClick={handleClickOpen}>
              {titleButton}
        </Button>
       : <></>
       }
      <BootstrapDialog
        className={classNameModal}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          {title}
        </BootstrapDialogTitle>
        <DialogContent dividers>
          {children}
        </DialogContent>
        {showAction ?
            <DialogActions>
              <Button autoFocus onClick={handleOk}>
                  Save
              </Button>
            </DialogActions> : ""
        }
      </BootstrapDialog>
    </div>
  );
}