interface timeProps {
  timeMinutes: Date;
}
export type FieldType = {
  title: string;
  equipment: string | undefined;
  description: string | undefined;
  dateEvent: Date;
  time: timeProps[];
};
export interface valuesProps {
  company: string;
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  agree: boolean;
}
export interface Schedules {
  id: number;
  title: string;
  equipment?: string;
  description?: string;
  dateEvent: Date;
  dateMinutesStart: Date;
  dateMinutesEnd: Date;
}
export interface Ambient {
  id: string;
  title: string;
  schedules: Schedules[];
}
