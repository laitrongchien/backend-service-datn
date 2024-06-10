import { Controller, Post, Get, Body } from '@nestjs/common';
import { GeminiService } from './gemini.service';
import { GenerateTextDto } from './dto/generate-text.dto';

@Controller('gemini')
export class GeminiController {
  constructor(private readonly geminiService: GeminiService) {}

  @Post('/generate')
  generateText(@Body() generateTextDto: GenerateTextDto) {
    return this.geminiService.generateText(generateTextDto.prompt);
  }

  @Get('/history')
  getHistory() {
    return this.geminiService.getHistory();
  }

  @Get('/new-session')
  startNewChat() {
    return this.geminiService.startNewChat();
  }
}
