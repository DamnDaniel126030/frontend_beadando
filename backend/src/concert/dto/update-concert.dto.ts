import { PartialType } from '@nestjs/mapped-types';
import { CreateConcertDto } from './create-concert.dto';
import { IsBoolean, IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateConcertDto extends PartialType(CreateConcertDto) {
    @IsString()
    @IsOptional()
    performer?: string;

    @IsDate()
    @IsOptional()
    startTime?: Date;

    @IsNumber()
    @IsOptional()
    duration?: number;

    @IsBoolean()
    @IsOptional()
    isCancelled?: boolean
}
