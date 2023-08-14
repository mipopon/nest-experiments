## Test NestJS with [zod](https://zod.dev/)

### integrate with [@anatine/zod-nestjs](https://github.com/anatine/zod-plugins/tree/main/packages/zod-nestjs).

add global pipe in main.ts
```ts
app.useGlobalPipes(new ZodValidationPipe());
```

build zod object

```ts
export const CreateCatZ = extendApi(
  z.object({
    name: z.string(),
    age: z.number().min(0).max(100),
    breed: z.enum(CatBreed),
  }),
);
```

build DtoClass

```ts
export class CreateCatDto extends createZodDto(CreateCatZ) {}
```

use dto in controller

```ts
class CatController {
  @Post()
  createCat(@Body() dto: CreateCatDto) {
    // ...
  }
}
```

potential other options 
- [nestjs-zod](https://github.com/risen228/nestjs-zod)
- [zod-dto](https://github.com/kbkk/abitia/tree/master/packages/zod-dto)

