import { useState, useEffect } from 'react';
import { Button, Modal, notification, Table } from 'antd';
import CompareProducts from '../component/CompareProducts';

const CompareProductsPage = () => {
  const [productsData, setProductsData] = useState([]);
  const [comparedProducts, setComparedProducts] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then(response => response.json())
      .then(data => {
        setProductsData(data.products);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        notification.error({
          message: 'Error',
          description: 'Failed to fetch products from the API.',
        });
      });
  }, []);

  const handleAddToCompare = (product) => {
    if (comparedProducts.length >= 4) {
      notification.error({
        message: 'Comparison Limit',
        description: 'You can only compare up to 4 products at a time.',
      });
      return;
    }
    if (comparedProducts.find(p => p.id === product.id)) {
      notification.warning({
        message: 'Duplicate Product',
        description: 'This product is already in the comparison list.',
      });
      return;
    }
    setComparedProducts([...comparedProducts, product]);
  };

  const handleRemoveProduct = (id) => {
    const filteredProducts = comparedProducts.filter(product => product.id !== id);
    setComparedProducts(filteredProducts);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Brand',
      dataIndex: 'brand',
      key: 'brand',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: 'Compare',
      key: 'compare',
      render: (_, product) => (
        <Button
          type="primary"
          onClick={() => handleAddToCompare(product)}
          disabled={comparedProducts.some(p => p.id === product.id)}
        >
          Compare
        </Button>
      ),
    },
  ];

  return (
    <div>
      <h2>Compare Products</h2>
      <CompareProducts
        comparedProducts={comparedProducts}
        onRemove={handleRemoveProduct}
      />
      <Button
        type="primary"
        onClick={showModal}
        disabled={comparedProducts.length >= 4}
        style={{ marginTop: '20px' }}
      >
        Add More
      </Button>

      <Modal
        title="Add More Products"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={800}
      >
        <Table
          dataSource={productsData}
          columns={columns}
          pagination={{ pageSize: 10 }}
          rowKey="id"
        />
      </Modal>
    </div>
  );
};

export default CompareProductsPage;
