import { useState, useEffect } from "react";
import style from './Message.module.css'

function Message({type, msg}) {
    const [visibile,setVisibile] = useState(false)

    useEffect(() => {
        if(!msg) {
            setVisibile(false) 
            return
        }
        setVisibile(true)

        const timer = setTimeout(() => {
            setVisibile(false)
        }, 3000)
        return () => clearTimeout(timer)
    }, [msg])

    return <>
    {visibile && (
        <div className={`${style.message} ${style[type]}`}>{msg}</div>
    )}
    </>
}

export default Message;