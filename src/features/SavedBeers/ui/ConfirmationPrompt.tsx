import { Button, Dialog, DialogContent, Grid, Typography } from '@mui/material';
import { FC, useState } from 'react';
import { Lambda } from '../../../utils/lambda';

export const ConfirmationPrompt: FC<{ label: string; message: string; onOk: Lambda<void, void> }> = ({
  label,
  message,
  onOk,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleConfirm = () => {
    onOk();
    handleClose();
  };

  return (
    <>
      <Dialog open={isOpen} onClose={handleClose}>
        <DialogContent>
          <Typography>{message}</Typography>
          <Grid container sx={{ justifyContent: 'space-between', mt: 2 }}>
            <Button variant="contained" onClick={handleClose}>
              No
            </Button>
            <Button variant="outlined" onClick={handleConfirm}>
              Yes
            </Button>
          </Grid>
        </DialogContent>
      </Dialog>
      <Button variant="contained" size="small" onClick={handleOpen}>
        {label}
      </Button>
    </>
  );
};
