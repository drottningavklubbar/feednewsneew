import React from 'react';
import {BtnLike} from "./btn-like/BtnLike";
import {StoryProps} from "../story";


export interface NewsFeedProps {
    stories:StoryProps[],
    deleteStoryProps?: any,
    editRow?:any
    //ce reprezinta de fapt acest any ? am incercat cu (id:number)=>void dar nu functioneaza - cannot invoke an object which is possibly undefined
}

export const NewsFeed = (props:NewsFeedProps) =>{
    const {stories,deleteStoryProps,editRow}=props;
    return(
        <table>
            <thead>
            <tr>
                <th>Name</th>
                <th>Story</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {props.stories.length > 0 ?(
                props.stories.map((story) =>(
                    <tr key={story.id}>
                        <td>{story.name}</td>
                        <td>{story.text}</td>
                        <td>
                            <button className="button muted-button" onClick={()=>{editRow(story)}}>Edit</button>
                            <button className="button muted-button" onClick={()=>{deleteStoryProps(story.id)}}>Delete</button>
                            <BtnLike />
                        </td>
                    </tr>
                ))
            ):(
                <tr aria-colspan={3}>No story</tr>
            )
            }

            </tbody>
        </table>
    )
}