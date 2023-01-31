import { DropDto } from "module/api/service";

export interface DropNftBuyModalInformationProps {
    loading?: boolean;
    drop: DropDto | undefined;
    collection?: string;
}
