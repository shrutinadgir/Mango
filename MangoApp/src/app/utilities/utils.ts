export function trim(value: string) {
    if (value) return value.trim();
    return value;
}

export function tolowercase(value: string) {
    if (value) return value.trim().toLowerCase();
    return value;
}

export function touppercase(value: string) {
    if (value) return value.toUpperCase();
    return value;
}

export function isNotEmptyArray(array) {
    if (array && Array.isArray(array) && array.length > 0) return true;
    return false;
}

export function isEmptyArray(array) {
    if (!array || (Array.isArray(array) && array.length == 0)) return true;
    return false;
}

export function isObjectEmpty(obj) {
    if (Object.keys(obj).length == 0) return true;
    return false;
}

export function isNotBlank(value: string): boolean {
    return (value && trim(value) != '');
}

export function isBlank(value: string): boolean {
    return (!value || trim(value) == '');
}