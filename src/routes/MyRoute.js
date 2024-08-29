import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

export default function MyRoute({ element, isClosed = false, ...rest }) {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const location = useLocation();
  if (isClosed && !isLoggedIn) {
    return (
      <Navigate to="/login" state={{ prevPath: location.pathname }} replace />
    );
  }
  return React.cloneElement(element, { ...rest });
}

MyRoute.propTypes = {
  element: PropTypes.element.isRequired,
  isClosed: PropTypes.bool,
};

// return React.cloneElement(element, { ...rest });
// <Navigate to="/login" state={{ prevPath: location.pathname }} replace />
