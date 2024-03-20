interface IIsRequired {
  set: boolean;
  errorMessage?: string;
}

interface IMaxLength {
  set: number;
  errorMessage?: string;
}

interface IMinLength {
  set: number;
  errorMessage?: string;
}

interface IEnum {
  set: string[];
  errorMessage?: string;
}

interface IEmailOnly {
  set: boolean;
  errorMessage?: string;
}

interface IRangeNumeric {
  max: number;
  min: number;
  errorMessage?: string;
}

export interface IMultiValidation {
  name: string;
  value: string;
  isRequired?: IIsRequired;
  maxLength?: IMaxLength;
  minLength?: IMinLength;
  enum?: IEnum;
  emailOnly?: IEmailOnly;
  rangeNumeric?: IRangeNumeric;
}
