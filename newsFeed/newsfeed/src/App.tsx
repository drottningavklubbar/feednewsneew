import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {NewsFeed} from "./news-feed/NewsFeed";
import {StoryProps} from "./story";
import {AddStoryForm} from "./story/AddStoryForm";


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

    const[stories,setStories]=useState(storiesData)

    const addStory=(story:StoryProps)=>{
        story.id=stories.length+1
        setStories([...stories,story])
    }



  return (
    <div className="container">
      <h1>NEWS FEED</h1>
      <div className="flex-row">
        <div className="flex-large">
          <h2>Add a story</h2>
            <AddStoryForm addStory={addStory}/>
        </div>
        <div className="flex-large">
          <h2> View stories </h2>
            <NewsFeed stories={stories}/>
        </div>

      </div>
    </div>

  );
}


