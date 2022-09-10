import {IsNotEmpty } from 'class-validator';

export class LogDto{

    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    entityType:string;

    @IsNotEmpty()
    entityId: number;

    @IsNotEmpty()
    event: string;
}