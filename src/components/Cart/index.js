import React from 'react';
import PropTypes from 'prop-types';

import Button from 'components/Button';
import CartItem from 'components/CartItem';
import CartZero from 'components/CartZero';
import FeaturedCartProduct from 'components/FeaturedCartProduct';
import Waves from 'components/Waves';

import Styled from './styles';

class Cart extends React.Component {
  componentWillMount() {
    const keydownHandler = this.keydownHandler.bind(this);
    window.addEventListener('keydown', keydownHandler);
  }

  componentWillReceiveProps(nextProps) {
    if (this.isShowing(nextProps)) {
      document.body.classList.add(Styled.state.isScrollLocked);
    } else {
      document.body.classList.remove(Styled.state.isScrollLocked);
    }
  }

  componentWillUnmount() {
    const keydownHandler = this.keydownHandler.bind(this);
    window.removeEventListener('keydown', keydownHandler);
  }

  keydownHandler(e) {
    if (this.isShowing() && e.keyCode === 27) {
      this.closeCart();
    }
  }

  closeCart(e) {
    if (e) { e.preventDefault(); }

    if (this.props.history.action === 'PUSH') {
      this.props.history.goBack();
    } else {
      this.props.history.push('/collections/coffee');
    }
  }

  isShowing(nextProps = this.props) {
    return nextProps.location.pathname === '/cart';
  }

  render() {
    return (
      <div>
        <Styled.Inner isShowing={this.isShowing()}>
          <Styled.Heading>
            Cart
            <Styled.Count empty={this.props.lineItems.length === 0}>
              {this.props.lineItems.length}
            </Styled.Count>
          </Styled.Heading>
          <Styled.Close href="/" onClick={e => this.closeCart(e)}>✕</Styled.Close>
          {this.props.isLoading &&
            <div>
              Loading…
            </div>
          }
          {this.props.isLoading === false &&
            <div>
              {this.props.lineItems.map(lineItem => (
                <CartItem
                  key={lineItem.id}
                  allProducts={this.props.allProducts}
                  lineItem={lineItem}
                  removeLineItem={this.props.removeLineItem}
                  updateLineItem={this.props.updateLineItem}
                />
              ))}
              {this.props.lineItems.length === 0 && <CartZero />}
            </div>
          }
          {this.props.featuredCartProduct &&
            <FeaturedCartProduct product={this.props.featuredCartProduct} />
          }
          <Styled.Actions>
            <Styled.WaveContainer>
              <Waves width="55%" />
              <Button
                href={this.props.checkoutUrl}
                rel="noopener"
                disabled={this.props.lineItems.length === 0}
              >
                Check Out
              </Button>
            </Styled.WaveContainer>
            <Styled.ShopButton href="/" onClick={e => this.closeCart(e)}>
              Keep Shopping
            </Styled.ShopButton>
          </Styled.Actions>
        </Styled.Inner>
        <Styled.Overlay isShowing={this.isShowing()} onClick={e => this.closeCart(e)} />
      </div>
    );
  }
}

Cart.defaultProps = {
  lineItems: [],
};

Cart.propTypes = {
  allProducts: PropTypes.array.isRequired,
  checkoutUrl: PropTypes.string.isRequired,
  featuredCartProduct: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  lineItems: PropTypes.array,
  location: PropTypes.object.isRequired,
  removeLineItem: PropTypes.func.isRequired,
  updateLineItem: PropTypes.func.isRequired,
};

export default Cart;
