import { EVENTS } from './assets/consts'
import { useState, useEffect, Children } from 'react'
import { match } from 'path-to-regexp'

export function Router({children, routes = [], defaultComponent: DefaultComponent = () => <h1>404 page not found</h1>}){
    //, defaultComponent: DefaultComponent = () => <h1>404 page not found</h1>}
    const [currentPath, setCurrentPath] = useState(window.location.pathname)
    /******************************/
    useEffect(()=>{
        const onLocationChange = () =>{
          setCurrentPath(window.location.pathname);
        }
        window.addEventListener(EVENTS.PUSHSTATE, onLocationChange);
        window.addEventListener(EVENTS.POPSTATE, onLocationChange);
    
        return () => {
          window.removeEventListener(EVENTS.PUSHSTATE, onLocationChange);
          window.addEventListener(EVENTS.POPSTATE, onLocationChange);
        }
      },[])
    /******************************/
    let routeParams = {};

    const routesFromChildren = Children.map(children, ({props, type})=>{
      const { name } = type
      const isRoute = name === 'Route'
      return isRoute ? props : null
    })

    const routesToUse = routes.concat(routesFromChildren)

    const Page = routesToUse.find(({path}) => {
      if(path === currentPath) return true
      
      const matchedUrl = match(path, {decode: decodeURIComponent})
      const matched = matchedUrl(currentPath)
      if(!matched) return false
      routeParams = matched.params
      return true
      ///path === currentPath
    })?.Component

    //return Page ? <Page /> : <DefaultComponent/>
    //49.15

    return Page
      ? <Page routeParams={routeParams}/>
      : <DefaultComponent routeParams={routeParams}/>

  }