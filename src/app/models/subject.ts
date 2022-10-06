import { Tutor } from "./tutor";

export class Subject{
    id!: number;
    name!: string;

    tutors: Tutor[] = [];
}