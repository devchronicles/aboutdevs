export function required(value) {
    return (value === null || value === undefined || value === '') ? 'required' : undefined;
}

