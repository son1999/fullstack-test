"use client"

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import productService from '../../services/product.service';
import LoadingComponent from '@/app/components/LoadingComponent';
import { Button, Card, Typography } from 'antd';
import styles from '@/app/page.module.css'
import ProductNotFound from '@/app/components/ProductNotFoundComponent';

type Product = {
    id: number,
    name: string,
    description: string,
    price: number,
    category: string,
}


const ProductDetail = ({params}: any) => {
    const {id} = params; 
    const router = useRouter();
    
    const query = router;
    const [product, setProduct] = useState<Product|null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            fetchProductDetails();
        }
    }, [id]);

    const fetchProductDetails = async () => {
        try {
            const productDetail = await productService.getProductById(id);
            setProduct(productDetail);
            setLoading(false);
        } catch (error) {
            console.error("Failed to fetch product details:", error);
            setLoading(false);
        }
    };

    if (loading) {
        return <LoadingComponent/>;
    }

    if (!product) {
        return <ProductNotFound/>;
    }

    return (
        <div className={styles.centerSpinner}>
            <Card
            style={{ width: '400px' }}  // Adjust width as needed
            cover={<img alt={product.name} src="https://via.placeholder.com/400" />}
        >
            <Typography>{product.name}</Typography>
            <Typography>{product.description}</Typography>
            <div style={{ margin: '20px 0' }}>
            <Typography>Price: ${product.price}</Typography>
            </div>
            <Typography><strong>Category:</strong> {product.category}</Typography>
        </Card>
        <div style={{marginTop: '20px'}}>
            <Button type="primary" href="/product">Back Home</Button>
        </div>
        </div>
    );
};

export default ProductDetail;
