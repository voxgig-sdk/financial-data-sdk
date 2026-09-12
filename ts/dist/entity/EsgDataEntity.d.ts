import { FinancialDataEntityBase } from '../FinancialDataEntityBase';
import type { FinancialDataSDK } from '../FinancialDataSDK';
import type { Control } from '../types';
import type { EsgData, EsgDataLoadMatch } from '../FinancialDataTypes';
declare class EsgDataEntity extends FinancialDataEntityBase<EsgData> {
    constructor(client: FinancialDataSDK, entopts: any);
    make(this: EsgDataEntity): EsgDataEntity;
    load(this: any, reqmatch?: EsgDataLoadMatch, ctrl?: Control): Promise<EsgDataEntity>;
}
export { EsgDataEntity };
