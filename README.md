# Vyer Validator - Simplified String Validation

**Vyer Validator** offers streamlined string validation, simplifying the process of ensuring data integrity and accuracy in applications.

## Installation

You can install the **Vyer Validator** library using npm:

```bash
npm i --save vyer-validator
```

## Usage

```javascript
//Single Validator
const string = "";
const validator = VyerValidator(string).isRequired().minLength(5);
validator.validate(); // ==> false, because the string is empty and less than 5 characters
validator.getMessage(); // => returns an array of error messages

//Multiple Validator
const string:IMultiValidation[] = [
    {name: "foo", value: "bar", isRequired: {set: true, errorMessage: ""}, ...}
    {name: "bar", value: "foo", isRequired: {set:true}, minLength: {set: 4, errorMessage: ""}, ...}
];
const {validate, getMessage} = VyerMultiValidator(string);
console.log(validate()); // ==> false, because on name: "bar", need min 4 character value
console.log(getMessage()); // => returns an object errors message
```

## API Documentation

### Single & Multiple Validators

Single & Multiple **Vyer Validator** returns a response that provides the following methods:

- `validate()`: Validates your validators and returns a boolean value.
- `getMessage()`: Checks for rule exceptions and returns error messages.

### Built-in Validators

**Vyer Validator** provides the following built-in validators:

- `isRequired(errorMessage)`: Validates if the string is a non-empty value.
- `emailOnly(errorMessage)`: Validates if the string is in Email Format.
- `maxLength(max, errorMessage)`: Validates the maximum length of the value.
- `minLength(min, errorMessage)`: Validates the minimum length of the value.
- `rangeNumeric(min, max, errorMessage)`: Validates the range of numeric values.
- `enum(enums, errorMessage)`: Validates to set only value what you sets.

**Note:** All errorMessage is optional to custom your error message response. you can modify it

## Contributing

Contributions to **forb** are welcome! To contribute, please follow the guidelines in [CONTRIBUTING.md](CONTRIBUTING.md).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
