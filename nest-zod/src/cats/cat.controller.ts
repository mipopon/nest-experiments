import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Post,
  UsePipes,
} from '@nestjs/common';
import { Cat, CatZ } from './entity/cat.entity';
import { CreateCatDto } from './dto/create-cat.dto';
import { ApiBody, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { CatService } from './cat.service';

@ApiTags('Cat')
@Controller({ path: 'cat' })
export class CatController {
  constructor(private readonly catService: CatService) {}

  @Get()
  getCat(): Cat {
    return CatZ.parse({
      name: 'Mik',
      age: 3,
      breed: 'Norwegian Forest Cat',
    });
  }

  @ApiBody({
    // actually gets the enum and min max requirements for age property. nice
    schema: { $ref: getSchemaPath(CreateCatDto) },
    examples: {
      basic: { value: { name: 'Mugi', age: 3, breed: 'British Shorthair' } },
    },
  })
  @Post()
  createCat(@Body() dto: CreateCatDto): Cat {
    const cat = this.catService.createCat(dto);
    if (cat.success === false) {
      console.log('-- cat.controller.ts:33 --', cat.error);
      throw new InternalServerErrorException();
    }

    return cat.data;
  }
}
