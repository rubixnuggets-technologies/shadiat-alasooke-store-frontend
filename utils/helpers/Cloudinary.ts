import { ImageLoaderProps } from "next/image";

export const ImageLoader = ({ src, width }: ImageLoaderProps) => {
  const origin = "https://res.cloudinary.com/demw3uawq/image/upload"

  // optimize image transformers to reduce load times. 
  // return `${origin}/w_${width}/${src}`
  return `${origin}/f_auto,q_auto/${src}`
}

export const MedusaImageLoader = ({ src, width }: ImageLoaderProps) => {
  // TODO: extract keys from image & add cloudinary transformer
  
  return `${src}`
}