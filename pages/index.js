import { sanityClient } from "../sanity";
import Head from "next/head";
import Header from "../components/Header";

const Home = ({ properties }) => {
    console.log(properties);
    return (
        <>
            <div>
                <Head>
                    <title>JACSREL Properties</title>
                </Head>

                <Header />
            </div>
        </>
    );
};

export const getServerSideProps = async () => {
    const query = '*[ _type == "property"]';
    const properties = await sanityClient.fetch(query);

    if (!properties.length) {
        return {
            props: {
                properties: [],
            },
        };
    } else {
        return {
            props: {
                properties,
            },
        };
    }
};

export default Home;
