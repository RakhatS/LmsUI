import { Account } from "./account";
import { School } from "./school";
import { Subject } from "./subject";
import { TutorSubCLass } from "./tutorsubclass";

export class Tutor{
    id!: number;
    surname!: string;
    name!: string;
    patronymic : string | undefined;
    accountId!: number;
    account : Account | undefined;

    subjectId!: number
    subject: Subject | undefined;

    tutorSubClasses: TutorSubCLass[] = [];

    schoolId!: number;
    school : School | undefined;

}