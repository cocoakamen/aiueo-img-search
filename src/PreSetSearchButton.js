import React from "react";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function PreSetSearchButton(props) {
  const tagButtonStyle = {
    borderRadius: 24,
    height: 24,
    fontSize: 12,
    fontWeight: 'bold',
    ml: 1,
  };

  return (
    <Stack direction="row" spacing={2}>
      <Button
        variant="contained"
        sx={tagButtonStyle}
        color="secondary"
        onClick={(event) => props.handlePresetSearch('あお')}
      >
      あお
      </Button>
      <Button
        variant="contained"
        sx={tagButtonStyle}
        color="secondary"
        onClick={(event) => props.handlePresetSearch('しまうま')}
      >
      しまうま
      </Button>
    </Stack>
  );
}
