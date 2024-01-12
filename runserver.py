# include
import os, sys, platform

# helper functions
def get_ip_address():
   import socket
   s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
   try:       
      s.connect(('10.255.255.255', 1))
      ip_address = s.getsockname()[0]
   except Exception:
      print(Exception, "unable to get ip address, defaulting to localhost")
      ip_address = '127.0.0.1'
   finally:
      s.close()
   return ip_address

# main
if __name__ == "__main__":
   # python runserver.py update
   if len(sys.argv) > 1:
      if sys.argv[1].lower() == "update":
         import updateserver
         updateserver.main()
   
   # python runserver.py (default)
   else:
      try:
         # "cd ../No-Toil-Task-Tracker"
         os.chdir(os.getcwd())
         print("cd ", os.getcwd())
         import manage
         manage.main(["manage.py", "runserver", f"{get_ip_address()}:8000"])
      except:
         print(">> DJANGO: error running server")

   if "win" in sys.platform: input("--") # keep window open
