// types/job.ts
export type JobStatus = 'OPEN' | 'CLOSED' | 'ARCHIVED';

export interface Job {
  id: string;
  title: string;
  companyName: string;
  location: string;
  type: string;
  salary: string;
  description?: string;
  createdAt: Date;
  status: JobStatus;
}