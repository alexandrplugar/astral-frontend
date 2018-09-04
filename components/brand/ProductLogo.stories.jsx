import React from 'react';
import { storiesOf } from '@storybook/react';
import { number, text } from '@storybook/addon-knobs';

import ProductLogo from './ProductLogo';

storiesOf('Brand', module).add('ProductLogo', () => {
  const width = number('width', 200);
  const height = number('height', null);
  const productName = text('productName', 'Личный кабинет');

  return <ProductLogo productName={productName} width={width} height={height} />;
});
