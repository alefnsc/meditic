export interface GeminiResponse {
    candidates: Array<{
      content: {
        parts: Array<{
          text: string;
        }>;
      };
      finishReason: string;
    }>;
  }