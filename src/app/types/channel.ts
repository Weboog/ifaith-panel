enum ActiveStatus {
  Enabled,
  Disabled,
}
export interface Channel {
  id: string,
  hash: string,
  ord: number,
  channel: string,
  stream: string,
  guide: string,
  active: ActiveStatus;
  guideFile: {exists: boolean, path: string},
  created_at?: string
  modified_at?: string
}
