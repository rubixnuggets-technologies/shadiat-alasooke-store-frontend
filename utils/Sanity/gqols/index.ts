export const HOME_PAGE_QUERY = `
    *[_type == 'home-page']{ 
        name,
        hero[]-> ,
        shop_ctas[] -> ,
        testimonials[] -> 
    }
`;

export const ALL_TESTIMONIALS_QUERY = `
    *[_type == 'testimonial']{ 
         fullname,
         location,
         body,
         rating_count,
         title
    }
`;

export const ALL_PRODUCTS_QUERY = `
    *[_type == 'product']{ 
        _id,
        title[0],
        description, 
        variants,
    }
`;

export const ABOUT_PAGE_QUERY = (slug?: string) => {
  if (slug) {
    return `
        *[_type == 'about' && slug == "${slug}"]{ 
            _id,
            name, 
            title,
            body,
            slug
        }
    `;
  }

  return `
        *[_type == 'about']{ 
            _id,
            name, 
            title,
            body,
            slug
        }
    `;
};

export const EXPLORE_PAGE_QUERY = (slug?: string) => {
    if (slug) {
      return `
          *[_type == 'explore' && slug == "${slug}"]{ 
              _id,
              name, 
              title,
              description,
              slug,
              collection_key,
              by_color_filters,
              by_product_filters,
              by_new_arrivals_filters
          }
      `;
    }
  
    return `
          *[_type == 'explore']{ 
              _id,
              name, 
              title,
              description,
              slug,
              collection_key
          }
      `;
  };

export const FAQ_PAGE_QUERY = `
          *[_type == 'faq']{ 
              _id,
              name, 
              title,
              body
          }
      `;
