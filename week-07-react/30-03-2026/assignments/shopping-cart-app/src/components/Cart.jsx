function Cart({ cart, onIncrease, onDecrease, onRemove, totalPrice }) {
  return (
    <div className="cart-section">
      <h2>Cart</h2>

      {cart.length === 0 ? (
        <p className="empty-cart">Cart is empty</p>
      ) : (
        <>
          {cart.map((item) => (
            <div className="cart-item" key={item.id}>
              <div>
                <h3>{item.name}</h3>
                <p>
                  ${item.price} x {item.quantity} = $
                  {item.price * item.quantity}
                </p>
              </div>

              <div className="cart-buttons">
                <button onClick={() => onDecrease(item.id)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => onIncrease(item.id)}>+</button>
                <button
                  className="remove-btn"
                  onClick={() => onRemove(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <h3 className="total-price">Total = ${totalPrice}</h3>
        </>
      )}
    </div>
  );
}

export default Cart;