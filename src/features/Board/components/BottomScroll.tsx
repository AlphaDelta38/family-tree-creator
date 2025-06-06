import { scrollParamsInterface } from "../types/types.ts";
import { scrollKeyController, scrollMouseController } from '../utils/scroll-utils.ts'
import {coordinateBottomScrollRef} from "../types/constant-types.ts";
import {ReactElement, useEffect, useRef, useState} from "react";
import cl from "../modules/board-additional-move.module.scss";
import { useKeyWithMouseScroll } from "../hooks";

function BottomScroll({ parent, target }: scrollParamsInterface): ReactElement {
    const scrollRef = useRef<HTMLDivElement>(null);
    const coordinateRef = useRef<coordinateBottomScrollRef>({
        lastX: 0,
        lastScrollX: 0,
    });
    const scrollSideLimitsRef = useRef<number>(0)
    const beforeResizeScreenWidth = useRef<number>(parent.clientWidth)
    const windowWidthRef = useRef(parent.clientWidth)
    const [windowWidth, setWindowWidth] = useState(parent.clientWidth);


    useKeyWithMouseScroll({target, useShift: true})



    function scrollMouseDown(e: MouseEvent){
        if(!scrollRef.current) return;

        const lastX = scrollRef.current.style.left.split('px')[0]

        coordinateRef.current = {
            lastX: e.clientX,
            lastScrollX: Number(lastX)
        }

        window.addEventListener("mousemove",  scrollMouseMove)
        window.addEventListener("mouseup",  scrollMouseUp)
    }


    function scrollMouseMove(e: MouseEvent){
        if(!scrollRef.current) return;

        const direction = e.clientX - coordinateRef.current.lastX
        const clampByLimitNumber = Math.max(
            Math.min(direction + coordinateRef.current.lastScrollX, scrollSideLimitsRef.current),
            (scrollSideLimitsRef.current * -1)
        )

        scrollRef.current.style.left = `${clampByLimitNumber}px`

        scrollMouseController(
            clampByLimitNumber * -(target.clientWidth / windowWidth ),
            target,
            true
        )

    }


    function scrollMouseUp(){
        window.removeEventListener("mousemove",  scrollMouseMove)
        window.removeEventListener("mouseup",  scrollMouseUp)
    }


    const handleResize = () => {
        const windowContainer = document.getElementById('#BoardContainer');
        if(windowContainer){
            beforeResizeScreenWidth.current = windowWidthRef.current
            setWindowWidth(windowContainer.clientWidth);
            windowWidthRef.current = windowContainer.clientWidth
        }
    }

    const scrollReSettingsHandler = (oldWidth: string) =>{
        if (!oldWidth || !scrollRef.current) return;


    }


    useEffect(() => {
        if(scrollRef && scrollRef.current){
            const width = ( windowWidth / target.clientWidth ) * 100;

            scrollReSettingsHandler(scrollRef.current.style.width)

            scrollRef.current.style.width = `${Math.round(width)}%`

            scrollRef.current.addEventListener("mousedown", scrollMouseDown)

            const widthRatioPercent = (windowWidth / target.clientWidth) * 100
            scrollSideLimitsRef.current = (windowWidth - ((windowWidth / 100) * widthRatioPercent)) / 2

            return () =>{
                if(scrollRef && scrollRef.current){
                    scrollRef.current.removeEventListener("mousedown", scrollMouseDown)
                }
                window.removeEventListener("mousemove",  scrollMouseMove)
            }
        }
    }, [windowWidth, target.clientWidth]);

    useEffect(() => {
        handleResize()

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        }

    }, []);

    return (
        <div ref={scrollRef} className={cl.bottomScroll}>

        </div>
    );
}

export default BottomScroll;