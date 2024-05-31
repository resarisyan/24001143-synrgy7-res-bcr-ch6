import { Response } from 'express';

interface SuccessResponseParams {
  res: Response;
  message: string;
  data: unknown;
  status: number;
}

export const successResultResponse = ({
  res,
  message,
  data,
  status
}: SuccessResponseParams) => {
  res.status(status).json({
    success: true,
    message,
    data
  });
};

export const successResponse = ({
  res,
  message,
  status
}: Omit<SuccessResponseParams, 'data'>) => {
  res.status(status).json({
    success: true,
    message
  });
};
