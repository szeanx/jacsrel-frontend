import { sanityClient } from "../../sanity";

const Property = ({
  title,
  location,
  propertyType,
  mainImage,
  images,
  pricePerMonth,
  bedrooms,
  bathrooms,
  description,
}) => {
  return (
    <div>
      <p>{title}</p>
      <p>{description}</p>
    </div>
  );
};

export const getServerSideProps = async (pageContext) => {
  const pageSlug = pageContext.query.slug;
  const query = `*[ _type == "property" && slug.current == $pageSlug][0]{
    title,
    location,
    propertyType,
    mainImage,
    images,
    pricePerMonth,
    bedrooms,
    bathrooms,
    description
  }`;

  const property = await sanityClient.fetch(query, { pageSlug });

  if (!property) {
    return {
      props: null,
      notFound: true,
    };
  } else {
    return {
      props: {
        title: property.title,
        location: property.location,
        propertyType: property.propertyType,
        mainImage: property.mainImage,
        images: property.images,
        pricePerMonth: property.pricePerMonth,
        bedrooms: property.bedrooms,
        bathrooms: property.bathrooms,
        description: property.description,
      },
    };
  }
};

export default Property;
