import { ControllerErrors } from '../Controllers/Controller';
import { Banner } from '../Interfaces/BannerInterface';

export default function verifyEndAtAndStartAt(endAt: string, startAt: string, oldDate: Banner): {
    endAt: Date | undefined,
    startAt: Date | undefined,
} | { error: ControllerErrors } {
  let dates: {
    endAt: Date | undefined,
    startAt: Date | undefined,
  } = {
    endAt: undefined,
    startAt: undefined
  };
  if (endAt && startAt) {
    const endDate = endAt.split('/');
    const startDate = startAt.split('/');
    dates.endAt = new Date(Number(endDate[2]), Number(endDate[1]) - 1, Number(endDate[0]));
    dates.startAt = new Date(Number(startDate[2]), Number(startDate[1]) - 1, Number(startDate[0]));
    if (dates.endAt <= dates.startAt) {
      return { error: ControllerErrors.endAtHigherStartAt };
    }
  } else if (endAt && !startAt) {
    const endDate = endAt.split('/');
    dates.endAt = new Date(Number(endDate[2]), Number(endDate[1]) - 1, Number(endDate[0]));
    if (dates.endAt <= new Date(oldDate.startAt)) {
      return { error: ControllerErrors.endAtHigherStartAt };
    }
  } else if (!endAt && startAt) {
    const startDate = startAt.split('/');
    dates.startAt = new Date(Number(startDate[2]), Number(startDate[1]) - 1, Number(startDate[0]));
    if (dates.startAt >= new Date(oldDate.endAt)) {
      return { error: ControllerErrors.endAtHigherStartAt };
    }
    if (dates.startAt < new Date()) {
      return { error: ControllerErrors.startAtLowerCurrentYear };
    }
  } else {
    return { error: ControllerErrors.internal };
  }

  return dates;
}
