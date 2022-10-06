import { School } from "./school";
import { Student } from "./student";
import { TutorSubCLass } from "./tutorsubclass";

export class Class{
    id!: number;
    number!: number;
    seria!: string;

    students : Student[] = [];
    tutorSubClasses : TutorSubCLass[] = [];

    schoolId!: number;
    school: School | undefined;
}