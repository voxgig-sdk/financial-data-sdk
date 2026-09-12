import { FinancialDataEntityBase } from '../FinancialDataEntityBase';
import type { FinancialDataSDK } from '../FinancialDataSDK';
import type { Control } from '../types';
import type { EtfData, EtfDataLoadMatch } from '../FinancialDataTypes';
declare class EtfDataEntity extends FinancialDataEntityBase<EtfData> {
    constructor(client: FinancialDataSDK, entopts: any);
    make(this: EtfDataEntity): EtfDataEntity;
    load(this: any, reqmatch?: EtfDataLoadMatch, ctrl?: Control): Promise<EtfDataEntity>;
}
export { EtfDataEntity };
