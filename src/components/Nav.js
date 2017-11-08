import React from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';
import glamorous from 'glamorous';

import { color, font, grid, layer, transition } from '../lib/theme';

import logo from '../assets/lineage.svg';
import speckle from '../assets/speckle.png';

const Nav = props => (
  <Container>
    <Logo>
      <NavLink to="/">
        <img src={logo} alt="Lineage Coffee Roasters, Orlando" />
      </NavLink>
    </Logo>
    <Links>
      <StyledLink to="/collections/coffee">Coffee</StyledLink>
      <StyledLink to="/collections/gear">Gear</StyledLink>
      <StyledLink to="/pages/learn">Learn</StyledLink>
      <StyledLink to="/pages/about">About</StyledLink>
    </Links>
    <CartLink to="/cart" empty={props.cartCount === 0} aria-label="Cart">
      <span>Cart</span>
      {props.cartCount}
    </CartLink>
  </Container>
);

Nav.propTypes = {
  cartCount: PropTypes.number,
};

/**
 * Styles
 */

const Container = glamorous.div({
  alignItems: 'center',
  backgroundColor: `rgb(${color.white})`,
  backgroundImage: `url(${speckle})`,
  backgroundRepeat: 'repeat',
  backgroundSize: '400px auto',
  display: 'flex',
  height: 2 * grid,
  lineHeight: 1,
  paddingLeft: grid / 2,
  paddingRight: 0,
  width: '100%',
});

const Links = glamorous.nav({
  display: 'flex',
  fontSize: font.down1,
  paddingRight: 2.5 * grid,
});

const CartLink = glamorous(Link)(
  {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    fontSize: font.up1,
    fontWeight: 700,
    height: 2 * grid,
    justifyContent: 'center',
    position: 'fixed',
    right: 0,
    textDecoration: 'none',
    top: 0,
    transition: 'background-color 200ms, color 200ms',
    width: 2 * grid,
    zIndex: layer.cart,

    '& span': {
      alignItems: 'center',
      display: 'flex',
      fontSize: font.down4,
      fontWeight: 500,
      height: 0.75 * grid,
      justifyContent: 'center',
      left: 0,
      letterSpacing: '0.05em',
      position: 'absolute',
      textTransform: 'uppercase',
      top: 0.125 * grid,
      width: '100%',
    },

    ':hover': {
      backgroundColor: `rgb(${color.blueT})`,
      color: `rgb(${color.black})`,
    },
  },
  ({ empty }) => ({
    backgroundColor: empty ? `rgba(${color.offwhite}, 0.5)` : `rgb(${color.black})`,
    boxShadow: empty ? `inset 1px 0 rgb(${color.gray})` : 'none',
    color: `rgb(${empty ? color.gray : color.white})`,
  })
);

const StyledLink = glamorous(NavLink)({
  alignItems: 'center',
  color: `rgb(${color.black})`,
  display: 'flex',
  fontWeight: 500,
  paddingBottom: '1em',
  paddingTop: '1em',
  position: 'relative',
  textDecoration: 'none',
  textTransform: 'uppercase',

  ' & + *': {
    marginLeft: 0.75 * grid,
  },

  '&::after': {
    backgroundColor: `rgb(${color.blue})`,
    borderRadius: '50%',
    bottom: 0,
    content: '""',
    height: 6,
    left: '50%',
    opacity: 0,
    pointerEvents: 'none',
    position: 'absolute',
    transform: 'translate(-50%, 100%)',
    transition: `opacity 200ms, transform 200ms ${transition.standard}`,
    width: 6,
  },

  ['.active']: {
    '&::after': {
      opacity: 1,
      transform: 'translate(-50%, 0)',
    },
  },
});

const Logo = glamorous.div({
  marginRight: 'auto',

  '& img': {
    height: grid * 0.875,
    width: 'auto',
  },
});

export default Nav;
