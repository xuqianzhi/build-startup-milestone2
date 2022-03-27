import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';

function preventDefault(event) {
  event.preventDefault();
}

export default function RentDue() {
  return (
    <React.Fragment>
      <Title>Rent Due:</Title>
      <Typography component="p" variant="h4">
        $2,024.00
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        on March 3rd, 2022
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View balance
        </Link>
      </div>
    </React.Fragment>
  );
}