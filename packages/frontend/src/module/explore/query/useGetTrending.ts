import { TrendsDto, TrendService } from "module/api/service";
import { QueryResult } from "query-utils";
import { useQuery } from "react-query";
import Queries from "../../../query/queries";

export const useGetTrends = (): QueryResult<TrendsDto> => {
    return useQuery([Queries.TRENDS], () => TrendService.trendControllerGetTrends());
};
