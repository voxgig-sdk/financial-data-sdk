import { FinancialDataEntityBase } from '../FinancialDataEntityBase';
import type { FinancialDataSDK } from '../FinancialDataSDK';
import type { Control } from '../types';
import type { FinancialRatio, FinancialRatioLoadMatch } from '../FinancialDataTypes';
declare class FinancialRatioEntity extends FinancialDataEntityBase<FinancialRatio> {
    constructor(client: FinancialDataSDK, entopts: any);
    make(this: FinancialRatioEntity): FinancialRatioEntity;
    load(this: any, reqmatch?: FinancialRatioLoadMatch, ctrl?: Control): Promise<FinancialRatioEntity>;
}
export { FinancialRatioEntity };
