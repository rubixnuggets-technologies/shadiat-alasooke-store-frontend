import type {
    SanityReference,
    SanityKeyedReference,
    SanityAsset,
    SanityImage,
    SanityFile,
    SanityGeoPoint,
    SanityBlock,
    SanityDocument,
    SanityImageCrop,
    SanityImageHotspot,
    SanityKeyed,
    SanityImageAsset,
    SanityImageMetadata,
    SanityImageDimensions,
    SanityImagePalette,
    SanityImagePaletteSwatch,
  } from "sanity-codegen";
  
  export type {
    SanityReference,
    SanityKeyedReference,
    SanityAsset,
    SanityImage,
    SanityFile,
    SanityGeoPoint,
    SanityBlock,
    SanityDocument,
    SanityImageCrop,
    SanityImageHotspot,
    SanityKeyed,
    SanityImageAsset,
    SanityImageMetadata,
    SanityImageDimensions,
    SanityImagePalette,
    SanityImagePaletteSwatch,
  };
  
  /**
   * Product
   *
   *
   */
  export interface Product extends SanityDocument {
    _type: "product";
  
    /**
     * Title — `string`
     *
     *
     */
    title?: string;
  
    /**
     * Url — `string`
     *
     *
     */
    url?: string;
  
    /**
     * Is Travel Featured? — `boolean`
     *
     *
     */
    is_travel_featured?: boolean;
  
    /**
     * Is External? — `boolean`
     *
     *
     */
    is_external?: boolean;
  
    /**
     * Slug — `slug`
     *
     *
     */
    slug?: { _type: "slug"; current: string };
  
    /**
     * Tags for item — `array`
     *
     *
     */
    tags?: Array<SanityKeyed<string>>;
  
    /**
     * Cover — `cloudinary.asset`
     *
     * Article cover image stored on Cloudinary
     */
    cover?: CloudinaryAsset;
  
    /**
     * Publish Date — `datetime`
     *
     *
     */
    publish_date?: string;
  }
  
  /**
   * Hero
   *
   *
   */
  export interface Hero extends SanityDocument {
    _type: "hero";
  
    /**
     * Call To Action Text — `string`
     *
     * Call To Action Text
     */
    cta_text?: string;
  
    /**
     * Title — `string`
     *
     * Hero section Title
     */
    title?: string;
  
    /**
     * Background Color — `string`
     *
     * Hero section background color
     */
    background_color?:
      | "light_grey"
      | "dark_blue"
      | "mint_green"
      | "coral"
      | "gold"
      | "white";
  
    /**
     * Cover — `cloudinary.asset`
     *
     * Hero cover image stored on Cloudinary
     */
    cover?: CloudinaryAsset;
  
    /**
     * Button Link — `string`
     *
     *
     */
    button_link?: string;
  }
  
  export type Documents = Product | Hero;
  
  /**
   * This interface is a stub. It was referenced in your sanity schema but
   * the definition was not actually found. Future versions of
   * sanity-codegen will let you type this explicity.
   */
  type CloudinaryAsset = any;
  