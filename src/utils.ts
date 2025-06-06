import {
    DeviceEventsInterface,
    coordinateInterface,
} from './utils-types.ts';

export function getTranslateValues(el: HTMLElement): coordinateInterface {
    const style = window.getComputedStyle(el);
    const transform = style.transform;

    if (transform === 'none') {
        return { x: 0, y: 0 };
    }

    const matrixValues = /matrix\(([^)]+)\)/.exec(transform);
    if (matrixValues) {
        const values = matrixValues[1].split(',').map(parseFloat);
        return {
            x: values[4],
            y: values[5],
        };
    }

    return { x: 0, y: 0 };
}

export function isMobileDevice(): boolean {
    return /Mobi|Android|iPhone|iPad|iPod|Windows Phone/i.test(
        navigator.userAgent,
    );
}

export function getNameOfDeviceEvents(): DeviceEventsInterface {
    return isMobileDevice()
        ? { down: 'touchstart', move: 'touchmove', up: 'touchend' }
        : { down: 'mousedown', move: 'mousemove', up: 'mouseup' };
}

export function getClientCoordinate(
    event: MouseEvent | TouchEvent,
): coordinateInterface {
    if (event instanceof MouseEvent) {
        return { x: event.clientX, y: event.clientY };
    } else {
        return { x: event.touches[0].clientX, y: event.touches[0].clientY };
    }
}

export function createContainerWithId(id: string): HTMLDivElement {
    const scrollContainer = document.createElement('div');
    scrollContainer.id = id;
    return scrollContainer;
}