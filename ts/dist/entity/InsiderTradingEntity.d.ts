import { FinancialDataEntityBase } from '../FinancialDataEntityBase';
import type { FinancialDataSDK } from '../FinancialDataSDK';
import type { Control } from '../types';
import type { InsiderTrading, InsiderTradingLoadMatch } from '../FinancialDataTypes';
declare class InsiderTradingEntity extends FinancialDataEntityBase<InsiderTrading> {
    constructor(client: FinancialDataSDK, entopts: any);
    make(this: InsiderTradingEntity): InsiderTradingEntity;
    load(this: any, reqmatch?: InsiderTradingLoadMatch, ctrl?: Control): Promise<InsiderTradingEntity>;
}
export { InsiderTradingEntity };
