//app to handle working with api
const $ = require("jquery")

const api = Object.create(null, {
    getAllDatabase: {
        value: function () {
            return $.ajax("http://localhost:8088/db")
        }
    },
})

module.exports = api