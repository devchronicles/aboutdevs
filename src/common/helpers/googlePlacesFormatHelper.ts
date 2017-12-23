const regex = /^(.*)\$\$\$(.*)$/;

export function validateFormattedAddress(str: string): boolean {
    if (!str) throw Error("Argument is null or undefined. Argument: str");
    return regex.test(str);
}

export function getDataFromFormattedAddress(formattedAddress: string): { placeId: string; address: string } {
    if (!formattedAddress) throw Error("Argument is null or undefined. Argument: formattedAddress");
    const result = regex.exec(formattedAddress);
    if (result) {
        return {
            placeId: result[1],
            address: result[2],
        };
    }
    return null;
}

export function formatAddress(placeId: string, address: string): string {
    if (!placeId) throw Error("Argument is null or undefined. Argument: placeId");
    if (!address) throw Error("Argument is null or undefined. Argument: address");

    return `${placeId}$$$${address}`;
}
