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
  twitter?: string;
  facebook?: string;
  linkedin?: string;
  youtube?: string;
  instagram?: string;
  handle?: string;
  status?: string;
  website?: string;
  skills?: string;
  githubusername?: string;
  bio?: string;
}

export interface ErrorsRootState {
  errors: ErrorsData;
}
