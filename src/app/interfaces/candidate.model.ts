import { Application } from "./application.model";
import { User } from "./user.model";


export interface Candidate {
    id: number; // Same as User ID
    user: User;
    applications?: Application[];
}