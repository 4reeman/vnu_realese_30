type Prop = {
    srcset: string,
    media: string,
    type: string
}

export default function Source({srcset, media, type }: Prop) {
    return (
        <source srcSet={srcset} media={media} type={type}/>
    )
}