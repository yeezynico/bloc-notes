import React, { useState, useEffect } from 'react';
import { MailOutlined } from '@ant-design/icons';
import { Menu } from 'antd';

const items = [
  {
    key: 'sub1',
    label: 'Navigation One',
    icon: <MailOutlined />,
  },
  {
    key: 'grp',
    label: 'Group',
    type: 'group',
  },
];

const App = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = () => {
    const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    setNotes(savedNotes);
  };

  const renderNotes = () => {
    return notes.map((note, index) => (
      <Menu.Item key={`note-${index}`}>
        <span>{note.title}</span>
      </Menu.Item>
    ));
  };

  const onClick = (e) => {
    console.log('click ', e);
  };

  return (
    <div className='sidebar'>
      <Menu
        onClick={onClick}
        style={{
          width: 256,
        }}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        items={items}
      >
        <Menu.ItemGroup key="grp" title="Group">
          {renderNotes()}
        </Menu.ItemGroup>
      </Menu>
    </div>
  );
};

export default App;
