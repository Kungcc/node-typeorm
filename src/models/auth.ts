import {Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn} from "typeorm";

@Entity({name: "auth"})
export class Auth {

    @PrimaryColumn({type: "varchar", length: 20, nullable: false })
    username!: string;

    @Column({type: "varchar", length: 20, nullable: false })
    password!: string;

    @CreateDateColumn()
    role_create_date!: Date;

    @UpdateDateColumn()
    role_modify_date!: Date;
}
