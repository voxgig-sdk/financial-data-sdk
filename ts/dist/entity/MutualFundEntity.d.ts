import { FinancialDataEntityBase } from '../FinancialDataEntityBase';
import type { FinancialDataSDK } from '../FinancialDataSDK';
import type { Control } from '../types';
import type { MutualFund, MutualFundLoadMatch } from '../FinancialDataTypes';
declare class MutualFundEntity extends FinancialDataEntityBase<MutualFund> {
    constructor(client: FinancialDataSDK, entopts: any);
    make(this: MutualFundEntity): MutualFundEntity;
    load(this: any, reqmatch?: MutualFundLoadMatch, ctrl?: Control): Promise<MutualFundEntity>;
}
export { MutualFundEntity };
