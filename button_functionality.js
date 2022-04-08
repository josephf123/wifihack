

window.addEventListener('DOMContentLoaded', () => {
    let map_button = document.getElementById("hide_map")
    let table_button = document.getElementById("hide_table")

    let map = document.getElementById("map")
    let table = document.getElementById("wifiTable")
    // Toggle display for map
    map_button.addEventListener("click", () => {
        if (map.style.display != "none") {
            map.style.display = "none"
        } else {
            map.style.display = ""
        }
    })
    // Toggle display for table
    table_button.addEventListener("click", () => {
        if (table.style.display != "none") {
            table.style.display = "none"
        } else {
            table.style.display = ""
        }
    })

    let data = ap_file_json.concat(client_file_json)
    let filter = document.getElementById("filterInput")
    // filter based on input
    filter.addEventListener("keyup", () => {
        let filtered_data = return_filtered_table(data, filter.value)
        console.log(filtered_data)
        forTable(filtered_data)
    } )
});

function return_filtered_table(data, filter) {
    console.log(Object.values(data[4]))
    let new_data = data.filter((datum) => {
        let datumVals = Object.values(datum)
        for (let i=0; i < datumVals.length; i++) {
            if (datumVals[i] && datumVals[i].toString().toLowerCase().includes(filter.toLowerCase())){
                console.log("dis true tho")
                return true
            }
        }
        console.log("dis false tho")
        return false
    })
    return new_data
}

function forTable(arr) {
    let htmlTable = buildHtmlTable(arr, "bigTable")
    document.getElementById("forTable").innerHTML = htmlTable
    document.getElementById("bigTable").style = "border: 1px solid black"
}

function buildHtmlTable(array, id) {
    let str = "<table id=" + id + "><tr>"
    if (array.length == 0) return
    let header_array = Object.keys(array[0])
    for (let i=0; i < header_array.length; i++) {
        str += "<th>" + header_array[i] + "</th>"
    }
    str += "</tr>"
    for (let i=0; i < array.length; i++) {
        str += "<tr>"
        let body_array = Object.values(array[i])
        for (let j=0; j < body_array.length; j++) {
            str +=  "<td>" + body_array[j] + "</td>"
        }
        str += "</tr>"
    }
    str += "</table>"
    return str
}