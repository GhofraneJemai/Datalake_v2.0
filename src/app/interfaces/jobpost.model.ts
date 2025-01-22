export interface JobPost {
    id: number;
    title: string;
    description: string;
    location: string;
    requirements: string;// Assuming you have an Application interface
    postedAt: string; // Use ISO string for LocalDateTime
  }
  