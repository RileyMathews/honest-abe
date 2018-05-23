//app to show politicians cards based on steves example

const $ = require("jquery")
const APIManager = require("../api/APIManager")

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
            politicians.forEach(politician => {
                allPoliticians.push(politicianFactory(politician.id, politician.name))
            })
            debugger
        })
}

module.exports = showPoliticiansSteve