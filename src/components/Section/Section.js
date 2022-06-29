import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';

function Section({ title }) {
  return (
    <Box
      sx={{
        m: '0 auto',
      }}
    >
      <Typography
        variant="h4"
        component="p"
        sx={{
          m: '10px',
        }}
      >
        {title}
      </Typography>
    </Box>
  );
}

export default Section;

Section.propTypes = {
  title: PropTypes.string,
};
