import { PeriodEnum } from '../enums';

// calculates the expiration date from today depending on the period
// returns the expiration date, or undefined if the period is invalid
export const calculateExpirationDate = (period: PeriodEnum) => {
  const today = new Date();
  const expirationDate = new Date(today);

  // TODO - calculate each period
  switch (period as PeriodEnum) {
    case PeriodEnum.Day: {
      // handling day expiration case
      break;
    }
    case PeriodEnum.Month: {
      expirationDate.setMonth(today.getMonth() + 1);
      break;
    }
    case PeriodEnum.Trimester: {
      expirationDate.setMonth(today.getMonth() + 3);
      break;
    }
    case PeriodEnum.Semester: {
      expirationDate.setMonth(today.getMonth() + 6);
      break;
    }
    case PeriodEnum.Year: {
      expirationDate.setFullYear(today.getFullYear() + 1);
      break;
    }
    default: {
      // invalid period
      return undefined;
    }
  }

  return expirationDate.toISOString().split('T')[0];
};
