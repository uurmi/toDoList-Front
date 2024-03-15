export class Ticket {
  _id?: string;
  name?: string;
  description?: string;
  createdAt!: Date;
  deadline?: Date;
  steps?: [];
  stepsChecked?: [];
  category?: string;
  done?: boolean;
  doneDate?: Date;
  position!: number;
}
