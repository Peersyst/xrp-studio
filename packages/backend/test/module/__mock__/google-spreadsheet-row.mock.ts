class GoogleSpreadsheetRowMock {
    constructor(public readonly row: Record<any, any>) {}
    toObject() {
        return this.row;
    }
}

export default GoogleSpreadsheetRowMock;
