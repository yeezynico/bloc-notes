import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
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
      />
      </div>
    );
  };
  export default App;