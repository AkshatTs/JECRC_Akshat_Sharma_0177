import { useState } from 'react';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import './components/ShoppingCart.css';

function App() {
  const products = [
    { id: 1, name: 'React T-Shirt', price: 25 },
    { id: 2, name: 'JavaScript Mug', price: 15 },
    { id: 3, name: 'Frontend Cap', price: 20 },
    { id: 4, name: 'Coding Notebook', price: 10 }
  ];

  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
      const updatedCart = cart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const increaseQuantity = (id) => {
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updatedCart);
  };

  const decreaseQuantity = (id) => {
    const updatedCart = cart
      .map((item) =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter((item) => item.quantity > 0);

    setCart(updatedCart);
  };

  const removeItem = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="app-container">
      <h1 className="main-heading">Shopping Cart App</h1>

      <div className="shopping-layout">
        <ProductList products={products} onAddToCart={addToCart} />

        <Cart
          cart={cart}
          onIncrease={increaseQuantity}
          onDecrease={decreaseQuantity}
          onRemove={removeItem}
          totalPrice={totalPrice}
        />
      </div>
    </div>
  );
}

export default App;