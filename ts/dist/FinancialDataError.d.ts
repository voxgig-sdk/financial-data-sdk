import { Context } from './Context';
declare class FinancialDataError extends Error {
    isFinancialDataError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { FinancialDataError };
