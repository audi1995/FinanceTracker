import { IsNotEmpty } from "class-validator";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";



@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    userName: string;

    @Column('text')
    firstName: string;

    @IsNotEmpty()
    @Column('character varying')
    lastname: string;
    
    @Column('text')
    email: string;

    @Column({ type: 'date' })
    dob: Date;

    @Column('text')
    password: string;

    @Column('text')
    address: string;

    @Column('text')
    gender: string;

    @Column('text')
    role: string;

    @Column()
    monthly_savings_target: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}

