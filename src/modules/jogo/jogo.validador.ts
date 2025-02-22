/* eslint-disable prettier/prettier */
import { plainToInstance } from "class-transformer";
import { BaseValidator } from "src/common/validator/base.validator";
import { IValidator } from "src/common/validator/interface.validator";
import { JogoDto, JogoUpdateDto } from "./dto/jogo.dto";

export class JogoValidador extends BaseValidator implements IValidator {
    validate(data: any, update?: boolean): Promise<this> {
        if(update) {
            return this.validator(plainToInstance(JogoUpdateDto, data));
        }
        return this.validator(plainToInstance(JogoDto, data));
    }
}