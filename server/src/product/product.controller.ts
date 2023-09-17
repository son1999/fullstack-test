import { Controller, Get, InternalServerErrorException, NotFoundException, Param, Post, Query, Req, Res } from '@nestjs/common';
import uri from '../configs/uri';
import { ProductService } from './product.service';
import { PaginationSearchDto } from './dto/pagination-search.dto';
import { Response } from 'express';

@Controller(uri.PRODUCT)
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @Post(uri.POPULATE)
    async populateSampleProducts() {
        await this.productService.createSampleProducts();
        return { message: 'Sample products created' };
    }

    @Get('/')
    async getProducts(@Query() paginationSearchDto: PaginationSearchDto, @Res() res: Response) {
        const data = await this.productService.getProducts(paginationSearchDto);
        res.status(200).json(data);
    }

    @Get(':id')
    async getProductById(@Param('id') id: number, @Res() res: Response) { 
        console.log('900398942706368513', id);
           
        const product = await this.productService.getProductById(id);
        if (!product) {
            throw new NotFoundException('Product not found');
        }
        res.status(200).json(product);
    }
}
