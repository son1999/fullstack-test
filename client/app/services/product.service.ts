import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
interface ApiResponse {
    data: [],
    page: number,    
    itemCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
    totalCount: number;
}

const productService = {
    getProductsOrSearch: async (name?: string, category?: string, page: number = 1, pageSize: number = 20) => {
        let params: any = {
          page: page,
          take: pageSize
        };
        if (name) params.name = name;
        if (category) params.category = category;
        
        try {
          const response = await axios.get<ApiResponse>(`${BASE_URL}/product/`, { params });
          
          return {
            data: response.data,
            pagination: {
                page: response.data.page,
                itemCount: response.data.itemCount,
                pageCount: response.data.pageCount,
                hasPreviousPage: response.data.hasPreviousPage,
                hasNextPage: response.data.hasNextPage,
                totalCount: response.data.totalCount,
            }
          };
        } catch (error) {
          throw error;
        }
      },

    getProductById: async (id: string | number) => {
        try {
            const response = await axios.get(`${BASE_URL}/product/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
}

export default productService;