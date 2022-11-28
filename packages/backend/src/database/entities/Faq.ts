import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Drop } from "./Drop";

@Entity("faq")
export class Faq {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "int", name: "drop_id" })
    dropId: number;

    @Column({ type: "text" })
    question: string;

    @Column({ type: "text" })
    answer: string;

    @ManyToOne(() => Drop, (drop) => drop.faqs, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
    @JoinColumn([{ name: "drop_id", referencedColumnName: "id" }])
    drop?: Drop;

    @CreateDateColumn({ name: "created_at", type: "timestamp" })
    createdAt: Date;

    @UpdateDateColumn({ name: "updated_at", type: "timestamp" })
    updatedAt: Date;
}
