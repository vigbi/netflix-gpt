import React from 'react'
import GptSearchBar from './GptSearchBar'
import GptMovieSuggesstions from './GptMovieSuggesstions'

const GptSearch = () => {
    return (
        <div>
            <div className="absolute -z-10">
                <img src="https://assets.nflxext.com/ffe/siteui/vlv3/826348c2-cdcb-42a0-bc11-a788478ba5a2/6d20b198-e7ab-4e9f-a1aa-666faa0298f9/IN-en-20240729-POP_SIGNUP_TWO_WEEKS-perspective_WEB_a67d8c9e-8121-4a74-98e4-8005eb2df227_large.jpg" alt="logo" />
            </div>
            <GptSearchBar />
            <GptMovieSuggesstions />
        </div>
    )
}

export default GptSearch