import { FinancialDataEntityBase } from '../FinancialDataEntityBase';
import type { FinancialDataSDK } from '../FinancialDataSDK';
import type { Control } from '../types';
import type { BasicInformation, BasicInformationLoadMatch } from '../FinancialDataTypes';
declare class BasicInformationEntity extends FinancialDataEntityBase<BasicInformation> {
    constructor(client: FinancialDataSDK, entopts: any);
    make(this: BasicInformationEntity): BasicInformationEntity;
    load(this: any, reqmatch?: BasicInformationLoadMatch, ctrl?: Control): Promise<BasicInformationEntity>;
}
export { BasicInformationEntity };
