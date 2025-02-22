import { z } from 'zod';
import { ValidationError } from './errors1';

export const medicineNameSchema = z.object({
  medicineName: z.string()
    .min(2, 'Medicine name must be at least 2 characters long')
    .max(100, 'Medicine name cannot exceed 100 characters')
    .regex(/^[a-zA-Z0-9\s-]+$/, 'Medicine name contains invalid characters'),
});

export const validateMedicineName = (data: unknown) => {
  try {
    return medicineNameSchema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new ValidationError('Invalid medicine name', {
        validation: error.errors,
      });
    }
    throw error;
  }
};