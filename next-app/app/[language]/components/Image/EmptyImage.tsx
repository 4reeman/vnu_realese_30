type Prop = {
    alt: string
    img_styles?: string
}

export default function EmptyImage({ alt, img_styles }: Prop) {
    return (
        <img className={`${img_styles}`} src="data:image/gif;base64,R0lGODlhAQABAIABAP///wAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" alt={alt}/>
    )
}