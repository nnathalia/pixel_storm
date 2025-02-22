/* eslint-disable prettier/prettier */
import * as moment from 'moment';

const helpers = {
  dateFormat: (date: string, format: string) => {
    const locale = moment(date);

    if (!format) {
      format = 'DD/MM/YYYY hh:mm';
    }
    return locale.format(format);
  },
  inc: (value: string) => parseInt(value) + 1,
  eq: (value: any, comparer: any) => value == comparer,
};

export const hbsRegisterHelpers = (hbs: any) => {
  for (const functionName in helpers) {
    hbs.registerHelper(functionName, helpers[functionName]);
  }
};
