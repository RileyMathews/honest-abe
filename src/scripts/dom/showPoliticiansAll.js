// app to show all politicians on the dom
const $ = require("jquery")
const api = require("../api/APIManager")

const showPoliticians = () => {
    api.getAllDatabase().then(response => {
        const politicians = response.politicians
        const bills = response.bills
        const commercialInterests = response.commercialInterests
        const PACs = response.PACs
        const politiciansBills = response.politiciansBills
        const politiciansPACs = response.politiciansPACs
        const billsInterests = response.billsInterest


        //document fragment
        const fragment = document.createDocumentFragment()

        politicians.forEach(politician => {


            //find bills politician has sponsored
            //billsId becomes object representing the intersection of bills and politicians
            let billsId = politiciansBills.filter(intersection => intersection.politiciansId === politician.id)
            //billsId being remaped to now just hold numbers representing the ids of bills sponsored
            billsId = billsId.map(intersection => {
                return intersection.billsId
            })

            //iterate through bills array and check if the billsId array holds the id of current bill
            const currentBills = bills.filter(bill => billsId.includes(bill.id))

            //find pacs who have funded politician
            let PACsPoliticnanIntersections = politiciansPACs.filter(intersection => {
                return intersection.politiciainsId === politician.id
            })

            PACsPoliticnanIntersections = PACsPoliticnanIntersections.map(intersection => intersection.PACsId)

            //get related pacs
            const relatedPACs = PACs.filter(PAC => {
                return PACsPoliticnanIntersections.includes(PAC.id)
            })

            //append info to the dom
            $("#main-output").append(
                `
                <article class="politician" id="${politician.id}">
                    <header class="politician__name">
                        <h1>${politician.name}</h1>
                    </header>
                    <section class="politician__bills" id="politician__bills__${politician.id}">
                        <h3>Sponsored Bills</h3>
                        <div id="bills__output__${politician.id}"></div>
                    </section>
                    <section id="politician__influencers__${politician.id}">
                        <h3>Realted PACs</h3>
                        <ul id="PACs__for__${politician.id}"></ul>
                    </section>
                </article>
                `
            )

            //append bills
            currentBills.forEach(bill => {
                const billDiv = $("<div class=\"bill\">")
                billDiv.append(`<h4>${bill.name}</h4>`)
                interestList = $("<ul>")

                //find commercial interests the bill impacts
                interestIntersections = billsInterests.filter(intersection => intersection.billId === bill.id)
                console.log(interestIntersections)
                interestIntersections.forEach(intersection => {
                    //get the interest associated with the intersection
                    commercialInterest = commercialInterests.find(interest => interest.id === intersection.CommercialInterestId)
                    console.log(commercialInterest)
                    interestList.append(`<li>${commercialInterest.industry}</li>`)
                })
                billDiv.append(interestList)
                $(`#bills__output__${politician.id}`).append(billDiv)
            })

            //append related pacs
            relatedPACs.forEach(PAC => {
                $(`#PACs__for__${politician.id}`).append(`<li>${PAC.name}</li>`)
            })

        })
    })
}



module.exports = showPoliticians

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