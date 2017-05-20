import { REQUIRED, REQUIRED_IF_PROFESSIONAL, INVALID_PHONE, AT_LEAST_ONE_PHONE } from './fieldValidation';

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
        default:
            return null;
    }
}
