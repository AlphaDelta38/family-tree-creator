import cl from './modules/Board.module.scss';
import { useEffect, useRef } from 'react';
import { coordinateInterface } from './types/constant-types.ts';
import {
    getTranslateValues,
    getNameOfDeviceEvents,
    getClientCoordinate,
    manageBorderLimits,
} from '../../utils.ts';
import { DeviceEventsInterface } from '../../utils-types.ts';

function Board() {
    const boardRef = useRef<HTMLDivElement | null>(null);
    const coordinateRef = useRef<coordinateInterface>({
        startX: 0,
        startY: 0,
        prevRectX: 0,
        prevRectY: 0,
        prevTranslateX: 0,
        prevTranslateY: 0,
    });

    const { down, move, up }: DeviceEventsInterface = getNameOfDeviceEvents();

    function mouse3Down(event: MouseEvent | TouchEvent) {
        if (event instanceof MouseEvent && event.button !== 1) return;

        const element = boardRef.current;
        const coordinate = getClientCoordinate(event);

        if (!element) return;

        const rect = element.getBoundingClientRect();
        const prevPosition = getTranslateValues(element);
        const x = coordinate.x - rect.left;
        const y = coordinate.y - rect.top;

        const container = element.offsetParent as HTMLElement;
        const containerRect = container.getBoundingClientRect();

        coordinateRef.current = {
            startX: Math.ceil(x),
            startY: Math.ceil(y),
            prevRectX: Math.ceil(rect.left) - Math.ceil(containerRect.left),
            prevRectY: Math.ceil(rect.top) - Math.ceil(containerRect.top),
            prevTranslateX: Math.ceil(prevPosition.x),
            prevTranslateY: Math.ceil(prevPosition.y),
        };

        window.addEventListener(move, mouseMove);
        window.addEventListener(up, mouse3Up);

        element.style.cursor = 'move';
    }

    function mouseMove(event: MouseEvent | TouchEvent) {
        const element = boardRef.current;

        if (!element) return;

        const coordinate = getClientCoordinate(event);

        const {
            startX,
            startY,
            prevRectX,
            prevRectY,
            prevTranslateX,
            prevTranslateY,
        } = coordinateRef.current;

        const container = element.offsetParent as HTMLElement;
        const containerRect = container.getBoundingClientRect();

        // prettier-ignore
        const translateX = coordinate.x - prevRectX - startX + prevTranslateX - containerRect.left;
        // prettier-ignore
        const translateY = coordinate.y - prevRectY - startY + prevTranslateY - containerRect.top;

        manageBorderLimits({
            element,
            translateX,
            translateY,
            prevRectX,
            prevRectY,
            prevTranslateX,
            prevTranslateY,
        });
    }

    function mouse3Up(event: MouseEvent | TouchEvent) {
        if (event instanceof MouseEvent && event.button !== 1) return;

        window.removeEventListener(move, mouseMove);
        window.removeEventListener(up, mouse3Up);

        const element = boardRef.current;
        if (!element) return;
        element.style.cursor = 'default';
    }

    useEffect(() => {
        const element = boardRef.current;

        if (!element) return;

        element.addEventListener(down, mouse3Down);

        return () => {
            element.removeEventListener(down, mouse3Down);
            window.removeEventListener(move, mouseMove);
            window.removeEventListener(up, mouse3Up);
        };
    }, [boardRef]);

    return (
        <div className={cl.container}>
            <div ref={boardRef} className={cl.board}>
                <div className={cl.test}></div>
            </div>
        </div>
    );
}

export default Board;
