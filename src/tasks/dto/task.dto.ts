import { IsArray, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';
import { TASK_RULE_LENGTH } from "src/config/util";


export class StatusIdDto {
    @IsNotEmpty()
    @IsString()
    readonly statusId: string
}

export class TaskDto extends StatusIdDto {
    @IsNotEmpty()
    @IsString()
    @Length(5, 150, { message: TASK_RULE_LENGTH })
    readonly name: string

    @IsOptional()
    @IsString()
    readonly description?: string
}

export class UpdateOrderDto extends StatusIdDto {
    @IsOptional()
    @IsArray()
    readonly ids?: [string]
}