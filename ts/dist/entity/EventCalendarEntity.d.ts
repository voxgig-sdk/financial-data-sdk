import { FinancialDataEntityBase } from '../FinancialDataEntityBase';
import type { FinancialDataSDK } from '../FinancialDataSDK';
import type { Control } from '../types';
import type { EventCalendar, EventCalendarLoadMatch } from '../FinancialDataTypes';
declare class EventCalendarEntity extends FinancialDataEntityBase<EventCalendar> {
    constructor(client: FinancialDataSDK, entopts: any);
    make(this: EventCalendarEntity): EventCalendarEntity;
    load(this: any, reqmatch?: EventCalendarLoadMatch, ctrl?: Control): Promise<EventCalendarEntity>;
}
export { EventCalendarEntity };
