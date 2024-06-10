import { Module } from '@nestjs/common';
import { GeminiModelProvider } from './gemini.provider';
import { GeminiService } from './gemini.service';
import { GeminiController } from './gemini.controller';

@Module({
  controllers: [GeminiController],
  providers: [GeminiService, GeminiModelProvider],
})
export class GeminiModule {}
