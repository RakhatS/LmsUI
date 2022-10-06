import { Class } from "./class";
import { Student } from "./student";
import { Tutor } from "./tutor";

export class School{
    id!: number;
    name!: string;

    students: Student[] = [];
    tutors: Tutor[] = [];
    classes: Class[] = [];
}