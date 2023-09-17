// ProductTable.tsx

import { useRouter } from 'next/navigation';
import { Table } from 'antd';
import productService from '../services/product.service';

interface Product {
    id: number,
    name: string,
    descripton: string, 
    price: number,
    category: string,
}

interface ProductTableProps {
    data: Product[]; 
    loading: boolean;
    pagination: any;
  }

const ProductTable: React.FC<ProductTableProps> = ({data, loading, pagination}) => {
    const router = useRouter();

    const redirectToProductDetail = (id: number) => {
        router.push(`/product/${id}`);
    };
    
  const columns = [
    {
        title: 'Id',
        dataIndex: 'id', 
        key: 'id',
    },
    {
        title: 'Name',
        dataIndex: 'name', 
        key: 'name',
    },
    {
        title: 'Description',
        dataIndex: 'description', 
        key: 'description',
    },
    {
        title: 'Price',
        dataIndex: 'price', 
        key: 'price',
    },
    {
        title: 'Category',
        dataIndex: 'category', 
        key: 'category',
    },
  ];

  return (
    <Table columns={columns} style={{marginTop: '8px', cursor: 'pointer'}} dataSource={data} loading={loading} pagination={{
        pageSize: 20,
        showSizeChanger: false,
        total: pagination.total,
        current: pagination.current,
        onChange: pagination.onChange
    }} 
    rowKey="id" 
    onRow={(record: Product) => {
        return {
            onClick: () => redirectToProductDetail(record.id)
        };
    }}/>
  );
};

export default ProductTable;
