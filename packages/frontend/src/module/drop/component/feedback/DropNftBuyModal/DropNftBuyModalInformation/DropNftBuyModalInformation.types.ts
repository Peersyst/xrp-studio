import { DropDto } from "module/api/service";

export interface DropNftBuyModalInformationProps {
    drop: DropDto;
    collection?: string;
}

export interface DropNftBuyModalInformationFieldProps {
    title: string;
    content: string | undefined | number;
}
