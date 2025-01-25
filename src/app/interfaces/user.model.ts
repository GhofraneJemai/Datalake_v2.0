export enum Role {
    ADMIN = "ADMIN",
    CANDIDATE = "CANDIDATE",
    // Add other roles as necessary
}

export interface User {
    id?: number; // Corresponds to the User ID
    email: string; // Unique and required
    password: string; // Required
    firstName: string; // Required
    lastName: string; // Required
    role: Role; // Enum for role
}
