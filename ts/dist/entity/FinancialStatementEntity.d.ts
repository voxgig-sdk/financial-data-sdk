import { FinancialDataEntityBase } from '../FinancialDataEntityBase';
import type { FinancialDataSDK } from '../FinancialDataSDK';
import type { Control } from '../types';
import type { FinancialStatement, FinancialStatementLoadMatch } from '../FinancialDataTypes';
declare class FinancialStatementEntity extends FinancialDataEntityBase<FinancialStatement> {
    constructor(client: FinancialDataSDK, entopts: any);
    make(this: FinancialStatementEntity): FinancialStatementEntity;
    load(this: any, reqmatch?: FinancialStatementLoadMatch, ctrl?: Control): Promise<FinancialStatementEntity>;
}
export { FinancialStatementEntity };
