import { IsNotEmpty } from 'class-validator';

export class CreateTaskTdo {

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}
