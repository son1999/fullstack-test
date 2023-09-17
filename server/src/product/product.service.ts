import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository, ILike, FindOneOptions } from 'typeorm';
import { Product } from './entities/product.entity';
import { getRandomPrice } from '../helpers/fundRandomPrice';
import containt from '../configs/containt';
import { PaginationSearchDto } from './dto/pagination-search.dto';


@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private productsRepository: Repository<Product>,
    ) { }

    async createSampleProducts() {
        const sampleProducts = [];

        for (let i = 0; i < 100000; i++) {
            const product = this.productsRepository.create({
                name: `SampleProduct${i}`,
                description: `SampleDescription${i}`,
                price: getRandomPrice(),
                category: `SampleCategory${i}`,
            });

            sampleProducts.push(product);

            if ((i + 1) % containt.CHUNK_SIZE === 0 || i === 99999) {
                await this.productsRepository.save(sampleProducts);
                sampleProducts.length = 0;
            }
        }

        return await this.productsRepository.save(sampleProducts);
    }

    async getProducts(paginationSearchDto: PaginationSearchDto) {
        let {page, name, category } = paginationSearchDto;
        page = Number(page) || containt.MIN;
        const skip = (page - 1) || containt.SKIP;
        const take = containt.TAKE
        let products: Product[];

        const whereClause: any = {};

        if (name) {
            whereClause.name = ILike(`%${name}%`);
        }
    
        if (category) {
            whereClause.category = ILike(`%${category}%`);
        }

        products = await this.productsRepository.find({
            where: whereClause,
            skip: skip,
            take: take,
            order: { id: 'DESC' }
        });

        const totalCount = await this.productsRepository.count({
            where: whereClause
        });

        const itemCount = products.length;
        const pageCount = Math.ceil(totalCount / take);
        const hasPreviousPage = page > 1;
        const hasNextPage = page < pageCount;

        return {
            data: products,
            page: page,
            take: take,
            itemCount: itemCount,
            pageCount: pageCount,
            hasPreviousPage: hasPreviousPage,
            hasNextPage: hasNextPage,
            totalCount: totalCount
        };
    }

    async getProductById(id: number) {
        const product = await this.productsRepository.findOne({
            where: {
                id: id
            }
        })
        
        if (!product) {
            return null;
        }

        return product;
    }
}