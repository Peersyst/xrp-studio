import { Faq } from "../../../database/entities/Faq";

export class FaqDto {
    question: string;
    answer: string;

    static fromEntity(faq: Faq): FaqDto {
        return {
            question: faq.question,
            answer: faq.answer,
        };
    }
}
