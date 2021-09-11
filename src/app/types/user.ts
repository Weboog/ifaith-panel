export interface User {
  id: string,
  hash: string,
  first_name?: string,
  last_name?: string,
  email: string,
  active: boolean,
  created_at: string
}
