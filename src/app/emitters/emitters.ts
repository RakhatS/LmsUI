import { EventEmitter } from "@angular/core";

export class Emitters{
    static authEmitter = new EventEmitter<boolean>();
    static isAdminEmitter = new EventEmitter<boolean>();
}