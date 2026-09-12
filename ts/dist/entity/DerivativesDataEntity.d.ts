import { FinancialDataEntityBase } from '../FinancialDataEntityBase';
import type { FinancialDataSDK } from '../FinancialDataSDK';
import type { Control } from '../types';
import type { DerivativesData, DerivativesDataLoadMatch } from '../FinancialDataTypes';
declare class DerivativesDataEntity extends FinancialDataEntityBase<DerivativesData> {
    constructor(client: FinancialDataSDK, entopts: any);
    make(this: DerivativesDataEntity): DerivativesDataEntity;
    load(this: any, reqmatch?: DerivativesDataLoadMatch, ctrl?: Control): Promise<DerivativesDataEntity>;
}
export { DerivativesDataEntity };
