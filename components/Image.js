import { urlFor } from "../sanity";

const Image = ({ identifier, image, className }) => {
    return (
        <div className={identifier === "main-image" ? "main-image" : "image"}>
            <img src={urlFor(image).auto("format")} className={className} />
        </div>
    );
};

export default Image;
