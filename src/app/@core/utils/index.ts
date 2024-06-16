import * as moment from 'moment';

export { AnalyticsService } from './analytics.service';
export { SeoService } from './seo.service';

export var cashierBalance: any;

export function addMinutesToDate(date: Date, minutes: number): Date {
    return moment(date).add(minutes, 'minutes').toDate();
}


