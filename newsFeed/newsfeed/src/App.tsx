import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {NewsFeed} from "./news-feed/NewsFeed";
import {StoryProps} from "./story";
import {AddStoryForm} from "./story/AddStoryForm";
import {EditStoryForm} from "./story/EditStoryForm";

// export interface AppState {
//     story:StoryProps[]
// }

export const App = () => {
    const storiesData=[
        {
            id:1,
            text: "something",
            name: "Alex",
        }
        ,
        {
            id:2,
            text: "something else",
            name: "Laurentiu",
        }
    ]

    const initialFormState={id: 0,name:'',text:''}
    //pt ca nu stim pana nu selectam cine va fi editat presupunem ca nimeni pt inceput si ca valorile is care is

    const[stories,setStories]=useState(storiesData)
    const [editing, setEditing]=useState(false);
    const [currentStory,setCurrentStory]=useState(initialFormState)
    //pt a stii care e story ul selectat

    const addStory=(story:StoryProps)=>{
        story.id=stories.length+1
        setStories([...stories,story])
    }

    const deleteStory=(id:number)=>{
        setStories(stories.filter(story=>story.id !== id))
    }


//------------------------------------------------------------------------------------------------

    //aici ar trebui sa fie story de tipul state ului din app dar habar nu am cum o transmit decat daca fac o interfata de state
    const editRow=(story:StoryProps)=>{
        setEditing(true)
        setCurrentStory({id: story.id, name: story.name, text: story.text})
    }

    const updateStory=(id:any,updateStory:any)=>{
        setEditing(false);
        setStories(stories.map(story=>(story.id===id ? updateStory: story)))
    }
//-----------------------------------------------------------------------------------------------------------------
    return (
    <div className="container">
      <h1>NEWS FEED</h1>
      <div className="flex-row">
        <div className="flex-large">
            {editing? (
                <div>
                    <h2>Edit user</h2>
                    <EditStoryForm
                        editing={editing}
                        setEditing={setEditing}
                        currentUser={currentStory}
                        updateUser={updateStory}
                    />
                </div>
                ):(
                    <div>
                      <h2>Add a story</h2>
                        <AddStoryForm addStory={addStory}/>

                    </div>

                )}

            <div className="flex-large">
                <h2> View stories </h2>
                <NewsFeed stories={stories} deleteStoryProps={deleteStory} editRow={editRow}/>
            </div>
                    </div>


      </div>

    </div>

  );
}


