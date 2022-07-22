import { Check, Column, Entity, PrimaryColumn } from "typeorm";

@Entity("last_indexed_ledger")
@Check(`"id" = 1`)
export class LastIndexedLedger {
    @PrimaryColumn({ default: 1 })
    id: 1;

    @Column()
    index: number;
}
