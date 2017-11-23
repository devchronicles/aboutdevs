import * as fieldValidation from "./fieldValidationHelper";

export function getErrorMessage(error: string) {
    switch (error) {
        case fieldValidation.REQUIRED:
            return "Campo obrigatório.";
        case fieldValidation.MAX_LENGTH_50:
            return "Tamanho máximo: 50 caracteres.";
        case fieldValidation.MAX_LENGTH_60:
            return "Tamanho máximo: 60 caracteres.";
        case fieldValidation.MAX_LENGTH_80:
            return "Tamanho máximo: 80 caracteres.";
        case fieldValidation.MAX_LENGTH_500:
            return "Tamanho máximo: 500 caracteres.";
        case fieldValidation.REQUIRED_IF_PROFESSIONAL:
            return "Campo obrigatório quando o usuário é um profissional.";
        case fieldValidation.INVALID_PHONE:
            return "Telefone inválido.";
        case fieldValidation.AT_LEAST_ONE_PHONE:
            return "Pelo menos um dos telefones precisa ser preenchido.";
        case fieldValidation.USER_NAME_IS_TAKEN:
            return "Este nome de usuário já está sendo utilizado.";
        default:
            return error ? "Algo deu errado" : null;
    }
}
