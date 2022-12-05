export interface responceType {
  status: number;
  error: boolean;
  message: string;
}

export interface responceWithDataType extends responceType {
  data: Array<any>;
}
