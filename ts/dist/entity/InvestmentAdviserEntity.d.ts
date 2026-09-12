import { FinancialDataEntityBase } from '../FinancialDataEntityBase';
import type { FinancialDataSDK } from '../FinancialDataSDK';
import type { Control } from '../types';
import type { InvestmentAdviser, InvestmentAdviserLoadMatch } from '../FinancialDataTypes';
declare class InvestmentAdviserEntity extends FinancialDataEntityBase<InvestmentAdviser> {
    constructor(client: FinancialDataSDK, entopts: any);
    make(this: InvestmentAdviserEntity): InvestmentAdviserEntity;
    load(this: any, reqmatch?: InvestmentAdviserLoadMatch, ctrl?: Control): Promise<InvestmentAdviserEntity>;
}
export { InvestmentAdviserEntity };
