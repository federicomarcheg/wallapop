import { useState, useEffect } from 'react';
import CategoryFilter from '../components/CategoryFilter';


const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState('');




    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetchProducts(`/api/products/category/${category}`);
            const data = await response.json();
            setProducts(data);
        };

        if (category) fetchProducts();
    }, [category]);



    return (
        <div>
          <CategoryFilter onCategorySelect={setCategory} />
          <div className="product-list">
            {products.map((product) => (
              <div key={product.id} className="product">
                {product.name} - ${product.price}
              </div>
            ))}
          </div>
        </div>
      );
};

export default ProductList;