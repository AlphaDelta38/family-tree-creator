import { manageBorderObjectInterface}  from "../../../utils-types.ts";
import { getTranslateValues } from "../../../utils.ts";

export function manageBorderLimits(elementData: manageBorderObjectInterface): void {
    const maxX = elementData.prevTranslateX + Math.ceil(elementData.prevRectX) * -1;
    const maxY = elementData.prevTranslateY + Math.ceil(elementData.prevRectY) * -1;

    const limitedTranslateX =
        elementData.translateX <= maxX && elementData.translateX >= maxX * -1
            ? elementData.translateX
            : elementData.translateX > 0
                ? maxX
                : maxX * -1;

    const limitedTranslateY =
        elementData.translateY <= maxY && elementData.translateY >= maxY * -1
            ? elementData.translateY
            : elementData.translateY > 0
                ? maxY
                : maxY * -1;
    
    elementData.element.style.transform = `translate(${limitedTranslateX}px, ${limitedTranslateY}px)`;
}


export function prepareDataBorderLimits(target: HTMLElement): manageBorderObjectInterface {
    const prevPosition = getTranslateValues(target);
    const targetRect = target.getBoundingClientRect();

    return {
        element: target,
        prevRectX: targetRect.left,
        prevRectY: targetRect.top,
        prevTranslateX: prevPosition.x,
        prevTranslateY: prevPosition.y,
        translateX: prevPosition.x,
        translateY: prevPosition.y,
    }
}