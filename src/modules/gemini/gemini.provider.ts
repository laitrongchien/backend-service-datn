import { GenerativeModel, GoogleGenerativeAI } from '@google/generative-ai';
import { Provider } from '@nestjs/common';
import { GENERATION_CONFIG, SAFERY_SETTINGS } from './gemini.config';
import { GEMINI_MODEL } from './gemini.constant';

export const GeminiModelProvider: Provider<GenerativeModel> = {
  provide: GEMINI_MODEL,
  useFactory: () => {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    return genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      generationConfig: GENERATION_CONFIG,
      safetySettings: SAFERY_SETTINGS,
    });
  },
};
