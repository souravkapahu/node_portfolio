import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';
import { Transform } from 'class-transformer';
import { Types } from 'mongoose';

export function IsObjectId(validationOptions?: ValidationOptions) {
    return function (target: any, propertyName: string) {
        registerDecorator({
            name: 'isObjectId',
            target: target.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value: any) {
                    return Types.ObjectId.isValid(value);
                },
                defaultMessage(args: ValidationArguments) {
                    return `${args.property} must be a valid MongoDB ObjectId`;
                },
            },
        });

        Transform(({ value }) => {
            return Types.ObjectId.isValid(value) ? new Types.ObjectId(value) : value;
        })(target, propertyName);
    };
}
