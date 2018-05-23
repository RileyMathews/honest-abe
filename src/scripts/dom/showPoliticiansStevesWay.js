//app to show politicians cards based on steves example

const $ = require("jquery")
const APIManager = require("../api/APIManager")
const buildPoliticianCard = require("./buildPoliticianCard")

const uniqueArray = (array) => {
    const newArray = []
    array.forEach(item => {
        if (!newArray.includes(item)) {
            newArray.push(item)
        }
    })
    return newArray
}

const showPoliticiansSteve = () => {
    const allPoliticians = []

    const politicianFactory = (id, name) => {
        return {
            "id": id,
            "name": name,
            "bills": [],
            "pacs": []
        }
    }

    APIManager.getAllOfCollection("politicians")
        .then(politicians => {
            const promises = []

            politicians.forEach(politician => {
                //create a politician object based on current politician and push it to master politician array
                allPoliticians.push(politicianFactory(politician.id, politician.name))
                //create an ajax request for bills related to each politician and push it to promises array
                promises.push($.ajax(`http://localhost:8088/politiciansBills?politiciansId=${politician.id}&_expand=bills`))

            })

            return Promise.all(promises)
        })

        .then(Bills => {

            //create array to hold unique bills
            const billsIds = []
            //create promises array
            const promises = []

            //for each bill
            Bills.forEach(billGroup => {

                //find the politician in master array that matches the id of the bills
                matchingPolitician = allPoliticians.find(politician => politician.id === billGroup[0].politiciansId)
                //set the bills item in that object equal to the array we are currently iterating through
                matchingPolitician.bills = matchingPolitician.bills.concat(billGroup)
                billGroup.forEach(bill => {
                    billsIds.push(bill.billsId)
                })
            })

            const uniqueBills = uniqueArray(billsIds)
            uniqueBills.forEach(bill => {
                promises.push($.ajax(`http://localhost:8088/billsInterests?billId=${bill}&_expand=commercialInterests`))
            })


            return Promise.all(promises)
        })

        //handle return of last promise all
        .then(interests => {
            const promises = []
            //loop through politicians
            allPoliticians.forEach(politician => {

                //prepare for next ajax call for pacs that have donated to the politician
                promises.push($.ajax(`http://localhost:8088/politiciansPACs?politiciainsId=${politician.id}&_expand=PACs`))

                //loop through bills item in politician
                politician.bills.forEach(bill => {
                    //if bill id equals iterests billid then add a new property on that bill and assign the array to it
                    bill.interests = interests.find(i => {
                        return i[0].billId === bill.bills.id
                    })
                })
            })



            return Promise.all(promises)
        })


        //handles return of pacs request
        .then(pacs => {
            //loop through pacs
            pacs.forEach(pac => {
                //find the matching candidate
                currentPolitician = allPoliticians.find(p => p.id === pac[0].politiciainsId)
                //set the pac array equal to current pac array
                currentPolitician.pacs = currentPolitician.pacs.concat(pac)
            })

            //output to dom
            allPoliticians.forEach(p => {
                buildPoliticianCard(p)
            })
        })


}

module.exports = showPoliticiansSteve