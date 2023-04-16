import React from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import Head from "next/head";
import {Featured} from "@/banners/types";
import YAML from "yaml";
import fs from "fs";
import path from "path";
import LongestLeaderboardPage from "@/components/summary/LongestLeaderboardPage";

export async function getStaticProps() {
    dayjs.extend(utc);
    return {
        props: {
            featuredList: YAML.parse(fs.readFileSync(path.resolve('./public/data/banners.yaml'), 'utf8')).fiveStarWeapons,
            date: dayjs.utc().toISOString().substring(0, 10)
        },
    };
}


export default function FiveStarWeaponSummary(props: { featuredList: Featured[], date: string }) {
    return (
        <>
            <Head>
                <title>5&#x2605; Weapon Longest Rerun Leaderboard - Samsara</title>
            </Head>
            <LongestLeaderboardPage
                title={<>5&#x2605; Weapon Longest Rerun Leaderboard</>}
                data={props}
                type={'weapons'}
            />
        </>
    )
}