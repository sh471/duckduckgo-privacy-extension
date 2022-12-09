const f = require("/Users/shaneosbourne/WebstormProjects/duckduckgo-privacy-extension/.idea/httpRequests/2022-12-09T170746.200.json");
const fs = require('fs')

const blockers = [...Object.values(f.trackers)]
    .filter(x => x.default === "block");

const links = blockers.map(x => `https://${x.domain}/tracker.png`);
fs.writeFileSync("links.json", JSON.stringify(links, null, 2));


