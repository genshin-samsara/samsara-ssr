import { LoadGenshinBanners } from "@/banners/history";
import { Featured } from "@/banners/types";
import LongestLeaderboardPage from "@/components/summary/LongestLeaderboardPage";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import Head from "next/head";

export async function getStaticProps() {
  dayjs.extend(utc);
  return {
    props: {
      featuredList: LoadGenshinBanners().fiveStarCharacters,
      date: dayjs.utc().toISOString().substring(0, 10),
    },
  };
}

export default function FiveStarCharacterSummary(props: {
  featuredList: Featured[];
  date: string;
}) {
  return (
    <>
      <Head>
        <title>5&#x2605; Character Longest Rerun Leaderboard - Samsara</title>
      </Head>
      <LongestLeaderboardPage
        title={<>5&#x2605; Character Longest Rerun Leaderboard</>}
        data={props}
        type={"characters"}
      />
    </>
  );
}
