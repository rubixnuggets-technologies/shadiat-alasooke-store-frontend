export const HERO_SECTION_QUERY = `
    *[_type == 'hero']{ 
        _id,
        title,
        cta_text,
        cover,
        background_color
    }
`
