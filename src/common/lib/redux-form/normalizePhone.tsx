const normalizePhone = (value: string) => {
    if (!value) {
        return value;
    }
    // phone numbers can be 9, 10 or 11 digits
    // 322342914 - 9 digits
    // 3299168204 - 10 digits
    // 32999168204 - 11 digits

    const onlyNums = value.replace(/[^\d]/g, "");
    if (onlyNums.length < 3) {
        return onlyNums;
    }
    if (onlyNums.length >= 3 && onlyNums.length < 9) {
        return `(${onlyNums.slice(0, 2)}) ${onlyNums.slice(2)}`;
    }
    if (onlyNums.length === 9) {
        return `(${onlyNums.slice(0, 2)}) ${onlyNums.slice(2, 5)}-${onlyNums.slice(5)}`;
    }
    if (onlyNums.length === 10) {
        return `(${onlyNums.slice(0, 2)}) ${onlyNums.slice(2, 6)}-${onlyNums.slice(6)}`;
    }
    return `(${onlyNums.slice(0, 2)}) ${onlyNums.slice(2, 7)}-${onlyNums.slice(7, 11)}`;
};

export default normalizePhone;
