import { INestApplication } from "@nestjs/common";
import { ExpressAdapter } from "@bull-board/express";
import { Queue } from "bull";
import { createBullBoard } from "@bull-board/api";
import { BullAdapter } from "@bull-board/api/bullAdapter";

const registerBullBoard = (app: INestApplication, basePath: string) => {
    const serverAdapter = new ExpressAdapter();
    serverAdapter.setBasePath(basePath + "/bull-board");
    const ledgerQueue = app.get<Queue>(`BullQueue_ledger`);
    createBullBoard({
        queues: [new BullAdapter(ledgerQueue)],
        serverAdapter,
    });
    app.use("/bull-board", serverAdapter.getRouter());
};

export default registerBullBoard;
