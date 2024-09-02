export default class Contract {
    abi;
    _rpcProvider;
    _viewContract;
    get rpcProvider() {
        if (!this._rpcProvider)
            throw new Error("Provider not initialized");
        return this._rpcProvider;
    }
    get viewContract() {
        if (!this._viewContract)
            throw new Error("Contract not initialized");
        return this._viewContract;
    }
    constructor(abi) {
        this.abi = abi;
    }
}
//# sourceMappingURL=Contract.js.map