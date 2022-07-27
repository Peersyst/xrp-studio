class BaseMock {
    clear() {
        Object.values(this).forEach((v) => ((v as any).mockClear ? v.mockClear() : undefined));
    }
}

export default BaseMock;
