import {scrollParamsInterface} from "../types/types.ts";
import { scrollKeyController } from '../utils/scroll-utils.ts'
import {ReactElement, useEffect, useRef, useState} from "react";
import cl from "../modules/board-additional-move.module.scss";
import { useKeyWithMouseScroll } from "../hooks";
import {setConstants} from "../constants.ts";

function RightScroll({parent, target}: scrollParamsInterface): ReactElement {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [windowHeight, setWindowHeight] = useState(window.innerHeight);


    useKeyWithMouseScroll({target, useShift: false})


    const handleResize = () => {
        setWindowHeight(window.innerHeight);
    }

    useEffect(() => {
        if(scrollRef && scrollRef.current){
            const height = ( windowHeight / target.clientHeight ) * 100;
            scrollRef.current.style.height = `${Math.round(height)}%`
        }
    }, [windowHeight, target.clientHeight]);

    useEffect(() => {
        handleResize()

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        }
    }, []);

    useEffect(() => {
        setConstants(scrollRef.current, 'rightScroll')
    }, []);

    return (
        <div ref={scrollRef} className={cl.rightScroll}>

        </div>
    );
}

export default RightScroll;