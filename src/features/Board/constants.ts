
interface constantsInterface{
    Board: HTMLElement | null
    bottomScroll: HTMLElement | null
    rightScroll: HTMLElement | null
}

type ConstName = 'Board' | 'bottomScroll' | 'rightScroll';

export const constants: constantsInterface  = {
    'Board': null,
    'bottomScroll': null,
    'rightScroll': null
}

export function setConstants(el: HTMLElement | null, name: ConstName) {
    constants[name] = el;
}

export function getConstants(name: ConstName) {
    return constants[name]
}
