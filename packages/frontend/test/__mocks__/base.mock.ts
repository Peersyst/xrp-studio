export type MockFnType = jest.Mock<any, any>;

class BaseMock {
    clear(): void {
        Object.values(this).forEach((v) => ((v as any).mockClear ? v.mockClear() : undefined));
    }
}

export default BaseMock;
