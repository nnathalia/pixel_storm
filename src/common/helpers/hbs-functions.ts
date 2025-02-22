/* eslint-disable prettier/prettier */
import moment from "moment";
//import { error } from "console";
//import { json } from "stream/consumers";

const helpers = {
  dateFormat: (date: string, format: string) => {
    const locale = moment(date);

    if (!format) {
      format = 'DD/MM/YYYY hh:mm';
    }
    return locale.format(format);
  },
  inc: (value: string) => parseInt(value) + 1,

  json: (value: any) => { return JSON.stringify(value) },
  'error-message': (error: any[], key: string) => error?.find(i => i.property == key)?.message,
  'error-messages': (errors: any[], key: string) => errors?.find(i => i.property == key)?.messages,
  setValue:(valueDefault: any, valueCheck?: any) => {
    if (!valueCheck) return valueDefault;
    if(valueDefault && valueCheck) return valueDefault;
  },
};

export const hbsRegisterHelpers = (hbs: any) => {
  for (const functionName in helpers) {
    hbs.registerHelper(functionName, helpers[functionName]);
  }
};
