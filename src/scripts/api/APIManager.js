//app to handle working with api
const $ = require("jquery")

const api = Object.create(null, {
    getAllDatabase: {
        value: function () {
            return $.ajax("http://localhost:8088/db")
        }
    },
    getAllOfCollection: {
        value: function (collection) {
            return $.ajax(`http://localhost:8088/${collection}`)
        }
    },
    getBillsIntersectionsById: {
        value: function (id) {
            return $.ajax(`http://localhost:8088/billsInterest?billId=${id}`)
        }
    },
    getItemsByParameter: {
        value: function (collection, parameter, id) {
            return $.ajax(`http://localhost:8088/${collection}?${parameter}=${id}`)
        }
    }
})

module.exports = api