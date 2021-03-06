import React from 'react';
import PropTypes from 'prop-types';

import * as Styled from './styles';

const CartItem = ({ lineItem, ...props }) => {
  if (!lineItem || !lineItem.variant) {
    return null;
  }

  const productType = lineItem.productType.toLowerCase();
  const featuredImage = lineItem.variant.image
    ? lineItem.variant.image.src
    : lineItem.images[0].src;

  const { color } = lineItem.metafields.c_f || '';

  const shouldShowVariant =
    ['default title', 'title'].indexOf(lineItem.variant.title.toLowerCase()) === -1;

  let subscriptionInterval = '';
  let subscriptionUnit = '';

  if (productType.indexOf('subscription') >= 0) {
    const interval = lineItem.customAttributes.find(
      attr => attr.key === 'shipping_interval_frequency'
    );
    const unit = lineItem.customAttributes.find(attr => attr.key === 'shipping_interval_unit_type');
    if (interval) subscriptionInterval = interval.value;
    if (unit) subscriptionUnit = unit.value;
  }

  const clickHandler = e => {
    e.preventDefault();
    // eslint-disable-next-line no-alert
    if (window.confirm(`Remove ${lineItem.title}?`)) {
      props.removeLineItem(lineItem.id);
    }
  };

  return (
    <Styled.Container>
      <Styled.ThumbContainer color={color}>
        <Styled.Thumb src={featuredImage} alt={lineItem.title} />
      </Styled.ThumbContainer>
      <Styled.ProductInfo>
        <Styled.Heading>
          {lineItem.title}
          {productType.indexOf('subscription') >= 0 &&
            ` (Every ${subscriptionInterval} ${
              subscriptionInterval === '1'
                ? subscriptionUnit.substr(0, subscriptionUnit.length - 1)
                : subscriptionUnit
            })`}
          {shouldShowVariant && ` (${lineItem.variant.title})`}
        </Styled.Heading>
        <Styled.ProductType>{lineItem.productType}</Styled.ProductType>
        <Styled.Description>
          {(productType === 'coffee' || productType === 'coffee beans') &&
            Array.isArray(lineItem.tags) && (
              <Styled.Notes>{lineItem.tags.map(tag => tag).join(' / ')}</Styled.Notes>
            )}
        </Styled.Description>
        <Styled.Price>${lineItem.variant.price}</Styled.Price>
      </Styled.ProductInfo>
      <Styled.QuantityLabel>
        <Styled.Quantity
          defaultValue={lineItem.quantity}
          min="0"
          onChange={e => {
            // eslint-disable-next-line no-alert
            if (parseInt(e.target.value, 10) === 0 && window.confirm(`Remove ${lineItem.title}?`)) {
              props.removeLineItem(lineItem.id);
            } else if (e.target.value) {
              props.updateLineItem({
                id: lineItem.id,
                quantity: e.target.value,
              });
            }
          }}
          type="number"
        />
        {productType === 'coffee' || productType === 'coffee beans' ? 'bags' : 'count'}
        <Styled.Remove onClick={e => clickHandler(e)}>Remove</Styled.Remove>
      </Styled.QuantityLabel>
    </Styled.Container>
  );
};

CartItem.propTypes = {
  lineItem: PropTypes.object.isRequired,
  removeLineItem: PropTypes.func.isRequired,
  updateLineItem: PropTypes.func.isRequired,
};

export default CartItem;
