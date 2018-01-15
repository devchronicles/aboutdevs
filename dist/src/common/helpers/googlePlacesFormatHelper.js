"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const regex = /^(.*)\$\$\$(.*)$/;
function validateFormattedAddress(str) {
    if (!str)
        throw Error("Argument is null or undefined. Argument: str");
    return regex.test(str);
}
exports.validateFormattedAddress = validateFormattedAddress;
function getDataFromFormattedAddress(formattedAddress) {
    if (!formattedAddress)
        throw Error("Argument is null or undefined. Argument: formattedAddress");
    const result = regex.exec(formattedAddress);
    if (result) {
        return {
            placeId: result[1],
            address: result[2],
        };
    }
    return null;
}
exports.getDataFromFormattedAddress = getDataFromFormattedAddress;
function formatAddress(placeId, address) {
    if (!placeId)
        throw Error("Argument is null or undefined. Argument: placeId");
    if (!address)
        throw Error("Argument is null or undefined. Argument: address");
    return `${placeId}$$$${address}`;
}
exports.formatAddress = formatAddress;
//# sourceMappingURL=googlePlacesFormatHelper.js.map