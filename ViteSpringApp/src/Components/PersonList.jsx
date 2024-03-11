import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, message, DatePicker } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import axios from 'axios';

const PersonList = () => {
    const [persons, setPersons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [personToEdit, setPersonToEdit] = useState(null);
    const [personNameToEdit, setPersonNameToEdit] = useState(null);

    const [showEditModal, setShowEditModal] = useState(false);

    const [form] = Form.useForm();

    useEffect(() => {
        fetchPersons();
    }, []);

    const fetchPersons = async () => {
        try {
            const response = await fetch('https://spring-react-crud-app.onrender.com/person/get', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            // data : Array(10) [
            //     { id: 1, name: 'John Smith', birthdate: '1990-01-01' },
            //     { id: 2, name: 'Emily Johnson', birthdate: '1991-02-02' },
            //     { id: 3, name: 'Michael Williams', birthdate: '1992-03-03' },
            //     { id: 4, name: 'Sarah Jones', birthdate: '1993-04-04' },
            //     { id: 5, name: 'Daniel Brown', birthdate: '1994-05-05' },
            //     { id: 7, name: 'Matthew Taylor', birthdate: '1996-07-07' },
            //     { id: 8, name: 'Lauren Martinez', birthdate: '1997-08-08' },
            //     { id: 9, name: 'Christopher Anderson', birthdate: '1998-09-09' }
            //   ]

            console.log('Fetched persons:', data)
            setPersons(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching persons:', error);
            setLoading(false);
        }
    };

    const mapFetchDataToTableData = (data) => {
        if (!data) {
            return [];
        }
        return data.map((person, index) => {
            return {
                key: index,
                id: person.id,
                name: person.name,
                birthdate: person.birthdate,
            };
        });
    };

    const columns = [
        { title: 'ID', dataIndex: 'id', key: 'id' },
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Birthday', dataIndex: 'birthdate', key: 'birthdate' },
        {
            title: 'Update', dataIndex: 'update', key: 'update', render: (text, record) => (
                <Button
                    style={{
                        backgroundColor: '#00000000',
                        color: 'black',
                    }}
                    type="primary"
                    icon={<EditOutlined />}
                    onClick={() => {
                        const id = persons.find((person) => person.name === record.name).id;
                        setPersonToEdit(id);
                        setPersonNameToEdit(record.name);
                        form.setFieldsValue({ name: record.name });
                        setShowEditModal(true);
                    }}
                />
            )
        },
    ];

    const onFinish = async (values) => {
        try {
            await axios.put(`https://spring-react-crud-app.onrender.com/person/update/${personToEdit}`, {
                name: values.name,
                birthdate: values.birthdate.toString()
            });
            message.success('Person updated successfully');
            // Update the specific person's data in the state
            setPersons(prevPersons => {
                const updatedPersons = prevPersons.map(person => {
                    if (person.id === personToEdit) {
                        return { ...person, name: values.name, birthdate: values.birthdate.toString() };
                    }
                    return person;
                });
                return updatedPersons;
            });

            setShowEditModal(false);
            form.resetFields();
        } catch (error) {
            console.error('Error updating person:', error);
            message.error('Failed to update person');
        }
    };
    const handleDeletePerson = async (id) => {
        try {
            await axios.delete(`https://spring-react-crud-app.onrender.com/person/delete/${id}`);
            message.success('Person deleted successfully');
            fetchPersons();
        } catch (error) {
            console.error('Error deleting person:', error);
            message.error('Failed to delete person');
        }
    };

    return (
        <div>
            <h2>Person List</h2>
            <Table dataSource={mapFetchDataToTableData(persons)} columns={columns} pagination={{ pageSize: 5 }} />
            <Button type="primary" onClick={fetchPersons} loading={loading} style={{ marginTop: '20px' }}>
                Refresh
            </Button>

            <Modal title="Edit Person" open={showEditModal} onCancel={() => {
                setShowEditModal(false)
                form.resetFields()
            }} footer={[
                <Button key="delete" type="primary" danger onClick={() => {
                    handleDeletePerson(personToEdit)
                    setShowEditModal(false)
                }

                }>Delete Person</Button>,
                <Button key="cancel" onClick={() => setShowEditModal(false)}>
                    Cancel
                </Button>,
                <Button key="submit" type="primary" onClick={() => form.submit()} disabled={personToEdit == null}>
                    Ok
                </Button>,
            ]}>
                <Form form={form} onFinish={onFinish} layout="vertical">
                    <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please input the name' }]}>
                        <Input placeholder="Name" />
                    </Form.Item>
                    <Form.Item name="birthdate" label="Birthday">
                        <DatePicker
                            format="YYYY-MM-DD"
                            placeholder="Birthday"
                            required
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default PersonList;
