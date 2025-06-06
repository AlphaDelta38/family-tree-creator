import { useEffect, useRef} from "react";
import { scrollKeyController } from "../utils/scroll-utils.ts";


interface props{
    target: HTMLElement
    useShift: boolean
}

function useKeyWithMouseScroll({ useShift, target }: props){
    const timeOutRef = useRef<number | null>(null)

    useEffect(() => {
        function scroll(event: WheelEvent){
            if(useShift && !event.shiftKey || !useShift && event.shiftKey) return;
            if (timeOutRef.current){
                clearTimeout(timeOutRef.current);
                timeOutRef.current = null;
            }

            scrollKeyController(event.deltaY, target, useShift);

            if(!timeOutRef.current){
                timeOutRef.current = setTimeout(()=>{
                    target.style.transition = 'none';
                }, 400);
            }
        }

        parent.addEventListener('wheel', scroll);

        return () => {
            parent.removeEventListener('wheel', scroll);

        }
    }, [target.clientWidth]);
}


export default useKeyWithMouseScroll