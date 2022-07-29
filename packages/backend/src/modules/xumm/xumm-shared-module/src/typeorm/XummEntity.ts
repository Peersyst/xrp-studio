import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity("xumm")
export class XummEntity {
    @PrimaryGeneratedColumn({ type: "int", name: "id" })
    id?: number;

    @Column("varchar", { length: 255, name: "user_token" })
    userToken: string;

    @Column("varchar", { length: 255, name: "address" })
    address: string;

    @Column("varchar", { length: 255, name: "payload", nullable: true })
    payloadId?: string;

    @CreateDateColumn({ name: "created_at", type: "timestamp" })
    createdAt: Date;

    @UpdateDateColumn({ name: "updated_at", type: "timestamp" })
    updatedAt: Date;
}
