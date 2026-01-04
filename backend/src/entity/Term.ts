import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Timeseries } from "./Timeseries";

@Entity()
export class Term {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  keyword!: string;

  @OneToMany(() => Timeseries, ts => ts.term)
  timeseries!: Timeseries[];
}
