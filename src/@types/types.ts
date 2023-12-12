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
