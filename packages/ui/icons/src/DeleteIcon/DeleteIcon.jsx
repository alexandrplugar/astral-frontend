import React from 'react';
import { SvgIcon } from '@astral-frontend/core';

const ArrowIcon = props => (
  <SvgIcon viewBox="0 0 24 24" {...props}>
    <path fill="none" d="M0 0h24v24H0V0z" />
    <path d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z" />
  </SvgIcon>
);

export default ArrowIcon;
