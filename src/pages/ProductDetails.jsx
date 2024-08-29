import { useState } from 'react';
import ProductDetailsTable from '../component/ProductsDetailsTable';
import { useNavigate } from 'react-router-dom';

const ProductDetails = () => {
  const [comparedProducts, setComparedProducts] = useState([]);
  const navigate = useNavigate();

  const handleCompare = (product) => {
    if (comparedProducts.length < 4 && !comparedProducts.some(p => p.id === product.id)) {
      const updatedProducts = [...comparedProducts, product];
      setComparedProducts(updatedProducts);
      navigate('/product', { state: { comparedProducts: updatedProducts } });
    }
  };

  return (
    <div>
      <ProductDetailsTable
        onCompare={handleCompare}
        comparedProducts={comparedProducts}
      />
    </div>
  );
};

export default ProductDetails;
