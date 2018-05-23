/*
    module: build politician card
    authors: Riley Mathews
    purpose: to build an html representation based on a politician object passed to it
*/

const $ = require("jquery")


const buildPoliticianCard = (politician) => {
    console.log(politician)
    const output = $("#main-output")
    output.append(
        `
        <article class="politician">
            <header class="politician__name">
                <h1>${politician.name}</h1>
            </header>
            <section class="politician__bills">
                <h3>Sponsored Bills</h3>
                <div>
                    ${politician.bills.map(b => {
                        return `
                        <h5>${b.bills.name}</h5>
                        <ul>
                            ${b.interests.map(i => `<li>${i.commercialInterests.industry}</li>`).join("")}
                        </ul>
                        `
                    }).join("")}
                </div>
            </section>
            <section class="politician__influencers">
                <h3>Related PACs</h3>
                <ul>
                    <li>American Gas Association</li>
                    <li>League of Conservation Voters Action Fund</li>
                </ul>
            </section>
        </article>
        `
    )
}

module.exports = buildPoliticianCard

// ${b.interests.map(i => `<li>${i.commercialInterests.industry}</li>`).join("")}

// ${p.bills.map(b => `<li>${b.name}</li>`).join("")}

/*
    example output
    <article class="politician">
    <header class="politician__name">
        <h1>Abby Fleming</h1>
    </header>
    <section class="politician__bills">
        <h3>Sponsored Bills</h3>
        <div>
            <h4>S. 2325: Northern Mariana Islands U.S. Workforce Act</h4>
            <ul>
                <li>Employment</li>
                <li>Energy</li>
                <li>Natural Resources</li>
            </ul>
        </div>
    </section>
    <section class="politician__influencers">
        <h3>Related PACs</h3>
        <ul>
            <li>American Gas Association</li>
            <li>League of Conservation Voters Action Fund</li>
        </ul>
    </section>
</article>
*/