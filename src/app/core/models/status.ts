export interface Status {
  apiVersion: string;
  kind: string;
  metadata: object;
  status: string;
  message: string;
  reason: string;
  details: object;
  code: number;
}