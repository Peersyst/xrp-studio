import { Entity, Column, Index, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { AuthUserI, UserType } from "@peersyst/auth-module";

export { UserType };

@Entity("user")
export class User implements AuthUserI {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column("varchar", { length: 255 })
    @Index()
    email!: string;

    @Column({
        type: "enum",
        enum: UserType,
        default: UserType.USER,
    })
    type!: UserType;

    @Column("varchar", { length: 255 })
    password!: string;

    @CreateDateColumn({
        name: "created_at",
        type: "datetime",
    })
    createdAt!: Date;

    @UpdateDateColumn({
        name: "updated_at",
        type: "datetime",
    })
    updatedAt!: Date;
}
