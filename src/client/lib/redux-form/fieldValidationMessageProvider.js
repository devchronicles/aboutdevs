import {
    REQUIRED,
    REQUIRED_IF_PROFESSIONAL,
    INVALID_PHONE,
    AT_LEAST_ONE_PHONE
} from './fieldValidation';

import {
    USER_NAME_IS_TAKEN
} from './asyncValidation';

export function getErrorMessage(error) {
    switch (error) {
        case REQUIRED:
            return 'Campo obrigatório.';
        case REQUIRED_IF_PROFESSIONAL:
            return 'Campo obrigatório quando o usuário é um profissional.';
        case INVALID_PHONE:
            return 'Telefone inválido.';
        case AT_LEAST_ONE_PHONE:
            return 'Pelo menos um dos telefones precisa ser preenchido.';
        case USER_NAME_IS_TAKEN:
            return 'Este nome de usuário já está sendo utilizado.';
        default:
            break;
    }
    if (error) {
        return 'Algo deu errado';
    }
    return null;
}
