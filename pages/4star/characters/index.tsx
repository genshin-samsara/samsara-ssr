import Head from 'next/head'
import {Banners} from '@/banners/types'
import React from "react";
import BannerPage from "@/components/banners/BannerPage";


export async function getStaticProps() {
    return {
        props: {
            banners: require('@/data/banners.json')
        },
    };
}

type Properties = {
    banners: Banners
}

export default function FourStarCharactersHome({banners}: Properties) {

    return (
        <>
            <Head>
                <title>4&#x2605; Character Banner History - Samsara</title>
                {/*<meta name="description" content="Generated by create next app" />*/}
                {/*<meta name="viewport" content="width=device-width, initial-scale=1" />*/}
                {/*<link rel="icon" href="/favicon.ico" />*/}
            </Head>
            <BannerPage bannerType={'characters'}
                                 banners={banners.characters['4']}
                                 showLimitedOnly={false}
            />
        </>
    )
}
