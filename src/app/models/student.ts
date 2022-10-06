import { Account } from "./account";
import { Class } from "./class";
import { Grade } from "./grade";
import { School } from "./school";

export class Student{
    id!: number;
    surname!: string;
    name!: string;
    patronymic : string | undefined;

    accountId!: number;
    account : Account | undefined;

    schoolId: number | undefined;
    school: School | undefined;

    classId: number | undefined;
    class: Class | undefined;

    grades: Grade[] = [];
  element: any;
}