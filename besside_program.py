import subprocess
import time
import json

#puts wifi into monitor mode to allow for besside to run
subprocess.run(["(cd /usr/local/src/re4son-kernel_4*/tools && sudo ./mon0up)"], shell=True)

# randomise my mac address to hide myself
subprocess.run(["sudo", "macchanger", "-A", "mon0"])

interface='mon0'

# runs besside
besside_run = subprocess.Popen(["sudo", "besside-ng", "mon0"])

time.sleep(25)

besside_run.send_signal(15)

subprocess.run(["sudo pkill besside-ng"], shell=True, stdout=subprocess.DEVNULL)
