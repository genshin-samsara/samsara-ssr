import { LoadGenshinBanners } from "@/banners/history";
import { Featured } from "@/banners/types";
import AverageRunSummaryPage from "@/components/summary/AverageRunSummaryPage";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import Head from "next/head";

export async function getStaticProps() {
  dayjs.extend(utc);
  return {
    props: {
      featuredList: LoadGenshinBanners().fourStarWeapons,
    },
  };
}

export default function FourStarWeaponSummary(props: {
  featuredList: Featured[];
}) {
  return (
    <>
      <Head>
        <title>4&#x2605; Weapon Average Reruns - Samsara</title>
      </Head>
      <AverageRunSummaryPage
        title={<>4&#x2605; Weapon Average Reruns</>}
        data={props}
        type={"weapons"}
      />
    </>
  );
}
