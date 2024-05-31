export interface CreateCarRequest extends Request {
  plate: string;
  manufacture: string;
  model: string;
  image: string;
  rentPerDay: number;
  capacity: number;
  description: string;
  transmission: string;
  year: number;
  created_by: string;
}

export interface UpdateCarRequest extends Request {
  id: string;
  plate?: string;
  manufacture?: string;
  model?: string;
  image?: string;
  rentPerDay?: number;
  capacity?: number;
  description?: string;
  transmission?: string;
  year?: number;
  updated_by: string;
}
