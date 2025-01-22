export interface Application {
    id: number;
    candidate: {
      id: number;
      firstName: string;
      lastName: string;
      email: string;
      phoneNumber: string;
      // Add other candidate-related fields as needed
    };
    jobPost: {
      id: number;
      title: string;
      description: string;
      // Add other job post-related fields as needed
    } | null;
    coverLetter: string;
    cvUrl: string; // URL or path to the uploaded CV file
    status: string; // e.g., "PENDING", "ACCEPTED", "REJECTED"
    createdAt: string; // Date-time string in ISO format
    recruitmentDate: string | null; // Recruitment date as string or null
  }
  