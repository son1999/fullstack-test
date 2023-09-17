"use client";

import { useEffect, useState } from 'react';
import ProductTable from '../components/TableComponent';
import styles from '../page.module.css'
import productService from '../services/product.service';
import { Button, Form, Input, Typography } from 'antd';
import LoadingComponent from '../components/LoadingComponent';

const Product: React.FC = () => {
  const [searchParams, setSearchParams] = useState({ name: '', category: '' });
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 20, 
    total: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await productService.getProductsOrSearch();
        setData(result.data.data || []);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);  

  const handleSearch = async (name: string, category: string, page: number = 1) => {
    setLoading(true);
    try {
      const result = await productService.getProductsOrSearch(name, category, page, pagination.pageSize);      
      setData(result.data.data);
      setPagination({
        ...pagination,
        current: page,
        total: result.pagination.totalCount,
      });
    } catch (error) {
      console.error('Error searching products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSearch(searchParams.name, searchParams.category);
  }, [searchParams.name, searchParams.category, pagination.pageSize]);

  const handleTableChange = (pagination: any) => {    
    handleSearch(searchParams.name, searchParams.category, pagination);
  };

  const onFinish = (values: any) => {
    setSearchParams({
        name: values.name || '',
        category: values.category || ''
    });
  };



  return (
    <>
      {(!data || data.length === 0) && loading ? (
        <LoadingComponent />
      ) : (
        <main className={styles.layout}>
          <div>
            <Form layout="inline" onFinish={onFinish} style={{ marginBottom: '10px' }}>
              <Form.Item name="name">
                  <Input placeholder="Product Name" />
              </Form.Item>
              <Form.Item name="category">
                  <Input placeholder="Category" />
              </Form.Item>
              <Form.Item>
                  <Button type="primary" htmlType="submit">
                      Search
                  </Button>
              </Form.Item>
            </Form>
            <Typography>Total Products: {pagination.total}</Typography>
            <ProductTable 
              data={data} 
              loading={loading} 
              pagination={{
                ...pagination,
                onChange: handleTableChange
              }}
            />
          </div>
        </main>
      )}
    </>
  );
}

export default Product;
