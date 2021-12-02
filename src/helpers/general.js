export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function random(min, max) {
    return Math.trunc(Math.random() * (max - min) + min);
}