import {manageBorderObjectInterface} from "../../../utils-types.ts";
import {manageBorderLimits, prepareDataBorderLimits} from "./board-utils.ts";


function scrollKeyController(direction: number, target: HTMLElement, withShift: boolean) {
    const manageData: manageBorderObjectInterface = prepareDataBorderLimits(target)
    const parentRect = target.parentElement!.getBoundingClientRect();

    if (withShift) {
        manageData.prevRectX = manageData.prevRectX - parentRect.left;
        manageData.translateX =
            manageData.prevTranslateX -
            direction +
            (parentRect.x * (direction / 100));
    } else {
        manageData.prevRectY = manageData.prevRectY - parentRect.top;
        manageData.translateY =
            manageData.prevTranslateY -
            direction +
            (parentRect.y * (direction / 100));
    }

    target.style.transition = '0.08s';
    manageBorderLimits(manageData);
}


function scrollMouseController(direction: number, target: HTMLElement, withShift: boolean) {
    const manageData: manageBorderObjectInterface = prepareDataBorderLimits(target)
    const parentRect = target.parentElement!.getBoundingClientRect();

    if (withShift) {
        manageData.prevRectX = manageData.prevRectX - parentRect.left;
        manageData.translateX = direction
    } else {
        manageData.prevRectY = manageData.prevRectY - parentRect.top;
        manageData.translateY = direction
    }

    manageBorderLimits(manageData);
}


export {
    scrollKeyController,
    scrollMouseController
}