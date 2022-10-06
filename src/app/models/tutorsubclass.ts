import { Class } from "./class";
import { Subject } from "./subject";
import { Tutor } from "./tutor";

export class TutorSubCLass{
    id!: number;

    subjectId!: number;
    subject: Subject | undefined;

    classId!: number;
    class: Class | undefined;

    tutorId: number | undefined;
    tutor: Tutor | undefined;

}