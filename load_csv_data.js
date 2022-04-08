// const Papa = require("papaparse")

function readTextFile(file) {
    let allText;
    let rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                allText = rawFile.responseText;
            }
        }
    }
    rawFile.send(null);
    return allText
}

let ap_header_data = "BSSID,First time seen,Last time seen,channel,Speed,Privacy,Cipher,Authentication,Power,\# beacons,\# IV,LAN IP,ID-length,ESSID,Key,time,lat,lng\n";
let client_header_data = "Station MAC,First time seen,Last time seen,Power,\# packets,BSSID,Probed ESSIDs,time,lat,lng\n";

let ap_file_csv = ap_header_data + readTextFile("http://localhost:8080/airodump_logs/ap_file.csv")
let client_file_csv = client_header_data + readTextFile("http://localhost:8080/airodump_logs/client_file.csv")

let ap_file_json = Papa.parse(ap_file_csv, {header:"true"}).data
let client_file_json = Papa.parse(client_file_csv, {header:"true"}).data

// console.log(ap_file_json)
// console.log(client_file_json)
