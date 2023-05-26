import { IsOptional } from "class-validator";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Income {
@PrimaryGeneratedColumn()
incomeId: number;

@Column()
salary: number;

@Column("jsonb", { nullable: true })
otherIncome: Array<object>;

@OneToOne(() => User)
@JoinColumn()
user: User

}
