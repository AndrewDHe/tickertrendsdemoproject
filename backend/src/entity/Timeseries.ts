import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Term } from "./Term";

@Entity()
export class Timeseries {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  date!: string;

  @Column()
  value!: number;

  @ManyToOne(() => Term, term => term.timeseries)
  term!: Term;
}
