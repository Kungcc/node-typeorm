import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn} from "typeorm";

@Entity({name: "a4_role"})
export class Role {

    @PrimaryGeneratedColumn()
    role_id: number;

    @Column({type: "varchar", length: 20, nullable: false })
    role_name: string;

    @Column({type: "varchar", length: 30, nullable: false })
    role_group: string;

    @Column({type: "datetime", nullable: true})
    role_create_date: Date;

    @Column({type: "datetime", nullable: true})
    role_modify_date: Date;
}
