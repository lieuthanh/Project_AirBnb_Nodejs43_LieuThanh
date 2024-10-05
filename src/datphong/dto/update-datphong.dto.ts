import { PartialType } from '@nestjs/mapped-types';
import { CreateDatphongDto } from './create-datphong.dto';

export class UpdateDatphongDto extends PartialType(CreateDatphongDto) {}
