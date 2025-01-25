 // Make sure the path is correct
import { Candidate } from './candidate.model';
import { JobPost } from './jobpost.model';

export interface Application {
  id: number;
  candidate: Candidate;
  jobPost: JobPost;
  coverLetter: string;
  cvUrl: string;
  status: string;
  createdAt: string;
  recruitmentDate: string | null; // Depending on your data, it might be null
}
