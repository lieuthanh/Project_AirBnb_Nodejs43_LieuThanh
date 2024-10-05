import { PartialType } from '@nestjs/mapped-types';
import { CreateVitriDto } from './create-vitri.dto';

export class UpdateVitriDto extends PartialType(CreateVitriDto) {}
