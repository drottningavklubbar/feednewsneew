import {useState} from "react";
import React from "react";

export const BtnLike=()=>{
    const [btnlikeState,btnLikeSetState]=useState(false);

    const handleClick=()=>{
        btnLikeSetState(!btnlikeState)
    };

    const label= btnlikeState?'Like':'Unlike'

    return(
            <button className="button muted-button" onClick={()=>handleClick()}>{label}</button>
    )
}


