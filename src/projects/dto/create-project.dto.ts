import { IsOptional, IsString, IsNotEmpty, Length } from "class-validator"
import { PROJECT_RULE_LENGTH } from "src/config/util"


export class UserId {
    @IsNotEmpty()
    @IsString()
    readonly userId: string
}

export class SandOneProjectDto extends UserId {
    @IsOptional()
    @IsString()
    readonly id: string
}

export class ProjectDto extends SandOneProjectDto {
    @IsNotEmpty()
    @IsString()
    @Length(4, 150, { message: PROJECT_RULE_LENGTH })
    readonly name: string

    @IsOptional()
    @IsString()
    readonly description?: string
}
