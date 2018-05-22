//module to show a simple card for each politician in the database

const $ = require("jquery")
const APIManager = require("../api/APIManager")

const showPoliticians = () => {
    output = $("#main-output")
    APIManager.getAllOfCollection("politicians")
        .then(politicians => {
            politicians.forEach(politician => {
                output.append(
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

                //get bills related to politician
                APIManager.getItemsByParameter("politiciansBills", "politiciansId", politician.id)
                    .then(intersections => {
                        intersections.forEach(intersection => {
                            APIManager.getItemsByParameter("bills", "id", intersection.billsId)
                                .then(bills => {
                                    bills.forEach(bill => {
                                        APIManager.getItemsByParameter("billsInterest", "billId", bill.id)
                                            .then(interestsIntersections => {
                                                interestsIntersections.forEach(interestsIntersection => {
                                                    APIManager.getItemsByParameter("commercialInterests", "id", interestsIntersection.CommercialInterestId)
                                                        .then(interests => {
                                                            interests.forEach(interest => {
                                                                console.log(`${politician.name} ${bill.name} ${interests.industry}`, interest)
                                                                //get politician id
                                                                let cardId = politician.id
                                                                //use politician id to get the card we need to edit
                                                                let currentCard = $(`#bills__output__${politician.id}`)

                                                                //check to see if current bill already has a header built there
                                                                if (!$(`#${politician.id}__${bill.id}`).length) {
                                                                    //if not build it and ul element
                                                                    currentCard.append(`<h4 id="${politician.id}__${bill.id}">${bill.name}</h4>`)
                                                                    currentCard.append(`<ul id="${politician.id}__${bill.id}__list"></ul>`)
                                                                }


                                                                //check to see if ul element has current industry interest
                                                                if (!$(`#${politician.id}__${bill.id}__${interest.id}`).length) {
                                                                    //if not append li element to ul
                                                                    $(`#${politician.id}__${bill.id}__list`).append(`<li id="${politician.id}__${bill.id}__${interest.id}">${interest.industry}</li>`)
                                                                }


                                                            })
                                                        })
                                                })
                                            })
                                    })
                                })
                        })
                    }) //end of first bill api call


                    //get politicians related PACs
                    APIManager.getItemsByParameter("politiciansPACs", "politiciainsId", politician.id)
                        .then(intersections => {
                            intersections.forEach(intersection => {
                                APIManager.getItemsByParameter("PACs", "id", intersection.PACsId)
                                    .then(PACs => {
                                        PACs.forEach(PAC => {

                                            if(!$(`#${politician.id}__PAC__${PAC.id}`).length) {
                                                $(`#PACs__for__${politician.id}`).append(`<li id="${politician.id}__PAC__${PAC.id}">${PAC.name}</li>`)
                                            }
                                        })
                                    })
                            })
                        })
            })
        })
}

module.exports = showPoliticians