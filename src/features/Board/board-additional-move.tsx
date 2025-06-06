import { createRoot } from 'react-dom/client';
import { createContainerWithId } from '../../utils.ts';
import { BottomScroll, RightScroll } from './components'


function initSideScroll(targetElement: HTMLDivElement): void {
    const parent = targetElement.parentElement;

    if (!parent) return;

    const bottomScrollContainer = createContainerWithId('bottomScrollContainer');
    const rightScrollContainer = createContainerWithId('rightScrollContainer');

    parent.appendChild(bottomScrollContainer);
    parent.appendChild(rightScrollContainer);

    const rootBottomContainer = createRoot(bottomScrollContainer);
    const rootRightContainer = createRoot(rightScrollContainer);

    rootBottomContainer.render(
        <BottomScroll parent={parent} target={targetElement}/>
    )

    rootRightContainer.render(
        <RightScroll parent={parent} target={targetElement}/>
    )
}

export default initSideScroll;
