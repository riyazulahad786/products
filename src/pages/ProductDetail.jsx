import { useState, useEffect, useMemo } from 'react';
import { Table, Button } from 'antd';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const ProductDetail = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
  const [comparedProducts, setComparedProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts(pagination.current, pagination.pageSize);
  }, [pagination]);

  const fetchProducts = async (page, pageSize) => {
    try {
      const { data } = await axios.get('https://dummyjson.com/products', {
        params: { limit: pageSize, skip: (page - 1) * pageSize },
      });

      setProducts(
        data.products.map(product => ({
          ...product,
          key: product.id,
        }))
      );
      setPagination(prev => ({ ...prev, total: data.total }));
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCompare = (record) => {
    if (comparedProducts.length >= 4) {
      alert("You can only compare up to 4 products at a time.");
      return;
    }

    setComparedProducts(prev => [...prev, record.id]);
    navigate(`/product?productId=${record.id}`);
  };

  const columns = useMemo(() => [
    { title: 'Name', dataIndex: 'title', sorter: true },
    { title: 'Price', dataIndex: 'price', sorter: true },
    { title: 'Category', dataIndex: 'category' },
    {
      title: 'Action',
      render: (_, record) => (
        <Button
          type="primary"
          disabled={comparedProducts.includes(record.id)}
          onClick={() => handleCompare(record)}
        >
          Compare
        </Button>
      ),
    },
  ], [comparedProducts]);

  return (
    <Table
      columns={columns}
      dataSource={products}
      loading={loading}
      pagination={{
        ...pagination,
        onChange: (page, pageSize) => setPagination({ current: page, pageSize }),
      }}
      onChange={(pagination, filters, sorter) =>
        setPagination(prev => ({
          ...prev,
          sortField: sorter.field,
          sortOrder: sorter.order,
        }))
      }
    />
  );
};

export default ProductDetail;
