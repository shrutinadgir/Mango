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

export function toNumber(value) {
    let result = Number(value);
    if (isNaN(result)) { return 0; }
    return result;
}

export function doubleDecimal(value: Number) {
    return toNumber(value.toFixed(2));
}

export function isNotNullAndUndefined(value) {
    return value != null && value != undefined;
}

export function addUniqueEntries(array: any[], array2: any[]) {
    if (isNotEmptyArray(array2)) {
        array2.forEach(_d => {
            addUniqueEntry(array, _d);
        });
    }
    return array;
}

export function addUniqueEntry(array: any[], data: any) {
    if (data && data.id && Array.isArray(array)) {
        let index = array.findIndex(a => (a && a.id == data.id));
        if (index == -1) {
            array.push(data);
        } else { array[index] = data }
    } else if (data && typeof data != 'object' && Array.isArray(array)) {
        let index = array.indexOf(data);
        if (index == -1) {
            array.push(data);
        } else { array[index] = data }
    }
    return array;
}