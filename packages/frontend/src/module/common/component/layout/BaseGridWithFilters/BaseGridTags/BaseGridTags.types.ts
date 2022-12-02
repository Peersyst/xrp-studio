export interface Tag<T> {
    value: T;
    label: string;
}

export interface BaseGridTagsProps<T> {
    /**
     * The tags to display
     */
    tags?: Tag<T>[];
    /**
     * The function to call when a tag is clicked
     */
    onDeleteTagClicked?: (value: Tag<T>["value"]) => void;
    /**
     * Clear tags fn
     */
    onClear?: () => void;
    /**
     * Extra space for banner
     */
    withExtraSpace?: boolean;
}
