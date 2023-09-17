import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';
import { IsNotEmpty, IsString, IsNumber, Min, Max } from 'class-validator';
import containt from '../../configs/containt';

@Entity('products')
@Index('idx_category', ['category'])
@Index('idx_name', ['name'])
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @IsNotEmpty()
    @IsString()
    @Column({ type: 'text' })
    name: string;

    @IsString()
    @Column({ type: 'text', nullable: true })
    description: string;

    @IsNotEmpty()
    @IsNumber()
    @Min(containt.MIN)
    @Max(containt.MAX)
    @Column({ type: 'numeric', precision: 10, scale: 2 })
    price: number;

    @IsNotEmpty()
    @IsString()
    @Column({ type: 'text', nullable: true })
    category: string;
}