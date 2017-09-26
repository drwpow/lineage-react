/**
 * App
 * The top of the waterfall.
 */

import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect,
  withRouter
} from 'react-router-dom';

import Nav from './components/Nav';
import ProductListContainer from './containers/ProductListContainer';

import Home from './pages/Home';

/* Shopify */

import ShopifyBuy from 'shopify-buy';

/**
 * @section Config
 */

const accessToken = '8b97d4f794c051c78b3f00e8da03ef19'; // Read-only. It’s cool.
const domain = 'lineage-coffee-roasting.myshopify.com';

const coffeeCollection = 27654297;
const gearCollection = '28017149';
const cartCollection = '';

/**
 * @section Component
 */

class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      cartItems: [],
      client: ShopifyBuy.buildClient({
        appId: '6', // '6' is for JS Buy Button (this app)
        accessToken,
        domain,
      }),
      collections: [],
      products: [],
      selectedCollectionHandle: null,
      selectedProductHandle: null,
    };

    // Init
    this.getCart();
    this.getProducts();
  }

  getCart() {
    const cartID = window.localStorage.getItem('lineageCart');

    if (cartID) { // If returning visitor
      this.state.client.fetchCart(cartID)
        .then((result) => {
          this.setState({ isLoading: false });
          if (result) {
            this.setState({ cartItems: result.lineItems });
          } else {
            setTimeout(() => this.getCart(), 1000); // If failed, try again
          }
        });
    } else {      // If new visitor
      this.state.client.createCart()
        .then((result) => {
          this.setState({ isLoading: false });
          if (result) {
            this.setState({ cartItems: result.lineItems });
            window.localStorage.setItem('lineageCart', result.id);
          } else {
            setTimeout(() => this.getCart(), 1000); // If failed, try again
          }
        });
    }
  }

  getCollections() {
    this.state.client.fetchAllCollections()
      .then(result => this.setState({ collections: result }));
  }

  getProducts() {
    this.state.client.fetchAllProducts()
      .then(result => this.setState({
        products: result,
      }));
  }

  render() {
    return (
      <Router>
        <div>
          <Nav cartItems={this.state.cartItems} />

          <Route exact path="/" component={Home} />

          <ProductListContainer
            collections={this.state.collections}
            products={this.state.products}
            selectedCollectionHandle={this.state.selectedCollectionHandle}
            selectedProductHandle={this.state.selectedProductHandle}
          />
        </div>
      </Router>
    );
  }
}

/**
 * @section Styles
 */

const BaseStyles = `
  box-sizing: border-box;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 14px;
`;

export default App;
