import { GenerativeModel, ChatSession } from '@google/generative-ai';
import { Inject, Injectable } from '@nestjs/common';
import { createContent } from './helpers/content.helper';
import { GEMINI_MODEL } from './gemini.constant';

// interface GenAIResponse {
//   totalTokens: number;
//   text: string;
// }

@Injectable()
export class GeminiService {
  private chat: ChatSession;
  constructor(
    @Inject(GEMINI_MODEL) private readonly geminiModel: GenerativeModel,
  ) {
    this.chat = this.geminiModel.startChat({
      history: [],
    });
  }

  async generateText(prompt: string) {
    const contents = createContent(prompt);
    const { totalTokens } = await this.geminiModel.countTokens({ contents });

    // const chat = this.geminiModel.startChat({
    //   history: [],
    // });

    // const result = await this.geminiModel.generateContent({ contents });
    // const response = await result.response;
    // const text = response.text();
    const result = await this.chat.sendMessageStream(prompt);
    // const response = await result.response;
    // const text = response.text();
    let text = '';
    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      console.log(chunkText);
      text += chunkText;
    }

    return { totalTokens, text };
  }

  async getHistory() {
    return await this.chat.getHistory();
  }

  async startNewChat() {
    this.chat = this.geminiModel.startChat({
      history: [],
    });
  }
}
