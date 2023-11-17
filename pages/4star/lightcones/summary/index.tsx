import { LoadHSRBanners } from "@/banners/history";
import { Featured } from "@/banners/types";
import LastRunSummaryPage from "@/components/summary/LastRunSummaryPage";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import Head from "next/head";

export async function getStaticProps() {
  dayjs.extend(utc);
  return {
    props: {
      featuredList: LoadHSRBanners().fourStarWeapons,
      date: dayjs.utc().toISOString().substring(0, 10),
    },
  };
}

export default function FourStarWeaponSummary(props: {
  featuredList: Featured[];
  date: string;
}) {
  return (
    <>
      <Head>
        <title>4&#x2605; Lightcone Summary - Samsara</title>
      </Head>
      <LastRunSummaryPage
        title={<>4&#x2605; Lightcone Summary</>}
        data={props}
        type={"lightcones"}
      />
    </>
  );
}
