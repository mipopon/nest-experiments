import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { z } from 'zod';
import { CatBreed } from '../entity/cat-breed';
import { ApiExtraModels } from '@nestjs/swagger';

export const CreateCatZ = extendApi(
  z.object({
    name: z.string(),
    age: z.number().min(0).max(100),
    breed: z.enum(CatBreed),
  }),
);

// TODO: find out why IDE does not show property for this Class
@ApiExtraModels()
export class CreateCatDto extends createZodDto(CreateCatZ) {}
