import { EVENTS } from "./assets/consts";
import { BUTTONS } from "./assets/consts";
export function navigate(href){
    console.log("over nav");
    window.history.pushState({}, '', href)
    const navigationEvent = new Event(EVENTS.PUSHSTATE)
    window.dispatchEvent(navigationEvent)
}

export function Link({target, to, ...props}){
    const handleClick = (event)=>{
        const isMainEvent = event.button === BUTTONS.primary
        const isModifiedEvent = event.metakey || event.altKey || event.ctrlKey || event.shiftKey
        const isManageableEvent = target === undefined || target === '_self'

        if(isMainEvent || isManageableEvent || !isModifiedEvent){
            event.preventDefault()
            navigate(to)
        }
        navigate(to)
    }
    return <a onClick={handleClick} href={to} target={target} {...props}/>
}