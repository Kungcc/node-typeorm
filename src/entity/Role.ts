import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn} from "typeorm";

@Entity({name: "a4_role"})
export class Role {

    @PrimaryGeneratedColumn()
    role_id: number;

    @Column({type: "varchar", length: 20, nullable: false })
    role_name: string;

    @Column({type: "varchar", length: 20, nullable: false })
    role_group: string;

    @Column({type: "varchar", length: 10, nullable: false })
    role_type: string;

    @Column({type: "varchar", length: 100, nullable: true })
    role_desc: string;

    @CreateDateColumn()
    role_create_date: Date;

    @UpdateDateColumn()
    role_modify_date: Date;
}
