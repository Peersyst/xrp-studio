import { FaqDto } from "module/api/service";

export class FaqsDtoMock implements FaqDto {
    question: string;
    answer: string;

    constructor({ question, answer }: FaqDto) {
        this.question = question;
        this.answer = answer;
    }
}
