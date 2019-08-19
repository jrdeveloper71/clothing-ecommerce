import React from 'react';
import './cart-dropdown.styles.scss';
// Components
import CustomButton from '../custom-button/custom-button.component';
import CartItem from '../cart-item/cart-item.component';
// Modules
import { animated, useSpring } from 'react-spring';

const CartDropdown = ({ revealed, setShowDropdown, cartItems }) => {
  const { height } = useSpring({
    height: revealed ? 300 : 0,
    config: {
      mass: 1,
      tension: 470,
      friction: 39,
      clamp: revealed ? false : true
    }
  });

  return (
    <animated.div
      className="cart-dropdown"
      style={{
        height: height.interpolate(h => h),
        width: height.interpolate([0, 300], [70, 250]).interpolate(h => h)
      }}
      onMouseEnter={() => setShowDropdown(true)}
      onMouseLeave={() => setShowDropdown(false)}
    >
      <div className="content" revealed={String(revealed)}>
        <div className="cart-items" count={cartItems.length}>
          {!cartItems.length
            ? '0 items on cart'
            : revealed &&
              cartItems.map((item, i) => (
                <CartItem key={item.id} item={item} i={i} />
              ))}
        </div>
        <CustomButton>GO TO CHECKOUT</CustomButton>
      </div>
    </animated.div>
  );
};

CartDropdown.defaultProps = {
  cartItems: []
};

export default CartDropdown;
