import {ChangeEvent, useEffect, useState} from "react";
import {StoryProps} from "../story";
import React from 'react';


export let EditStoryForm: (props: any) => any;
EditStoryForm = (props: any) => {

    //const initialFormState={id:0,name:"",text:""}
    const [storyState, setStoryState] = useState(props.currentStory);

    useEffect(() => {
            setStoryState(props.currentStory)
        },
        [props]
    );

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setStoryState({...storyState, [name]: value})
    };


    const handleOnSubmit = (event: any) => {
        event.preventDefault();

        props.updateStory(storyState.id, storyState);
    };


    return (
        <form onSubmit={handleOnSubmit}>
            <label>Name</label>
            <input type="text" name="name" value={storyState.name} onChange={handleInputChange}/>
            <label>Write your Story</label>
            <input type="text" name="text" value={storyState.text} onChange={handleInputChange}/>
            <button>Update story</button>
            <button onClick={() => {
                props.setEditing(false)
            }} className="button muted-button">Cancel
            </button>
        </form>
    )

};