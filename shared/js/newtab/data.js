import * as z from "zod";
export const jsonSchema = z.object({
    totalCount: z.number(),
    totalPeriod: z.enum(["install-time"]),
    trackerCompaniesPeriod: z.enum(["last-hour"]),
    trackerCompanies: z.array(
        z.object({
            displayName: z.string(),
            count: z.number(),
            favicon: z.string().default(() => 'Shield.png')
        })
    )
});

export class TimedCache {
    static SEC = 1 * 1000;
    static MIN = TimedCache.SEC * 60;
    static HOUR = TimedCache.MIN * 60;
    entries = [];

    clear() {
        this.entries = [];
    }

    /**
     * @param {string} key
     * @param {number} [timestamp]
     */
    insert(key, timestamp = Date.now()) {
        this.entries.unshift([key, timestamp])
    }

    /**
     * @param {number} [maxAgeMs]
     * @param {number} [now]
     * @returns {{key: string, count: number}[]}
     */
    update(maxAgeMs = TimedCache.HOUR, now = Date.now()) {
        /** @type {Record<string, {key: string, count: number}>} */
        const output = {};
        /** @type {number | null} */
        let evictIndex = null;
        let count = 0;
        for (let [key, date] of this.entries) {
            const age = now - date;
            if (age > maxAgeMs) {
                evictIndex = count;
                break;
            } else {
                if (!output[key]) output[key] = { count: 0, key }
                output[key].count += 1;
                count += 1;
            }
        }
        if (evictIndex !== null) {
            this.entries.splice(evictIndex, this.entries.length - evictIndex);
        }
        return [...Object.values(output)]
    }
}


export const icons = [
    "adjust",
    "adobe",
    "amazon",
    "amplitude",
    "appnexus",
    "appsflyer",
    "beeswax",
    "branchmetrics",
    "braze",
    "bugsnag",
    "chartbeat",
    "comscore",
    "criteo",
    "facebook",
    "google",
    "googleadsgoogle",
    "googleanalyticsgoogle",
    "indexexchange",
    "instagramfacebook",
    "iponweb",
    "kochava",
    "linkedin",
    "liveramp",
    "magnite",
    "mediamath",
    "microsoft",
    "mixpanel",
    "neustar",
    "newrelic",
    "openx",
    "oracle",
    "outbrain",
    "pinterest",
    "pubmatic",
    "quantcast",
    "rythmone",
    "salesforce",
    "sharetrough",
    "smaato",
    "spotx",
    "taboola",
    "tapad",
    "thenielsencompany",
    "thetradedesk",
    "twitter",
    "urbanairship",
    "verizonmedia",
    "warnermedia",
    "xaxis",
    "yahoojapan",
    "yandex",
    "youtubegoogle",
    "zeotap",
]
