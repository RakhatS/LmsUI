import { Student } from "./student";
import { Subject } from "./subject";
import { Tutor } from "./tutor";
import { TutorSubCLass } from "./tutorsubclass";

export class Grade{
    id!: number;
    score!: number;
    studentId!: number;
    student : Student | undefined;
    tutorSubCLassId!: number;
    tutorSubCLass : TutorSubCLass | undefined;
    tutorId!: number;
    tutor : Tutor | undefined;
}