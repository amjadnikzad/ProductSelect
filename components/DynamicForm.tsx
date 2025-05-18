'use client'
import { Form, Input, Button } from 'antd';
import { useEffect } from 'react';
import { useTreeContext } from '../context/TreeContext';






const ProductFormFields = () => (
  <>
    <Form.Item name="name" label="Product Name" rules={[{ required: true }]}>
      <Input />
    </Form.Item>
    <Form.Item name="sku" label="SKU" rules={[{ required: true }]}>
      <Input />
    </Form.Item>
  </>
);

const CategoryFormFields = () => (
  <>
    <Form.Item name="name" label="Category Name" rules={[{ required: true }]}>
      <Input />
    </Form.Item>
    <Form.Item name="description" label="Description">
      <Input.TextArea />
    </Form.Item>
  </>
);
const DynamicForm = ({className}) => {
  const { selectedNode } = useTreeContext();
  const [form] = Form.useForm();

  const isAdd = selectedNode?.isAdd;
  const type = selectedNode?.type || 'product';

  useEffect(() => {
    if (isAdd) {
      form.resetFields();
    } else if (selectedNode) {
      form.setFieldsValue(selectedNode); // Assuming node has matching keys
    }
  }, [selectedNode]);

  const handleFinish = (values: any) => {
    if (isAdd) {
      console.log(`Adding new ${type}`, values);
    } else {
      console.log(`Updating ${type}`, values);
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleFinish}
      className={className}
    >
      <h2 className="text-xl font-semibold mb-2">
        {isAdd ? `Add New ${type}` : `Edit ${type}`}
      </h2>

      {type === 'product' ? <ProductFormFields /> : <CategoryFormFields />}

      <Button type="primary" htmlType="submit">
        {isAdd ? `Add ${type}` : `Update ${type}`}
      </Button>
    </Form>
  );
};

export default DynamicForm;





