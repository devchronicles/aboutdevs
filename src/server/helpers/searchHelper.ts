export function convertToTsVector(search: string) {
    if (!search) {
        return '';
    }
    return search.split(' ').join(' & ');
}
