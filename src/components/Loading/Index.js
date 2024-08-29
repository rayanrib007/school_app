import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styled';

export default function Loading({ isLoading = false }) {
  if (!isLoading) return <></>;

  return (
    <div>
      <Container>
        <div />
        <span>Carregando...</span>
      </Container>
    </div>
  );
}

Loading.propTypes = {
  isLoading: PropTypes.bool,
};
