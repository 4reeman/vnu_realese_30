import {Image} from "@/types";

type Props = {
    img: Image,
    styles?: string,
    img_styles?: any
}

import Source from "@/app/[language]/components/Image/Source";
import EmptyImage from "@/app/[language]/components/Image/EmptyImage";

export default function Picture({ img, styles, img_styles }: Props) {

    img = img ?? ''

    return (
        <picture className={`${styles}`}>
            <>
                {img.attributes?.map((attribute, index) => (
                    <Source key={index} srcset={attribute.srcset} media={attribute.media} type={attribute.type} />
                ))}
            </>
            <EmptyImage alt={img.alt}  img_styles={img_styles}/>
        </picture>
    )
}