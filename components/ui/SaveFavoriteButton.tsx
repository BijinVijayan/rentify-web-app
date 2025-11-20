import React from 'react'
import {FaRegHeart} from "react-icons/fa";

const SaveFavoriteButton = () => {
    return (
        <div>
            <div className={"bg-white text-red-500 text-2xl p-3 rounded-full shadow-sm cursor-pointer border border-slate-100"}>
                <FaRegHeart />
            </div>
        </div>
    )
}
export default SaveFavoriteButton
