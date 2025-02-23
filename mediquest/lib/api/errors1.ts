export class APIError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public code: string,
    public details?: unknown // Changed from `any` to `unknown`
  ) {
    super(message);
    this.name = 'APIError';
  }
}

export class ValidationError extends APIError {
  constructor(message: string, details?: unknown) { // Changed from `any` to `unknown`
    super(message, 400, 'VALIDATION_ERROR', details);
  }
}

export class GeminiError extends APIError {
  constructor(message: string, details?: unknown) { // Changed from `any` to `unknown`
    super(message, 500, 'GEMINI_ERROR', details);
  }
}

export const handleAPIError = (error: unknown) => {
  console.error('API Error:', error);

  if (error instanceof APIError) {
    return {
      error: {
        message: error.message,
        code: error.code,
        details: error.details,
      },
      status: error.statusCode,
    };
  }

  // Handle unexpected errors
  return {
    error: {
      message: 'An unexpected error occurred',
      code: 'INTERNAL_SERVER_ERROR',
      details: process.env.NODE_ENV === 'development' ? error : undefined,
    },
    status: 500,
  };
};
