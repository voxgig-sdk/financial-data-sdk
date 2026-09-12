import { FinancialDataEntityBase } from '../FinancialDataEntityBase';
import type { FinancialDataSDK } from '../FinancialDataSDK';
import type { Control } from '../types';
import type { SymbolList, SymbolListListMatch } from '../FinancialDataTypes';
declare class SymbolListEntity extends FinancialDataEntityBase<SymbolList> {
    constructor(client: FinancialDataSDK, entopts: any);
    make(this: SymbolListEntity): SymbolListEntity;
    list(this: any, reqmatch?: SymbolListListMatch, ctrl?: Control): Promise<SymbolListEntity[]>;
}
export { SymbolListEntity };
