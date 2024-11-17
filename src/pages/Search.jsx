import { useEffect } from "react";

    export default function SearchPage({ routeParams }){
        useEffect(()=>{
            //console.log("at router++++++")
            //console.log(routeParams)
            document.title = `Has buscado ${routeParams.query}`
    }, [])
    /*{routeParams.query}*/ 
    return (
        <h2>Has Buscado {routeParams.query}</h2>
    )

}