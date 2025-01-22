import { useState } from 'react';

const CategoryFilter = ({ onCategorySelect }) => {
    const [selectedCategory, setSelectCategory] = useState('');


    const categories = ['electronica', 'Hogar', 'Ropa', 'Juguetes', 'Deportes', 'Vehivulos'];

    const handleSelect = (category) => {
        setSelectedCategory(category);
        onCategorySelected(category);
    };


    return (
        <div className="category-filter">
          {categories.map((category) => (
            <button
              key={category}
              className={selectedCategory === category ? 'selected' : ''}
              onClick={() => handleSelect(category)}
            >
              {category}
            </button>
          ))}
        </div>
      );
};

export default CategoryFilter;