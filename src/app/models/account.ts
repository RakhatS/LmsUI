import { Student } from "./student";
import { Tutor } from "./tutor";

export class Account{
    id!: number;
    email!: string;
    password!: string;
    roles: Roles[] = [];
    tutor : Tutor | undefined;
    student : Student | undefined;

}
enum Roles{
    Tutor,
    Student,
    Admin
}