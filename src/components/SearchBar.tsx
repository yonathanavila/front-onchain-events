"use client";
import React from 'react';
import { AudioOutlined } from '@ant-design/icons';
import { Input, Space } from 'antd';

const { Search } = Input;

const suffix = (
    <AudioOutlined
        style={{
            fontSize: 16,
            color: '#1890ff',
        }}
    />
);

const onSearch = (value: string) => console.log(value);

const SearchBar: React.FC = () => (
    <Space direction="vertical">
        <Search
            placeholder="Search event"
            allowClear
            enterButton="Search"
            size="large"
            className='search-bar'
            onSearch={onSearch}
        />
        <br />
        <br />
    </Space>
);

export default SearchBar;