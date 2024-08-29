import  { useEffect, useState } from 'react';
import { Table, Button } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProductDetailsTable = ({ onCompare }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
  const [sortOrder, setSortOrder] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, [pagination.current, sortOrder]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get('https://dummyjson.com/products', {
        params: {
          limit: pagination.pageSize,
          skip: (pagination.current - 1) * pagination.pageSize,
        },
      });
      setProducts(data.products);
      setPagination({ ...pagination, total: data.total });
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTableChange = (pagination, filters, sorter) => {
    setPagination(pagination);
    setSortOrder(sorter.order);
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      sorter: true,
    },
    {
      title: 'Description',
      dataIndex: 'description',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      sorter: true,
    },
    {
      title: 'Discount Percentage',
      dataIndex: 'discountPercentage',
      sorter: true,
    },
    {
      title: 'Brand',
      dataIndex: 'brand',
      sorter: true,
    },
    {
      title: 'Category',
      dataIndex: 'category',
      sorter: true,
    },
    {
      title: 'Image',
      dataIndex: 'thumbnail',
      render: (text, record) => <img src={record.thumbnail} alt={record.title} style={{ width: 50 }} />,
    },
    {
      title: 'Compare Products',
      dataIndex: 'compare',
      render: (text, record) => (
        <Button
          type="primary"
          onClick={() => onCompare(record)}
          disabled={record.isCompared}
        >
          Compare
        </Button>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      rowKey="id"
      dataSource={products}
      pagination={pagination}
      loading={loading}
      onChange={handleTableChange}
    />
  );
};

export default ProductDetailsTable;
