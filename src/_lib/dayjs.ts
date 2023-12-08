import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isToday from "dayjs/plugin/isToday";

dayjs.extend(isSameOrAfter, isToday);
dayjs.locale("pt-br");

export const dayjsLib = dayjs();
