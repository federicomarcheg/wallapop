import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ProductManagementPage() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ title: '', price: '' });

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await axios.get('http://localhost:8080/api/products');
      setProducts(res.data);
    };
    fetchProducts();
  }, []);

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    const res = await axios.post('http://localhost:8080/api/products', newProduct);
    setProducts([...products, res.data]);
    setNewProduct({ title: '', price: '' });
  };

  const handleDeleteProduct = async (id) => {
    await axios.delete(`http://localhost:8080/api/products/${id}`);
    setProducts(products.filter((product) => product._id !== id));
  };

  return (
    <div>
      <h1>Gestión de Productos</h1>
      <form onSubmit={handleCreateProduct}>
        <input
          type="text"
          placeholder="Título"
          value={newProduct.title}
          onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
        />
        <input
          type="number"
          placeholder="Precio"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
        />
        <button type="submit">Agregar Producto</button>
      </form>
      <ul>
        {products.map((product) => (
          <li key={product._id}>
            {product.title} - ${product.price}
            <button onClick={() => handleDeleteProduct(product._id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductManagementPage;
