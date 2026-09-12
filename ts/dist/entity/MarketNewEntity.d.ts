import { FinancialDataEntityBase } from '../FinancialDataEntityBase';
import type { FinancialDataSDK } from '../FinancialDataSDK';
import type { Control } from '../types';
import type { MarketNew, MarketNewLoadMatch } from '../FinancialDataTypes';
declare class MarketNewEntity extends FinancialDataEntityBase<MarketNew> {
    constructor(client: FinancialDataSDK, entopts: any);
    make(this: MarketNewEntity): MarketNewEntity;
    load(this: any, reqmatch?: MarketNewLoadMatch, ctrl?: Control): Promise<MarketNewEntity>;
}
export { MarketNewEntity };
