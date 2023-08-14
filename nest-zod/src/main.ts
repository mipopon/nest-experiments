import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { ZodValidationPipe } from '@anatine/zod-nestjs';
import { CreateCatDto } from './cats/dto/create-cat.dto';
import { Cat } from './cats/entity/cat.entity';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const swaggerOptions: SwaggerCustomOptions = {
    customSiteTitle: 'Remailer OpenAPI',
  };

  app.useGlobalPipes(new ZodValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Remailer API')
    .setDescription('Service to communicate with Selligent to send emails.')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const openAPIDocument = SwaggerModule.createDocument(app, config, {
    // models to $ref in Schema Definition
    extraModels: [CreateCatDto, Cat],
  });
  SwaggerModule.setup('docs', app, openAPIDocument, swaggerOptions);

  await app.listen(3000);
}
bootstrap();
