import { FinancialDataEntityBase } from '../FinancialDataEntityBase';
import type { FinancialDataSDK } from '../FinancialDataSDK';
import type { Control } from '../types';
import type { MarketIndex, MarketIndexLoadMatch } from '../FinancialDataTypes';
declare class MarketIndexEntity extends FinancialDataEntityBase<MarketIndex> {
    constructor(client: FinancialDataSDK, entopts: any);
    make(this: MarketIndexEntity): MarketIndexEntity;
    load(this: any, reqmatch?: MarketIndexLoadMatch, ctrl?: Control): Promise<MarketIndexEntity>;
}
export { MarketIndexEntity };
