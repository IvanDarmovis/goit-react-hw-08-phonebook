import React from 'react';
import PropTypes from 'prop-types';
import { ListItem, ListItemButton, Typography } from '@mui/material';

export default function ContactListItem({ name, number, onClick }) {
  return (
    <ListItem
      sx={{
        flexBasis: '50%',
      }}
    >
      <ListItemButton
        onClick={onClick}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          border: '1px solid #0008',
          borderRadius: '5px',
          '& *': {
            mb: '10px',
          },
        }}
      >
        <Typography>{name}</Typography>
        <Typography>{number}</Typography>
      </ListItemButton>
    </ListItem>
  );
}

ContactListItem.propType = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
