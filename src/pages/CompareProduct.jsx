import { useState } from 'react';
import { Table, Button, Modal } from 'antd';

const CompareProduct = ({ availableProducts = [] }) => {
  const [compareList, setCompareList] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const columns = [
    { title: 'Feature', dataIndex: 'feature' },
    ...compareList.map(product => ({
      title: (
        <div>
          {product.name}
          <Button type="link" onClick={() => handleRemove(product.id)}>Remove</Button>
        </div>
      ),
      dataIndex: product.id,
      render: (text, record) => record[product.id],
    })),
  ];

  const handleRemove = (id) => {
    setCompareList(compareList.filter(product => product.id !== id));
  };

  const handleAddMore = (product) => {
    if (compareList.length < 4 && !compareList.some(p => p.id === product.id)) {
      setCompareList([...compareList, product]);
    }
    setIsModalVisible(false);
  };

  const getComparisonData = () => {
    if (!compareList.length) return [];

    const features = ['price', 'brand', 'category']; // Define features to compare
    return features.map(feature => ({
      key: feature,
      feature: feature.charAt(0).toUpperCase() + feature.slice(1),
      ...compareList.reduce((acc, product) => {
        acc[product.id] = product[feature];
        return acc;
      }, {}),
    }));
  };

  return (
    <div>
      <Table columns={columns} dataSource={getComparisonData()} pagination={false} />
      <Button type="primary" onClick={() => setIsModalVisible(true)}>Add More</Button>
      <Modal
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Table
          columns={[
            { title: 'Product Name', dataIndex: 'name' },
            {
              title: 'Action',
              render: (_, record) => (
                <Button
                  type="primary"
                  onClick={() => handleAddMore(record)}
                  disabled={compareList.some(product => product.id === record.id)}
                >
                  Add
                </Button>
              ),
            },
          ]}
          dataSource={availableProducts.map(product => ({ ...product, key: product.id }))}
          pagination={{ pageSize: 10 }}
        />
      </Modal>
    </div>
  );
};

export default CompareProduct;
