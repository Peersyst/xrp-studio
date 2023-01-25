import { Entity, PrimaryColumn } from "typeorm";

@Entity("last_indexed_ledger")
export class LastIndexedLedger {
    @PrimaryColumn()
    ledger: number;
}
