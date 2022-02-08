import { sanityClient } from "../../sanity";
import { isMultiple } from "../../utils";
import Link from "next/link";
import Image from "../../components/Image";

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
        <div className="container flex-col mt-5 mx-5">
            <h1 className="text-4xl mb-5">
                <b>{title}</b>
            </h1>
            <h2 className="uppercase text-xl">
                <b>{propertyType}</b>
            </h2>

            <h4 className="mb-3 capitalize">
                {bedrooms} bedroom{isMultiple(bedrooms)} {bathrooms} bathroom
                {isMultiple(bathrooms)}
            </h4>
            <div className="md:flex overflow-hidden rounded-xl md:max-h-72 w-10/12 mb-5">
                <Image
                    identifier="main-image"
                    image={mainImage}
                    className="md:w-full md:h-full mb-5 rounded-lg md:rounded-none"
                    alt="main Image"
                />
                <div className="w-full overflow-hidden md:w-3/6 hidden md:block">
                    {images.map(({ _key, asset }, image) => (
                        <Image
                            key={_key}
                            identifier="image"
                            image={asset}
                            className="mb-5 md:mb-0 w-screen md:w-full md:h-full rounded-lg md:rounded-none"
                            alt="sub image"
                        />
                    ))}
                </div>
            </div>

            <div>
                <div>
                    <hr />
                    <h4 className="text-lg mt-3">
                        <b>Terms and Conditions</b>
                    </h4>
                    <div className="mb-3 text-lg">
                        <p>
                            1 month advanced deposit + 2 months security deposit
                        </p>
                        <p>1 year contract</p>
                    </div>
                    <div className="price-box">
                        <h2>PHP{pricePerMonth}/month</h2>
                        <Link href="/contact" passHref>
                            <div className="button">Contact us</div>
                        </Link>
                    </div>
                </div>
                <hr />
                <h4>{description}</h4>
            </div>
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
