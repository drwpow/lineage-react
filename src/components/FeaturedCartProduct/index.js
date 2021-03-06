import React from 'react';
import PropTypes from 'prop-types';

import * as Styled from './styles';

const FeaturedCartProduct = props => {
  const productType = props.product.productType.toLowerCase();

  return (
    <Styled.Container>
      <Styled.Label color={props.product.metafields.c_f.color}>Featured Item</Styled.Label>
      <Styled.Grid>
        <Styled.ProductInfo>
          <Styled.Image src={props.product.featured_image} alt={props.product.title} />
          <Styled.Heading>{props.product.title}</Styled.Heading>
          {(productType === 'coffee' || productType === 'coffee beans') && (
            <Styled.Notes>{props.product.tags.join(' / ')}</Styled.Notes>
          )}
          <Styled.Price>${props.product.variants[0].price}</Styled.Price>
        </Styled.ProductInfo>
        <Styled.ViewProduct to={`/products/${props.product.handle}`}>View</Styled.ViewProduct>
      </Styled.Grid>
    </Styled.Container>
  );
};

FeaturedCartProduct.propTypes = {
  product: PropTypes.object.isRequired,
};

export default FeaturedCartProduct;
