import { IsEmpty, IsNumber } from "class-validator"

export class listDto {
    @IsNumber()
    offset: number

    @IsNumber()
    limit: number

    @IsEmpty()
    search: string
}