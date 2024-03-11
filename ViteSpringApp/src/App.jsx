import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import PersonList from './Components/PersonList';
import AddPerson from './Components/AddPerson';

const { Header, Content } = Layout;

function App() {
  const [selectedMenuItem, setSelectedMenuItem] = useState('1');

  const renderContent = () => {
    if (selectedMenuItem === '1') {
      return <PersonList />;
    } else if (selectedMenuItem === '2') {
      return <AddPerson />;
    } else {
      return null;
    }
  };

  const items = [
    { key: '1', label: 'Person List' },
    { key: '2', label: 'Add Person' },
  ];
  

  return (
    <Layout className="layout" style={{ width: "800px", height: "800px", padding: '0 0 20px 0' }}>
      <Header>
        <div className="logo" />
        <Menu
          theme="dark"
          items = {items}
          mode="horizontal"
          selectedKeys={[selectedMenuItem]}
          onClick={({ key }) => setSelectedMenuItem(key)}
        >
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <div className="site-layout-content">{renderContent()}</div>
      </Content>
    </Layout>
  );
}

export default App;
