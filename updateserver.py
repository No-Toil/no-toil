import os, sys, manage, random, string

def main():
   # "cd ../No-Toil-Task-Tracker"
   os.chdir(os.getcwd())
   os.system(f"cd {os.getcwd()}")
   print("cd ", os.getcwd())

   try:
      # pull all code changes
      print(">> GIT")
      os.system(f"git pull")
   except Exception:
      print(">> GIT ERROR")

   try:
      # secret file
      private_folder_path = "djangoproject/private"
      try:
         os.makedirs(private_folder_path)
      except FileExistsError as e:
         # directory already exists
         pass
      secret_file_path = f"{private_folder_path}/secret_key.txt"
      secret_file_found = os.path.isfile(secret_file_path)
      with open(secret_file_path, 'r' if secret_file_found else 'w') as f:
         if not secret_file_found:
            print("generating secret key")
            secret_key_text = f"secret key {random_text()}"
            f.write(secret_key_text)
   except Exception as e:
      print("error handling secret file.", e)
      raise e

   try:
      # update python packages
      print(">> PIP")
      print("   updating packages...")
      os.system(f"pip -q install --upgrade pip")
      os.system(f"pip -q install -r requirements.txt --no-warn-script-location")
   except Exception:
      print(">> PIP ERROR")

   try:
      # now that django is updated, reset/update django project migrations
      print(">> DJANGO")
      manage.main(["manage.py", "makemigrations", "api"]) # update
      manage.main(["manage.py", "migrate", "api"])        # execute update
   except Exception as e: print(">> DJANGO ERROR\n", e)

   try:
      if "npm" in sys.argv[1]:
         # change dir to djangoapp and update npm packages
         print(">> NPM")
         os.chdir(os.getcwd() + "/djangoapp")
         os.system(f"npm install npm@latest")
         os.system(f"npm install --legacy-peer-deps")
         os.system(f"npm outdated")
   except Exception:
      print(">> NPM ERROR")

   print("\nUpdate successful, press enter to exit.")
   if "win" in sys.platform: input("--") # keep window open

def random_text(length = 10_000):
   text = ""
   for i in range(length):
      text += random.choice(string.ascii_letters)
   return text

if __name__ == "__main__":
   try:
      main()
   except Exception as e:
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
