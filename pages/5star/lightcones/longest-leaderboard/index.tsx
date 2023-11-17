import { LoadHSRBanners } from "@/banners/history";
import { Featured } from "@/banners/types";
import LongestLeaderboardPage from "@/components/summary/LongestLeaderboardPage";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import Head from "next/head";

export async function getStaticProps() {
  dayjs.extend(utc);
  return {
    props: {
      featuredList: LoadHSRBanners().fiveStarWeapons,
      date: dayjs.utc().toISOString().substring(0, 10),
    },
  };
}

export default function FiveStarWeaponSummary(props: {
  featuredList: Featured[];
  date: string;
}) {
  return (
    <>
      <Head>
        <title>5&#x2605; Lightcone Longest Rerun Leaderboard - Samsara</title>
      </Head>
      <LongestLeaderboardPage
        title={<>5&#x2605; Lightcone Longest Rerun Leaderboard</>}
        data={props}
        type={"lightcones"}
      />
    </>
  );
}
