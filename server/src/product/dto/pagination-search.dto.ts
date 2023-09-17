import { IsOptional, IsInt, Min, Max } from 'class-validator';

export class PaginationSearchDto {
    @IsOptional()
    @IsInt()
    @Min(1)
    page?: number;

    @IsOptional()
    name?: string;

    @IsOptional()
    category?: string;
}