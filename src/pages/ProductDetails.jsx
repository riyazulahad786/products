// src/pages/ProductDetails.jsx
import { useState } from 'react';
import ProductDetailsTable from '../component/ProductsDetailsTable';
import { useNavigate } from 'react-router-dom';

const ProductDetails = () => {
  const [comparedProducts, setComparedProducts] = useState([]);
  const navigate = useNavigate();

  const handleCompare = (product) => {
    if (comparedProducts.length < 4 && !comparedProducts.includes(product)) {
      product.isCompared = true;
      setComparedProducts([...comparedProducts, product]);
      if (comparedProducts.length >= 0) {
        navigate('/product', { state: { comparedProducts: [...comparedProducts, product] } });
      }
    }
  };

  return (
    <div>
      <ProductDetailsTable onCompare={handleCompare} />
    </div>
  );
};

export default ProductDetails;
