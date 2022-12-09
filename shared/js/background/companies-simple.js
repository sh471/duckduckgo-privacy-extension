import { icons } from '../newtab/data'
import { normalizeCompanyName } from './events.es6'
import * as browserWrapper from './wrapper.es6'

export class CompaniesSimple {
    totalAttempts = 0
    companies = new Map()

    totalPeriod = 'install-time'
    trackerCompaniesPeriod = 'last-hour'

    // TODO(Shane): This is using 'trackerOwner.displayName' as the storage key, should it?
    increment (trackerOwner) {
        let match = this.companies.get(trackerOwner.displayName)
        if (!match) {
            const name = normalizeCompanyName(trackerOwner.displayName)
            let favicon
            if (icons.includes(name)) {
                favicon = '../img/logos/' + name + '.svg'
            } else {
                favicon = '../img/letters/' + name[0] + '.svg'
            }
            this.companies.set(trackerOwner.displayName, {
                name: trackerOwner.name,
                displayName: trackerOwner.displayName,
                count: 0,
                favicon,
            })
            match = this.companies.get(trackerOwner.displayName)
        }
        match.count += 1
        this.totalAttempts += 1
        this.sync()
    }

    toJSON () {
        return {
            totalCount: this.totalAttempts,
            totalPeriod: this.totalPeriod,
            trackerCompaniesPeriod: this.trackerCompaniesPeriod,
            trackerCompanies: [...this.companies].map(([, entry]) => {
                return entry
            })
        }
    }

    fromJSON (json) {
        return {
            totalCount: json.totalAttempts,
            totalPeriod: json.totalPeriod,
            trackerCompaniesPeriod: json.trackerCompaniesPeriod,
            trackerCompanies: new Map(Object.entries(json.trackerCompanies))
        }
    }

    sync () {
        browserWrapper.syncToStorage({ companiesSimples: this.toJSON() })
    }
    restore() {
        browserWrapper.getFromStorage('companiesSimples').then((storageData) => {
            const asValues = this.fromJSON(storageData);
            this.totalCount = asValues.totalAttempts;
            this.totalPeriod = asValues.totalPeriod;
            this.trackerCompaniesPeriod = asValues.trackerCompaniesPeriod;
            this.trackerCompanies = asValues.trackerCompanies;
        })
        return this;
    }
}

const companiesSimples = new CompaniesSimple().restore();

export { companiesSimples }
