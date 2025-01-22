export interface Employee {
    id?: number; // Matches Long in Java
    firstName: string;
    lastName: string;
    email: string;
    dob: string; // ISO string format ('YYYY-MM-DD')
    gender: string;
    education: string;
    company: string;
    experience: number; // Matches int in Java
    salaryPackage: number; // Matches double in Java
  }
  