import subprocess
import time
import json
# puts wifi into monitor mode to allow for airodump-ng to run
subprocess.run(["(cd /usr/local/src/re4son-kernel_4.14.93-20190126/tools && sudo ./mon0up)"], shell=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
# randomise my mac address to hide myself
subprocess.run(["sudo macchanger -A mon0"], shell=True)
# connects the GPS output to gpsd
subprocess.run(["sudo gpsd /dev/serial0 -F /var/run/gpsd.sock"], shell=True, stdout=subprocess.DEVNULL)


# finds time, latitude and longitude from gpsd output
gps_string_proc = subprocess.run(["gpspipe -w -n 10 | grep -m 1 lon"], shell=True, capture_output=True)

while (gps_string_proc.stdout == b''):
    gps_string_proc = subprocess.run(["gpspipe -w -n 10 | grep -m 1 lon"], shell=True, capture_output=True)
    print(gps_string_proc.stdout)
print("the output is ", gps_string_proc.stdout)
json_gps_data = json.loads(gps_string_proc.stdout)
important_gps_data =", " + str(json_gps_data["time"])+ ", " + str(json_gps_data["lat"]) + ", " + str(json_gps_data["lon"])

deleteAllLogs = subprocess.run(["sudo rm tmp_airodump_log*"], shell=True, stderr=subprocess.DEVNULL)

# runs airodump-ng
interface='mon0'
scanProc = subprocess.Popen(['sudo', 'airodump-ng', interface, '--output-format', 'csv', '--write', "tmp_airodump_log"], stdout=subprocess.DEVNULL)
time.sleep(5)
# sends signal to process to interrupt (equivalent to crtl+c)
scanProc.send_signal(15)
# wait so data can go into file
time.sleep(5)

subprocess.run(["sudo pkill airodump-ng"], shell=True, stdout=subprocess.DEVNULL)

file = open("tmp_airodump_log-01.csv", "r")

# will place data into ap and client
access_point_file = open("/home/kali/gps_stuff/airodump_logs/ap_file.csv", "a")
client_file = open("/home/kali/gps_stuff/airodump_logs/client_file.csv", "a")
write_to_ap = True

line = file.readline()
line = file.readline()
while line:
    line = file.readline()
    if (line == "\n"):
        # skips the line describing the data
        line = file.readline()
        line = file.readline()
        write_to_ap = False
    data_output = line.strip() + important_gps_data + "\n"

    if (write_to_ap):
        access_point_file.write(data_output)
    else:
        if (line != ""):
            client_file.write(data_output)

file.close()

deleteAllLogs = subprocess.run(["sudo rm tmp_airodump_log*"], shell=True)