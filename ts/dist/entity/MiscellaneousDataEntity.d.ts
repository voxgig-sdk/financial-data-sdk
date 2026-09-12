import { FinancialDataEntityBase } from '../FinancialDataEntityBase';
import type { FinancialDataSDK } from '../FinancialDataSDK';
import type { Control } from '../types';
import type { MiscellaneousData, MiscellaneousDataLoadMatch } from '../FinancialDataTypes';
declare class MiscellaneousDataEntity extends FinancialDataEntityBase<MiscellaneousData> {
    constructor(client: FinancialDataSDK, entopts: any);
    make(this: MiscellaneousDataEntity): MiscellaneousDataEntity;
    load(this: any, reqmatch?: MiscellaneousDataLoadMatch, ctrl?: Control): Promise<MiscellaneousDataEntity>;
}
export { MiscellaneousDataEntity };
