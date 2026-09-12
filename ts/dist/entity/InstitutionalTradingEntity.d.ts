import { FinancialDataEntityBase } from '../FinancialDataEntityBase';
import type { FinancialDataSDK } from '../FinancialDataSDK';
import type { Control } from '../types';
import type { InstitutionalTrading, InstitutionalTradingLoadMatch } from '../FinancialDataTypes';
declare class InstitutionalTradingEntity extends FinancialDataEntityBase<InstitutionalTrading> {
    constructor(client: FinancialDataSDK, entopts: any);
    make(this: InstitutionalTradingEntity): InstitutionalTradingEntity;
    load(this: any, reqmatch?: InstitutionalTradingLoadMatch, ctrl?: Control): Promise<InstitutionalTradingEntity>;
}
export { InstitutionalTradingEntity };
