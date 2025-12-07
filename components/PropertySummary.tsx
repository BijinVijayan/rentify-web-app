// import { SaveFavoriteButton } from './SaveFavoriteButton'

import {IoLocationOutline} from "react-icons/io5";
import {SaveFavoriteButton} from "@/components/index";

type Props = {
    title: string;
    address: string;
    isFavorite?: boolean;
    onFavoriteToggle?: () => void;
};
export default function PropertySummary({ title, address, ...rest }: Props) {
    return (
        <div className="flex items-center justify-between my-2 px-4">
            <div>
                <h1 className="text-xl sm:text-2xl md:text-3xl text-primary-text font-bold mb-1">{title}</h1>
                <div className="flex items-center text-gray-text max-sm:text-sm">
                    <IoLocationOutline fontWeight={700} className={"hidden sm:block my-2"}/>
                    {address}
                </div>
            </div>
            <div className={"hidden sm:block"}>
                <SaveFavoriteButton />
            </div>

        </div>
    );
}
