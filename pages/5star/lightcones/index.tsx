import Head from "next/head";
import { BannerHistoryDataset, FeaturedHistory } from "@/banners/types";
import React from "react";
import HistoryPage from "@/components/history/HistoryPage";
import _ from "lodash";
import YAML from "yaml";
import fs from "fs";
import path from "path";
import { LoadHSRHistory } from "@/banners/history";
import { TypeContext } from "@/components/context";

export async function getStaticProps() {
  return {
    props: {
      dataset: LoadHSRHistory(),
    },
  };
}

type Properties = {
  dataset: BannerHistoryDataset;
};

export default function FiveStarWeaponsHome({ dataset }: Properties) {
  return (
    <>
      <Head>
        <title>5&#x2605; Lightcone Banner History - Samsara</title>
        {/*<meta name="description" content="Generated by create next app" />*/}
        {/*<meta name="viewport" content="width=device-width, initial-scale=1" />*/}
        {/*<link rel="icon" href="/favicon.ico" />*/}
      </Head>
      <TypeContext.Provider
        value={{
          charactersText: "Characters",
          characterType: "hsr-characters",
          weaponsText: "Lightcones",
          weaponType: "lightcones",
        }}
      >
        <HistoryPage
          bannerType={"lightcones"}
          title={<>5&#x2605; Lightcone Banner History</>}
          dataset={dataset}
          featuredList={dataset.fiveStarWeapons}
        />
      </TypeContext.Provider>
    </>
  );
}
