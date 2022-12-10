import { TimedCache, icons } from '../newtab/data'
import { normalizeCompanyName } from './events.es6'
import * as browserWrapper from './wrapper.es6'

export class CompaniesSimple {
    totalAttempts = 0
    companies = new TimedCache()
    totalPeriod = 'install-time'
    trackerCompaniesPeriod = 'last-hour'

    reset() {
        this.companies.clear();
        this.totalAttempts = 0;
        this.sync()
        return this;
    }

    // TODO(Shane): This is using 'trackerOwner.displayName' as the storage key, should it?
    increment (trackerOwner) {
        this.companies.insert(trackerOwner.displayName);
        this.totalAttempts += 1
        this.sync()
    }

    toDisplayData () {
        // only data for last 2 min
        const output = this.companies.update(TimedCache.HOUR);
        return {
            totalCount: this.totalAttempts,
            totalPeriod: this.totalPeriod,
            trackerCompaniesPeriod: this.trackerCompaniesPeriod,
            trackerCompanies: output.map(item => {
                const name = normalizeCompanyName(item.key)
                let favicon
                if (icons.includes(name)) {
                    favicon = '../img/logos/' + name + '.svg'
                } else {
                    favicon = '../img/letters/' + name[0] + '.svg'
                }
                return {
                    displayName: item.key,
                    count: item.count,
                    favicon,
                }
            })
        }
    }

    // fromJSON (json) {
    //     return {
    //         totalCount: json.totalAttempts,
    //         totalPeriod: json.totalPeriod,
    //         trackerCompaniesPeriod: json.trackerCompaniesPeriod,
    //         trackerCompanies: new Map(Object.entries(json.trackerCompanies))
    //     }
    // }

    sync () {
        browserWrapper.syncToStorage({ companiesSimples: this })
    }
    restore() {
        // browserWrapper.getFromStorage('companiesSimples').then((storageData) => {
        //     const asValues = this.fromJSON(storageData);
        //     this.totalCount = asValues.totalAttempts;
        //     this.totalPeriod = asValues.totalPeriod;
        //     this.trackerCompaniesPeriod = asValues.trackerCompaniesPeriod;
        //     this.trackerCompanies = asValues.trackerCompanies;
        // })
        return this;
    }
}

const companiesSimples = new CompaniesSimple().restore();

export { companiesSimples }
