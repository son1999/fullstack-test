import React from 'react';
import { Result, Button } from 'antd';

const ProductNotFound = () => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the product you searched for was not found."
      extra={<Button type="primary" href="/product">Back Home</Button>}
    />
  );
}

export default ProductNotFound;
