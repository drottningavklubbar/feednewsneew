import React from 'react';
import {BtnLike} from "./btn-like/BtnLike";
import {StoryProps} from "../story";


export interface NewsFeedProps {
    stories:StoryProps[]
}

export const NewsFeed = (props:NewsFeedProps) =>(
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
                        <button className="button muted-button">Edit</button>
                        <button className="button muted-button">Delete</button>
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