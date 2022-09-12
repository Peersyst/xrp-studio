export interface BaseGridTagsProps {
    /**
     * The tags to display
     */
    tags?: string[];
    /**
     * The function to call when a tag is clicked
     */
    onTagClicked?: (tag: string) => void;
    /**
     * Clear tags fn
     */
    onClear?: () => void;
}
