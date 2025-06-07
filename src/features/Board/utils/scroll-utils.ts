import { manageBorderObjectInterface } from "../../../utils-types.ts";
import { manageBorderLimits, prepareDataBorderLimits } from "./board-utils.ts";
import { getConstants } from "../constants.ts";


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


function scrollMouseController(inputPercentage: number, target: HTMLElement, withShift: boolean) {
    const manageData: manageBorderObjectInterface = prepareDataBorderLimits(target)
    const parentRect = target.parentElement!.getBoundingClientRect();

    const percentage = (inputPercentage * 2) / 100
    const direction: number = inputPercentage > 50 ? 1 : -1;

    const sideOfTargetElement = withShift
        ? (target.offsetWidth - window.innerWidth) / 2
        : (target.offsetHeight - window.innerHeight) / 2


    if (withShift) {
        manageData.prevRectX = manageData.prevRectX - parentRect.left;
        manageData.translateX = sideOfTargetElement * percentage * direction
    } else {
        manageData.prevRectY = manageData.prevRectY - parentRect.top;
        manageData.translateY = sideOfTargetElement * percentage * direction
    }

    manageBorderLimits(manageData);
}


function setScrollMove(valueX: number, valueY: number){
    const bottomScroll = getConstants('bottomScroll')
    const rightScroll = getConstants('rightScroll')

    if (!bottomScroll || !rightScroll) return;

    bottomScroll.style.left = `${valueX}%`
    bottomScroll.style.transform = `translateX(${-valueX}%)`

    rightScroll.style.top = `${valueY}%`
    rightScroll.style.transform = `translateY(${-valueY}%)`
}


function getSideInPercent(element: HTMLElement, side: 'left' | 'top'){
    const parent = element.parentElement;

    if(!parent) return 0;

    const leftPx = parseFloat(getComputedStyle(element)[side]);
    const parentWidth = parent.offsetWidth;

    return (leftPx / parentWidth) * 100;
}


export {
    scrollKeyController,
    scrollMouseController,
    getSideInPercent,
    setScrollMove
}
