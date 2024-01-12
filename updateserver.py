import os, sys, manage

def main():
   # "cd ../No-Toil-Task-Tracker"
   os.chdir(os.getcwd())
   os.system(f"cd {os.getcwd()}")
   print("cd ", os.getcwd())

   try:
      # pull all code changes
      print(">> GIT")
      os.system(f"git pull")
   except:
      print(">> GIT ERROR")

   try:
      # secret file
      secret_file_path = "djangoproject/private/secret_key.txt"
      secret_file_found = os.path.isfile(secret_file_path)
      if secret_file_found: print(secret_file_found)
      else: raise Exception(f"secret_file_found: {secret_file_found}")
   except e:
      print("error handling secret file.")
      print(e)

   try:
      # update python packages
      print(">> PIP")
      print("   updating packages...")
      os.system(f"pip -q install --upgrade pip")
      os.system(f"pip -q install -r requirements.txt --no-warn-script-location")
   except:
      print(">> PIP ERROR")

   try:
      # now that django is updated, reset/update django project migrations
      print(">> DJANGO")
      manage.main(["manage.py", "makemigrations", "api"]) # update
      manage.main(["manage.py", "migrate", "api"])        # execute update
   except Exception as e: print(">> DJANGO ERROR\n", e)

   try:
      if "npm" in sys.argv[1]:
         try:
            # change dir to djangoapp and update npm packages
            print(">> NPM")
            os.chdir(os.getcwd() + "/djangoapp")
            os.system(f"npm install npm@latest")
            os.system(f"npm install --legacy-peer-deps")
            os.system(f"npm outdated")
         except:
            print(">> NPM ERROR")
   except: pass

   print("\nUpdate successful, press enter to exit.")
   if "win" in sys.platform: input("--") # keep window open

if __name__ == "__main__":
   try:
      main()
   except e:
      # once error logging is set up, replace below with logic to forward files to repository/developer email
      current_developer = """
         Elijah Harrison
         Send the error details (found above) or relevant log files to:
         developer@ejhfotos.com
      """
      print("ERROR IN MAIN -- contact the developer")
      print()
      print(current_developer)
      print()
      print(e)
