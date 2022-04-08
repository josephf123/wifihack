let map;
function initialize() {
    initMap()
    load_json_data(ap_file_json, "red", 0.00002)
    load_json_data(client_file_json, "blue", 0)
    forTable(ap_file_json.concat(client_file_json), "bigTable")
}

function forTable(arr, id) {
    let htmlTable = buildHtmlTable(arr, "bigTable")
    document.getElementById("forTable").innerHTML = htmlTable
    document.getElementById("bigTable").style = "border: 1px solid black"
}

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -33.769540072, lng: 151.192954936 },
    zoom: 20,
  });
}

function add_marker_and_info_window(pos, contentString, col, offset){
    const infowindow = new google.maps.InfoWindow({
        content: contentString,
    });
    const marker = new google.maps.Marker({
        position: {lat: Number(pos.lat), lng: Number(pos.lng)  + offset},
        map,
        icon: {                             
            url: "http://maps.google.com/mapfiles/ms/icons/"+ col + "-dot.png"
        }
    });
    
    marker.addListener("click", () => {
        infowindow.open({
            anchor: marker,
            map,
            shouldFocus: false,
        });
    });

}

function load_json_data(json_file, col, offset) {
    let currTime = json_file[0].time;
    let dataArray = [];
    for (let i=0; i < json_file.length; i++) {
        if (json_file[i].time == currTime) {
            dataArray.push(json_file[i])
        } else {
            let html_string = buildHtmlTable(dataArray, "")
            add_marker_and_info_window({lat: json_file[i-1].lat, lng: json_file[i-1].lng}
            , html_string, col, offset)
            currTime = json_file[i].time
            // clear data table
            dataArray = []
        }
    }
    let html_string = buildHtmlTable(dataArray, "")
    // Add the last marker
    add_marker_and_info_window({lat: json_file[json_file.length-1].lat, lng: json_file[json_file.length-1].lng}
    , html_string, col, offset)
}

function buildHtmlTable(array, id) {
    let str = "<table id=" + id + "><tr>"
    if (array.length == 0) return
    console.log(array[0])
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


// https://developers.google.com/maps/documentation/javascript/marker-clustering