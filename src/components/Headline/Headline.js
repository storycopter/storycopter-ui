import React from 'react';

import Container from '@material-ui/core/Container';

export default function Headline({ ...props }) {
  console.group('Headline.js');
  console.log({ props });
  console.groupEnd();

  return <div {...props} />;
  // return <Container {...props} />;
}
