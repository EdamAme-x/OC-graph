export function isIn(str, target) {
    return str.replace(target, "_isIn_") !== str;
}