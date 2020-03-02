export const GET_ERRORS = 'GET_ERRORS';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';

export interface ErrorsData {
  email?: string;
  name?: string;
  password?: string;
  password2?: string;
  schoolId?: string;
  degree?: string;
  fieldOfStudy?: string;
  from?: string;
  to?: string;
  description?: string;
  title?: string;
  company?: string;
  location?: string;
}

export interface ErrorsRootState {
  errors: ErrorsData;
}
