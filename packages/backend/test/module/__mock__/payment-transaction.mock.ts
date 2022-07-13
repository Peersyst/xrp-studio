import BaseTransactionMock, { TransactionMockOptions } from "./base-transaction.mock";
import { Payment, PaymentFlagsInterface } from "xrpl/dist/npm/models/transactions/payment";
import { Path, Amount } from "xrpl/dist/npm/models/common";

export type PaymentTransactionMockOptions = TransactionMockOptions<Payment>;

class PaymentTransactionMock extends BaseTransactionMock {
    TransactionType: "Payment";
    Amount: Amount;
    Destination: string;
    DestinationTag?: number;
    InvoiceID?: string;
    Paths?: Path[];
    SendMax?: Amount;
    DeliverMin?: Amount;
    Flags?: number | PaymentFlagsInterface;

    constructor({
        Amount,
        Destination,
        DestinationTag,
        InvoiceID,
        Paths,
        SendMax,
        DeliverMin,
        Flags,
        ...rest
    }: PaymentTransactionMockOptions = {}) {
        super(rest);
        this.TransactionType = "Payment";
        this.Amount = Amount;
        this.Destination = Destination;
        this.DestinationTag = DestinationTag;
        this.InvoiceID = InvoiceID;
        this.Paths = Paths;
        this.SendMax = SendMax;
        this.DeliverMin = DeliverMin;
        this.Flags = Flags;
    }
}

export default PaymentTransactionMock;
