import { FinancialDataEntityBase } from '../FinancialDataEntityBase';
import type { FinancialDataSDK } from '../FinancialDataSDK';
import type { Control } from '../types';
import type { ForexData, ForexDataLoadMatch } from '../FinancialDataTypes';
declare class ForexDataEntity extends FinancialDataEntityBase<ForexData> {
    constructor(client: FinancialDataSDK, entopts: any);
    make(this: ForexDataEntity): ForexDataEntity;
    load(this: any, reqmatch?: ForexDataLoadMatch, ctrl?: Control): Promise<ForexDataEntity>;
}
export { ForexDataEntity };
