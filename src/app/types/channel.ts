enum ActiveStatus {
  Enabled,
  Disabled,
}
export interface Channel {
  id: string,
  user_hash: string,
  hash: string,
  ord: number,
  category: number,
  channel: string,
  stream: string,
  guide: string,
  active: ActiveStatus;
  guideFile: {exists: boolean, path: string},
  created_at?: string
  modified_at?: string
}
