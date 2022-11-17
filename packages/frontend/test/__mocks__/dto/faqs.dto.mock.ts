import { FaqsDto } from "module/api/service";

export class FaqsDtoMock implements FaqsDto {
    id: number;
    question: string;
    answer: string;

    constructor({ id, question, answer }: FaqsDto) {
        this.id = id;
        this.question = question;
        this.answer = answer;
    }
}
