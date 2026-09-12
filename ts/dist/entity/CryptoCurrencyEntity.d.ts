import { FinancialDataEntityBase } from '../FinancialDataEntityBase';
import type { FinancialDataSDK } from '../FinancialDataSDK';
import type { Control } from '../types';
import type { CryptoCurrency, CryptoCurrencyLoadMatch } from '../FinancialDataTypes';
declare class CryptoCurrencyEntity extends FinancialDataEntityBase<CryptoCurrency> {
    constructor(client: FinancialDataSDK, entopts: any);
    make(this: CryptoCurrencyEntity): CryptoCurrencyEntity;
    load(this: any, reqmatch?: CryptoCurrencyLoadMatch, ctrl?: Control): Promise<CryptoCurrencyEntity>;
}
export { CryptoCurrencyEntity };
