import {Image, Label, Progress, Table} from "semantic-ui-react";
import {
    AverageCountSummary,
    BannerSummary,
    CommonSummaryProperties,
    getColorClassName,
    getFilterFunction,
    getPercent
} from "@/banners/summary";
import {VersionParts} from "@/banners/types";
import _ from "lodash";
import React from "react";

type Properties = {
    singular: string
    plural: string
    counter: (versionParts: VersionParts[], bannerSummaries: { [name: string]: BannerSummary }) => AverageCountSummary[]
} & CommonSummaryProperties
export default function AverageCounterSummary(
    {
        versionParts,
        banners,
        type,
        order,
        filterText,
        singular,
        plural,
        counter,
    }: Properties
) {
    const baseSummary = _.chain(counter(versionParts, banners))
        .filter((b) => b.average > 0)
        .orderBy([
            (b) => b.average,
            (b) => b.standardDeviation,
            (b) => b.count,
            (b) => b.name,
        ], order)
        .value()

    const filteredSummary = _.filter(baseSummary, getFilterFunction(filterText))
    const maxVal = baseSummary[order == 'desc' ? 0 : baseSummary.length - 1].average
    const summary = filteredSummary.length ? filteredSummary : baseSummary

    return (
        <Table.Body>
            {summary.map((s, k) =>
                <Table.Row key={k}>
                    <Table.Cell verticalAlign={'top'}>
                        <Image avatar
                               src={`/images/${type}/${s.image}.png`}
                               alt={s.image}/>
                        <p>{s.name}</p>
                    </Table.Cell>
                    <Table.Cell verticalAlign={'top'}>
                        <Progress
                            percent={getPercent(s.average, maxVal)}
                            className={getColorClassName(getPercent(s.average, maxVal))}
                            size={'small'}/>

                        <Label basic className={getColorClassName(getPercent(s.average, maxVal))}>
                            {s.count}
                            <Label.Detail>run{s.count === 1 ? '' : 's'}</Label.Detail>
                        </Label>

                        <Label basic className={getColorClassName(getPercent(s.average, maxVal))}>
                            {s.standardDeviation}
                            <Label.Detail>std dev</Label.Detail>
                        </Label>

                        <Label basic className={getColorClassName(getPercent(s.average, maxVal))}>
                            {s.average}
                            <Label.Detail>{s.average === 1 ? singular : plural}</Label.Detail>
                        </Label>
                    </Table.Cell>
                </Table.Row>
            )}
        </Table.Body>
    )
}