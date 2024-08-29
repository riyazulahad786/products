import {} from 'react';
import { Button, Table } from 'antd';

const CompareProducts = ({ comparedProducts, onRemove }) => {
  if (comparedProducts.length < 2) {
    return <p>Please add at least two products to compare.</p>;
  }

  const columns = [
    {
      title: 'Feature',
      dataIndex: 'feature',
      key: 'feature',
    },
    ...comparedProducts.map(product => ({
      title: product.title,
      dataIndex: product.id,
      key: product.id,
    })),
    {
      title: 'Action',
      key: 'action',
      render: (_, product) => (
        <Button type="link" onClick={() => onRemove(product.id)}>
          Remove
        </Button>
      ),
    },
  ];

  const data = [
    {
      key: '1',
      feature: 'Title',
      ...comparedProducts.reduce((acc, product) => {
        acc[product.id] = product.title;
        return acc;
      }, {}),
    },
    {
      key: '2',
      feature: 'Brand',
      ...comparedProducts.reduce((acc, product) => {
        acc[product.id] = product.brand;
        return acc;
      }, {}),
    },
    {
      key: '3',
      feature: 'Price',
      ...comparedProducts.reduce((acc, product) => {
        acc[product.id] = `$${product.price}`;
        return acc;
      }, {}),
    },
    {
      key: '4',
      feature: 'Category',
      ...comparedProducts.reduce((acc, product) => {
        acc[product.id] = product.category;
        return acc;
      }, {}),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={false}
      bordered
      rowKey="key"
    />
  );
};

export default CompareProducts;
