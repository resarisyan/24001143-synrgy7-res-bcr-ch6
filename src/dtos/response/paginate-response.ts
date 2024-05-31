import { Model, Page } from 'objection';
export interface PaginatedResponse<T> {
  data: T[];
  totalRecords: number;
  metadata: {
    page: number;
    size: number;
    totalPages: number;
    next: number;
  };
}

export function toPaginatedResponse<T extends Model, R>(
  page: Page<T>,
  pageRequest: { page: number; size: number },
  toResponse: (model: T) => R
): PaginatedResponse<R> {
  return {
    data: page.results.map(toResponse),
    totalRecords: page.total,
    metadata: {
      page: pageRequest.page,
      size: pageRequest.size,
      totalPages: Math.ceil(page.total / pageRequest.size),
      next: pageRequest.page + 1
    }
  };
}
