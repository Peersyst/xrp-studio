export interface CreateNftQueryBuilderOptions {
    relations?: {
        user?: boolean;
        collection?: boolean;
        metadata?: boolean;
        attribute?: boolean;
    };
}
