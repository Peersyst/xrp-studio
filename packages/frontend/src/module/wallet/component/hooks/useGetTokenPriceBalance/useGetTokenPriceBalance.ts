export const useGetTokenPriceBalance = (tokenPrice: number, balance: number): number => {
    return tokenPrice && balance ? tokenPrice * balance : 0;
};
