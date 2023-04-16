import React from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

const AddDepartmentButton = () => {
  return (
    <Button
      variant="contained"
      sx={{
        borderRadius: '10px',
        backgroundColor: 'black',
        color: 'white',
        '&:hover': {
          backgroundColor: 'black',
        },
        width: { xs: '100%', sm: '125%' },
        // marginBottom: { xs: 2, sm: 0 },
      }}
      startIcon={<AddIcon />}
    >
      Add Department
    </Button>
  );
};

export default AddDepartmentButton;
