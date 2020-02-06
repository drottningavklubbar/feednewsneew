import {ChangeEvent, useState} from "react";
import {StoryProps} from "../story";
import React from 'react';

//cum e aceasta interfata in cazul acesta?

export const AddStoryForm=(props:any)=>{

    const initialFormState={id:0,name:"",text:""}
    const [storyState,setStoryState]=useState(initialFormState);



    const handleInputChange=(event:React.ChangeEvent<HTMLInputElement>)=>{
        const {name,value}=event.target
        setStoryState({...storyState,[name]:value})
    }



    const handleOnSubmit=(event:any)=>{
        event.preventDefault()
       if(! storyState.name || !storyState.text) return

        props.addStory(storyState);
        setStoryState(initialFormState);
    }


return(
    <form onSubmit={handleOnSubmit}>
        <label>Name</label>
        <input type="text" name="name" value={storyState.name} onChange={handleInputChange}/>
        <label>Write your Story</label>
        <input type="text" name="text" value={storyState.text} onChange={handleInputChange}/>
        <button>Add new story</button>
    </form>
)

}