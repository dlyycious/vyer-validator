import { IMultiValidation } from "./types";

class Validation {
  field: string | null | undefined;
  errorMessage: string[];

  constructor(field: string | null | undefined) {
    this.field = field;
    this.errorMessage = [];
  }

  isRequired(errorMessage?: string) {
    if (this.field == null || this.field === "") {
      errorMessage ? this.errorMessage.push(errorMessage) : this.errorMessage.push("This field is Required");
    }
    return this;
  }

  maxLength(max: number, errorMessage?: string) {
    if (this.field?.length! > max) {
      errorMessage ? this.errorMessage.push(errorMessage) : this.errorMessage.push(`This field max ${max} character`);
    }
    return this;
  }

  minLength(min: number, errorMessage?: string) {
    if (this.field?.length! < min) {
      errorMessage ? this.errorMessage.push(errorMessage) : this.errorMessage.push(`This field min ${min} character`);
    }
    return this;
  }

  emailOnly(errorMessage?: string) {
    const pattern: RegExp = new RegExp(
      "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \\t]|(\\[\\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\\t -Z^-~]*])"
    );

    if (!pattern.test(this.field!)) {
      errorMessage ? this.errorMessage.push(errorMessage) : this.errorMessage.push("This field must Email format");
    }

    return this;
  }

  rangeNumeric(min: number, max: number, errorMessage?: string) {
    const numeric = parseFloat(this.field!);

    if (isNaN(numeric)) {
      this.errorMessage.push("This field must be numeric");
    }

    if (numeric < min || numeric > max) {
      errorMessage ? this.errorMessage.push(errorMessage) : this.errorMessage.push(`This field have min ${min} and max ${max}`);
    }

    return this;
  }

  enum(enums: string[], errorMessage?: string) {
    if (!enums.find((q) => q == this.field)) {
      errorMessage ? this.errorMessage.push(errorMessage) : this.errorMessage.push(`This field only ${enums.toString()} only`);
    }

    return this;
  }

  validate() {
    return this.errorMessage.length > 0 ? false : true;
  }

  getMessage() {
    return this.errorMessage;
  }
}

export function VyerValidator(value: string | null | undefined) {
  return new Validation(value);
}

export function VyerMultiValidator(field: IMultiValidation[]) {
  const err: any = {};

  for (const rules in field) {
    const rule = field[rules];
    const validator = VyerValidator(rule.value);

    if (rule.isRequired?.set) {
      validator.isRequired(rule.isRequired?.errorMessage);
    }

    if (rule.maxLength?.set) {
      validator.maxLength(rule.maxLength.set, rule.maxLength?.errorMessage);
    }

    if (rule.minLength?.set) {
      validator.minLength(rule.minLength.set, rule.minLength?.errorMessage);
    }

    if (rule.enum?.set) {
      validator.enum(rule.enum.set, rule.enum?.errorMessage);
    }

    if (rule.emailOnly?.set) {
      validator.emailOnly(rule.emailOnly?.errorMessage);
    }

    if (rule.rangeNumeric?.max && rule.rangeNumeric?.min) {
      validator.rangeNumeric(rule.rangeNumeric.max, rule.rangeNumeric.min, rule.rangeNumeric?.errorMessage);
    }

    if (!validator.validate()) {
      err[rule.name] = validator.getMessage();
    }
  }

  const getMessage = () => {
    return err;
  };

  const validate = () => {
    return Object.keys(err).length > 0 ? false : true;
  };

  return { getMessage, validate };
}
