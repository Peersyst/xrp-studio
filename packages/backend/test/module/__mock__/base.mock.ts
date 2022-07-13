class BaseMock {
    clear() {
        Object.values(this).forEach((v) => ("mockClear" in v ? v.mockClear() : undefined));
    }
}

export default BaseMock;
