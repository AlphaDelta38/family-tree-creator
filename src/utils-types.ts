type DownEventName = 'mousedown' | 'touchstart';
type MoveEventName = 'mousemove' | 'touchmove';
type UpEventName = 'mouseup' | 'touchend';

export interface DeviceEventsInterface {
    down: DownEventName;
    move: MoveEventName;
    up: UpEventName;
}

export interface manageBorderObjectInterface {
    element: HTMLElement;
    translateX: number;
    translateY: number;
    prevRectX: number;
    prevRectY: number;
    prevTranslateX: number;
    prevTranslateY: number;
}

export interface coordinateInterface {
    x: number;
    y: number;
}
