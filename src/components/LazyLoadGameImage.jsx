import { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

export default function LazyLoadGameImage({ image }) {

    const [hovered, setHovered] = useState(false);


    return (
        <div className="game-card">
            <LazyLoadImage
                alt="game image"
                effect="blur"
                src={image}
                wrapperProps={{ style: { transitionDelay: "0.1s" } }}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                style={{
                    transition: 'transform 0.5s ease-in-out',
                    transform: hovered ? 'scale(1.1)' : 'scale(1)',
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                }}
            />
        </div>
    );
}