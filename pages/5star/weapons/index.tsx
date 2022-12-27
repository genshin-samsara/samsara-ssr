import Head from 'next/head'
import {Banners} from '@/banners/types'
import React from "react";
import BannerPageComponent from "@/components/BannerPage";


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

export default function Home({banners}: Properties) {
    return (
        <>
            <Head>
                {/*<title>Create Next App</title>*/}
                {/*<meta name="description" content="Generated by create next app" />*/}
                {/*<meta name="viewport" content="width=device-width, initial-scale=1" />*/}
                {/*<link rel="icon" href="/favicon.ico" />*/}
            </Head>
            <BannerPageComponent bannerType={'weapons'}
                                 banners={banners.weapons['5']}
                                 showLimitedOnly={false}
            />        </>
    )
}
