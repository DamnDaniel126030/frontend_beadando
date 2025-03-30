import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateConcertDto {
    @IsString()
    @IsNotEmpty()
    performer: string
    
    @IsDate()
    @IsNotEmpty()
    startTime: Date

    @IsNumber()
    @IsNotEmpty()
    duration: number
}
