"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinancialDataError = void 0;
class FinancialDataError extends Error {
    isFinancialDataError = true;
    sdk = 'FinancialData';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.FinancialDataError = FinancialDataError;
//# sourceMappingURL=FinancialDataError.js.map