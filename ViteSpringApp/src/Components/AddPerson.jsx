import React, { useState } from 'react';
import { Form, Input, Button, message ,DatePicker} from 'antd';
import axios from 'axios';

const AddPerson = () => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      await axios.post('http://localhost:8080/api/persons/add', { name: values.name, birthdate: values.birthdate.toString() });
      message.success('Person added successfully');
      form.resetFields();
    } catch (error) {
      console.error('Error adding person:', error);
      message.error('Failed to add person');
    }
  };

  return (
    <div>
      <h2>Add Person</h2>
      <Form form={form} onFinish={onFinish} layout="inline">
        <Form.Item name="name" label="Name">
          <Input placeholder="Name" />
        </Form.Item>
        <Form.Item name="birthdate" label="Birthday">
          <DatePicker
            format="YYYY-MM-DD"
            placeholder="Birthday"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">Add Person</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddPerson;
