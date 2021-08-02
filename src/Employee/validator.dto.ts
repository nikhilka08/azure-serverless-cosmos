import { IsNotEmpty, IsString } from 'class-validator';

export class PersonGroupIDDto {
  @IsString()
  @IsNotEmpty()
  personId: string;

  @IsString()
  @IsNotEmpty()
  groupId: string;
}