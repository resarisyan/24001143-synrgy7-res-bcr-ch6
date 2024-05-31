import { z, ZodType } from 'zod';

export class UserValidation {
  static readonly LOGIN: ZodType = z.object({
    username: z.string().min(1).max(255),
    password: z.string().min(1).max(255)
  });

  static readonly REGISTER: ZodType = z.object({
    name: z.string().min(1).max(255),
    username: z.string().min(1).max(255),
    password: z.string().min(1).max(255),
    role: z.enum(['ADMIN', 'SUPERADMIN', 'MEMBER']).optional()
  });

  static readonly UPDATE: ZodType = z.object({
    name: z.string().min(1).max(255).optional(),
    username: z.string().min(1).max(255).optional(),
    password: z.string().min(1).max(255).optional()
  });
}
