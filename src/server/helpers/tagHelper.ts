export function isValidTagName(tag: string): boolean {
    return /^[a-z0-9\+\#\-\.]{1,35}$/.test(tag);
}
