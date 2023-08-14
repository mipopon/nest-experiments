import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { z } from 'zod';
import { CatBreed } from './cat-breed';

export const CatZ = extendApi(
  z.object({
    name: z.string(),
    age: z.number().gt(0).lt(30),
    breed: z.enum(CatBreed),
  }),
  {
    title: 'Cat',
    description: 'A cat',
  },
);

// TODO: find out why IDE does not show anything for this Class
export class Cat extends createZodDto(CatZ) {}
