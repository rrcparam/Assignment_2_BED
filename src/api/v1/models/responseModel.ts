

export interface ApiResponse<T> {
  success: boolean;              
  message?: string | string[];
  data?: T;
  error?: string | string[];
  code?: string;
}


export const successResponse = <T>(
  data?: T,
  message?: string
): ApiResponse<T> => ({
  success: true,
  message,
  data,
});


export const errorResponse = (
  message: string,
  code?: string
): ApiResponse<null> => ({
  success: false,
  message,
  code,
});
