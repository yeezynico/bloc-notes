import React, { useState, useEffect } from 'react';
import Showdown from 'showdown';
import NoteDisplay from './NoteDisplay';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    DeleteOutlined,
    EditOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme, Form, Input} from 'antd';

const { Header, Sider, Content } = Layout;
const {TextArea} = Input;

const Appe = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [markdownContent, setMarkdownContent] = useState('');
    const [title, setTitle] = useState('');
    const [savedEntries, setSavedEntries] = useState([]);
    const [form] = Form.useForm();
    const converter = new Showdown.Converter({ simpleLineBreaks: true });

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    useEffect(() => {
        const savedEntriesJson = localStorage.getItem('savedEntries');
        if (savedEntriesJson) {
            setSavedEntries(JSON.parse(savedEntriesJson));
        }
    }, []);

    const handleMarkdownChange = (event) => {
        setMarkdownContent(event.target.value);
    };

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleSave = () => {
        const newEntry = { title, markdownContent };
        const existingEntryIndex = savedEntries.findIndex(entry => entry.title === title);
        if (existingEntryIndex !== -1) {
            const updatedEntries = [...savedEntries];
            updatedEntries[existingEntryIndex] = newEntry;
            localStorage.setItem('savedEntries', JSON.stringify(updatedEntries));
            setSavedEntries(updatedEntries);
        } else {
            const newEntries = [...savedEntries, newEntry];
            localStorage.setItem('savedEntries', JSON.stringify(newEntries));
            setSavedEntries(newEntries);
        }
        setTitle('');
        setMarkdownContent('');
    };

    const handleDelete = (index) => {
        const updatedEntries = [...savedEntries];
        updatedEntries.splice(index, 1);
        localStorage.setItem('savedEntries', JSON.stringify(updatedEntries));
        setSavedEntries(updatedEntries);
    };

    const handleEdit = (entry) => {
        setTitle(entry.title);
        setMarkdownContent(entry.markdownContent);
    };

    return (
        <Layout style={{ minHeight: '100vh' }} >
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="demo-logo-vertical" />
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} >
                    {savedEntries.map((entry, index) => (
                        <Menu.Item key={index}>
                            <div className='red'>
                                <div className='title_red' onClick={() => handleEdit(entry)}>{entry.title}</div>
                                <div className='edit_button'><Button type="text" icon={<EditOutlined />} onClick={() => handleEdit(entry)} /></div>
                                <button onClick={() => handleDelete(index)}><DeleteOutlined /></button>
                            </div>
                        </Menu.Item >
                    ))}
                </Menu>
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer }}>
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <NoteDisplay title={form.getFieldValue('title') || title} markdownContent={markdownContent} />
                    <div className='machin'>
                        <div className='truc'>
                            <div className='column-input'>
                                <Form form={form} layout="vertical" >
                                    <Form.Item label="Titre" name="title" rules={[{ required: true, message: 'Veuillez saisir un titre' }]} >
                                        <TextArea
                                            placeholder="Titre"
                                            value={title}
                                            onChange={handleTitleChange}
                                        />
                                    </Form.Item>
                                    <Form.Item label="Contenu" name="content" rules={[{ required: true, message: 'Veuillez saisir du contenu' }]}>
                                        <TextArea
                                            placeholder="Saisir le Markdown..."
                                            value={markdownContent}
                                            onChange={handleMarkdownChange}
                                        />
                                    </Form.Item>
                                    <Form.Item>
                                        <Button type="primary" onClick={handleSave}>Enregistrer</Button>
                                    </Form.Item>
                                </Form>
                            </div>
                        </div>
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};

export default Appe;
