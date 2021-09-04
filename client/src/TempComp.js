import TempChild from "./TempChild";
import {useRef} from "react";

export default () => {

    const t = useRef('qwert')
    let k = 1
    return (
        <>< TempChild text={t.current} key={k}>
        < /TempChild>
            <button onClick={() => {
                t.current = 'pressed'
                k++
            }}>
                tap
            </button>
            <button onClick={() => {
                console.log(t.current)
            }}>
                log
            </button>
        </>)
}