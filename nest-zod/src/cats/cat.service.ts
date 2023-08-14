import { Injectable } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { Cat, CatZ } from './entity/cat.entity';
import { SafeParseReturnType } from 'zod';

@Injectable()
export class CatService {
  createCat(dto: CreateCatDto): SafeParseReturnType<CreateCatDto, Cat> {
    return CatZ.safeParse(dto);
  }
}
