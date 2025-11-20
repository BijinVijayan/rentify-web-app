type Props = {
    images: string[];
    thumbnailUrls?: string[];
    onShowAll?: () => void;
};
export default function PropertyImageGallery({ images, thumbnailUrls, onShowAll }: Props) {
    return (
        <div className="grid grid-cols-2 gap-2">
            <div>
                <img src={images[0]} className="col-span-2 rounded cursor-pointer aspect-[4/3]" />
            </div>
            {images.length >= 2 && (
                <div className="grid grid-cols-2 gap-2">
                    {images.slice(1, 4).map((img, i) => (
                        <div key={i} >
                            <img  src={img} className="rounded cursor-pointer aspect-[4/3]" />
                        </div>
                    ))}
                    {images.length > 4 && (
                    <button className="rounded cursor-pointer bg-black bg-opacity-40 text-white flex items-center justify-center">
                        +{images.length - 4} Show all photos
                    </button>
                    )}
                </div>
            )}
        </div>
    );
}
