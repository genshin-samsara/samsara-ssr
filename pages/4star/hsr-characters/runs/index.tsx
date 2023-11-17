import { LoadHSRBanners } from "@/banners/history";
import { Featured } from "@/banners/types";
import RunsSummaryPage from "@/components/summary/RunsSummaryPage";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import Head from "next/head";

export async function getStaticProps() {
  dayjs.extend(utc);

  return {
    props: {
      featuredList: LoadHSRBanners().fourStarCharacters,
    },
  };
}

export default function FourStarCharacterSummary(props: {
  featuredList: Featured[];
}) {
  return (
    <>
      <Head>
        <title>4&#x2605; HSR Character Reruns Summary - Samsara</title>
      </Head>
      <RunsSummaryPage
        title={<>4&#x2605; HSR Character Reruns Summary</>}
        data={props}
        type={"hsr-characters"}
      />
    </>
  );
}
