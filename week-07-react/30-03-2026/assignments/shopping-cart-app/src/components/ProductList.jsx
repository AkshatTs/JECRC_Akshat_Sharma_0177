function ProductList({ products, onAddToCart }) {
  return (
    <div className="product-section">
      <h2>Products</h2>

      <div className="product-grid">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <h3>{product.name}</h3>
            <p>Price: ${product.price}</p>
            <button onClick={() => onAddToCart(product)}>Add</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;