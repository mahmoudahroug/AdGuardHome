import React from 'react';

import { Link } from 'react-router-dom';
import { withTranslation, Trans } from 'react-i18next';

import { StatsCard, STATS_CARD_VARIANTS } from './StatsCard';

import { getPercent } from '../../helpers/helpers';
import { RESPONSE_FILTER } from '../../helpers/constants';

interface StatisticsProps {
    dnsQueries: number[];
    blockedFiltering: number[];
    cachedQueries: number[];
    replacedSafebrowsing: number[];
    replacedParental: number[];
    numDnsQueries: number;
    numBlockedFiltering: number;
    numCachedQueries: number;
    numReplacedSafebrowsing: number;
    numReplacedParental: number;
}

const Statistics = ({
    dnsQueries,
    blockedFiltering,
    cachedQueries,
    replacedSafebrowsing,
    replacedParental,
    numDnsQueries,
    numBlockedFiltering,
    numCachedQueries,
    numReplacedSafebrowsing,
    numReplacedParental,
}: StatisticsProps) => (
    <div className="row">
        <div className="col-sm-6 col-lg">
            <StatsCard
                total={numDnsQueries}
                lineData={dnsQueries}
                title={
                    <Link to="logs">
                        <Trans>dns_query</Trans>
                    </Link>
                }
                variant={STATS_CARD_VARIANTS.QUERIES}
            />
        </div>

        <div className="col-sm-6 col-lg">
            <StatsCard
                total={numCachedQueries}
                lineData={cachedQueries}
                percent={getPercent(numDnsQueries, numCachedQueries)}
                title={<Trans>cache_hit_rate</Trans>}
                variant={STATS_CARD_VARIANTS.CACHE}
            />
        </div>

        <div className="col-sm-6 col-lg">
            <StatsCard
                total={numBlockedFiltering}
                lineData={blockedFiltering}
                percent={getPercent(numDnsQueries, numBlockedFiltering)}
                title={
                    <Trans
                        components={[
                            <Link to={`logs?response_status=${RESPONSE_FILTER.BLOCKED.QUERY}`} key="0">
                                link
                            </Link>,
                        ]}>
                        blocked_by
                    </Trans>
                }
                variant={STATS_CARD_VARIANTS.ADS}
            />
        </div>

        <div className="col-sm-6 col-lg">
            <StatsCard
                total={numReplacedSafebrowsing}
                lineData={replacedSafebrowsing}
                percent={getPercent(numDnsQueries, numReplacedSafebrowsing)}
                title={
                    <Link to={`logs?response_status=${RESPONSE_FILTER.BLOCKED_THREATS.QUERY}`}>
                        <Trans>stats_malware_phishing</Trans>
                    </Link>
                }
                variant={STATS_CARD_VARIANTS.THREATS}
            />
        </div>

        <div className="col-sm-6 col-lg">
            <StatsCard
                total={numReplacedParental}
                lineData={replacedParental}
                percent={getPercent(numDnsQueries, numReplacedParental)}
                title={
                    <Link to={`logs?response_status=${RESPONSE_FILTER.BLOCKED_ADULT_WEBSITES.QUERY}`}>
                        <Trans>stats_adult</Trans>
                    </Link>
                }
                variant={STATS_CARD_VARIANTS.ADULT}
            />
        </div>
    </div>
);

export default withTranslation()(Statistics);
