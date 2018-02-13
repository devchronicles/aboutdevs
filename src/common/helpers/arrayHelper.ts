export function areArraysEqual<T>(a1: T[], a2: T[]): boolean {
    if (!a1 && !a2) return true;
    if (!a1 || !a2) return false;
    return a1.length === a2.length && a1.every((v: any, i: number) => {
        return v === a2[i];
    });
}
