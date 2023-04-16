import React from "react";
import {BannerFilterSortOptions, FeaturedHistory} from "@/banners/types";
import {Table} from "semantic-ui-react";
import _ from "lodash";
import HistoryHeader from "@/components/history/HistoryHeader";
import HistoryFooter from "@/components/history/HistoryFooter";
import HistoryRow from "@/components/history/HistoryRow";
import {getFilterFunction} from "@/banners/summary";
import getVersionParts from "@/banners/version";
import {getRundowns} from "@/banners/rundown";


type BannerRundownProps = {
    bannerType: string
    featuredList: FeaturedHistory[]
    // rundown: DetailedFeaturedHistory[]
} & BannerFilterSortOptions

type BannerRundownState = {
    filterText: string
}

export default class BannerTable extends React.Component<BannerRundownProps, BannerRundownState> {
    constructor(props: BannerRundownProps) {
        super(props);
        this.state = {
            filterText: '',
        }
    }

    handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({filterText: event.target.value});
    }

    sortByName = (r: FeaturedHistory) => r.name

    sortByRunsLastPatch = [
        (r: FeaturedHistory) => String(r.versions.length),
        (r: FeaturedHistory) => r.versions[r.versions.length - 1],
        this.sortByName,
    ]

    sortByFirst = [
        (r: FeaturedHistory) => r.versions[0],
        this.sortByName,
    ]

    sortByLast = [
        (r: FeaturedHistory) => r.versions[r.versions.length - 1],
        this.sortByName,
    ]

    getSortFunction = () => {
        switch (this.props.sortBy) {
            default:
            case 'last':
                return this.sortByLast
            case 'first':
                return this.sortByFirst
            case 'runs-last':
                return this.sortByRunsLastPatch
        }
    }

    getOrderByOrders = () => {
        switch (this.props.sortBy) {
            default:
                return [
                    ...Array(this.getSortFunction().length - 1).fill(this.props.order === 'asc' ? 'asc' : 'desc'),
                    this.props.order === 'asc' ? 'desc' : 'asc',
                ]
            case 'runs-last':
                return this.props.order === 'asc' ? ['asc', 'desc', 'desc'] : ['desc', 'desc', 'asc']
        }
    }

    render() {
        let {bannerType, featuredList} = this.props
        const versionParts = getVersionParts(
            _.chain(featuredList)
                .map((featured) => featured.versions)
                .flatten()
                .value()
        )

        const baseFeaturedList = _.chain(getRundowns(featuredList))
            .orderBy(this.getSortFunction(), this.getOrderByOrders())
            .value()

        const filteredFeaturedList = _.chain(baseFeaturedList)
            .filter(getFilterFunction(this.state.filterText))
            .value()

        const rundown = filteredFeaturedList.length ? filteredFeaturedList : baseFeaturedList
        return (
            <>
                <Table definition unstackable selectable compact className={'history'}>
                    <HistoryHeader
                        versionParts={versionParts}
                        onChange={this.handleFilterChange}
                    />
                    <Table.Body>
                        {rundown.map((r, rI) => <HistoryRow key={rI}
                                                            bannerType={bannerType}
                                                            rundown={r}
                            />
                        )}
                    </Table.Body>

                    <HistoryFooter versionParts={versionParts}/>
                </Table>
            </>
        );
    }
}
