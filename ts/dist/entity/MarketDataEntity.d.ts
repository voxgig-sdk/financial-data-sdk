import { FinancialDataEntityBase } from '../FinancialDataEntityBase';
import type { FinancialDataSDK } from '../FinancialDataSDK';
import type { Control } from '../types';
import type { MarketData, MarketDataLoadMatch, MarketDataListMatch } from '../FinancialDataTypes';
declare class MarketDataEntity extends FinancialDataEntityBase<MarketData> {
    constructor(client: FinancialDataSDK, entopts: any);
    make(this: MarketDataEntity): MarketDataEntity;
    load(this: any, reqmatch?: MarketDataLoadMatch, ctrl?: Control): Promise<MarketDataEntity>;
    list(this: any, reqmatch?: MarketDataListMatch, ctrl?: Control): Promise<MarketDataEntity[]>;
}
export { MarketDataEntity };
