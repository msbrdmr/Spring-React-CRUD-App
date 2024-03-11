import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, message, DatePicker } from 'antd';
import { EditOutlined } from '@ant-design/icons';

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
            const response = await fetch('https://spring-crud-server.onrender.com/api/persons/getAll', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();

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

    const onEditPerson = async (values) => {
        try {
            if (!values.name || !values.birthdate) {
                message.error('Please fill in all the fields');
                return;
            }
            console.log("updating person", values)
            const response = await fetch(`https://spring-crud-server.onrender.com/api/persons/update/${personToEdit}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: values.name, birthdate: values.birthdate.format('YYYY-MM-DD') }),
            });
            console.log('Updated person:', response);
            setPersons(prevPersons => {
                const updatedPersons = prevPersons.map(person => {
                    if (person.id === personToEdit) {
                        return { ...person, name: values.name, birthdate:  values.birthdate.format('YYYY-MM-DD') };
                    }
                    return person;
                });
                return updatedPersons;
            });

            message.success('Person updated successfully');
            setShowEditModal(false);
            form.resetFields();
        } catch (error) {
            console.error('Error updating person:', error);
            message.error('Failed to update person');
        }
    };
    const handleDeletePerson = async (id) => {
        try {
            const response = await fetch(`https://spring-crud-server.onrender.com/api/persons/delete/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
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
                <Form form={form} onFinish={onEditPerson} layout="vertical">
                    <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please input the name' }]}>
                        <Input placeholder="Name" required />
                    </Form.Item>
                    <Form.Item name="birthdate" label="Birthday">
                        <DatePicker
                            format="YYYY-MM-DD"
                            valueFormat="YYYY-MM-DD"
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
