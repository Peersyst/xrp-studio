export default function incomingDaysToTimeNumber(days: number): number {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date.getTime();
}
