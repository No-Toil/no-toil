# No-Toil-Task-Tracker

To install server:

Download and install:

- [download and install 'git'](https://git-scm.com/downloads)

- windows: type 'python' into the command line // [mac: install python (3+) from their website](https://www.python.org/downloads/)

- use git to clone this repository into your desired location by typing opening up a terminal/command prompt window and typing ```git clone https://github.com/ehrrsn7/No-Toil-Task-Tracker```

- while still in command prompt window, type ```cd No-Toil-Task-Tracker``` to change to the project directory

- run ```updateserver.py``` to install all required the dependencies and packages.

- open the directory in a file explorer window and create a file called 'secret_key.txt' in a new folder called 'private' within the 'djangoproject' folder, and put any text in that txt file.

Now you should be ready! Run ```python runserver.py``` to start the server.

Extra:

- put a shortcut to 'updateserver.py' and 'runserver.py' on the desktop

- put shortcuts to 'runserver.py' and 'RBTray' in the shortcuts folder so that the server runs on startup.


# Major Changes Released

This repository is an archive of the first edition *(v1.0)* of the task tracker.

- [x] TODO (v1.0): there were some needed fixes for the updateserver.py script. (Done, and pushed to this repository despite being archived).

- [ ] TODO (v1.0): the data currently has no way of being exported to a file or another database, like v1.1 does. Provide an export to .csv feature.

- [ ] TODO (v1.0): feature from more current versions: No Toil Logo is displayed rather than React icon.

The overhaul *(v1.1)* nuked the entire tech stack and the source code aside from the use of react. Instead of using django and the CRA builder, Vite and Express were used, utilizing firebase as the backend. This time, the app wasn't made by request of the company, nor does it seem to be utilized.

- [ ] TODO (v1.1): currently, my instance of the repo has a file containing the firestore credentials. There is no documentation telling any other developers how to configure firestore and save the credentials into the application. This will need doing.

The final stage of this *(v1.2)* will reunite all of these different versions into one repository, BOTW-style. I'm currently messing around standalone frameworks such as Electron and Tauri, which inspired me to create a standalone application alongside the main app. The front-end application remained the same, as these support Vite out of the box, but business logic will need to be adjusted to enable the application to switch over to different backends (not sure if this can be easily done, firebase is a little too great at enabling real-time applications out of the box).

The idea of reuniting the codebase's involves working all the source code into GitHub, with the releases, issues and all the documentation being brought in from everywhere. (Potentially could I find some of the OG notes from No Toil about the application specifications?) My main motivations behind this are to bring the codebase back to being owned by No Toil (this means opening up a GitHub account for the company, providing them with the credentials and creating a private[?] repository) for the code to originate from. The company computer can then clone a specific release of the software which disables pulling any changes NOT tagged with that release. Then, if they'd like, they can browse the releases and the source code for newer versions and install them instead (which is better since newer versions don't need development runtime's).

Again, things need to be unified under "No-Toil". It's not an application **I** would use, it's one that I made **for them**. The database needs to be either localized (AKA finding a better alternative to SQLite...Potentially NoSQL, PostgreSQL or something GraphQL enabled. Firestore was an amazing solution, considering all that was needed was just the one list of entries) or **owned** by them (being able to switch to a Firestore Solution in the codebase — requires fully de-coupled business logic).

Potentially, another front-end release *(v1.3)* could happen, ditching some of the more custom functionality and focusing on de-coupling the business logic. This way, I can use more standardized methods of user interaction, and potentially re-structure the application in a more useful way for the company. I'm thinking implementing different pages/applications:

- Filter Bible
   - Data Entry - focused, a tool for Andrea to keep track of and upload to
   - A main focus here is how the CMS will work. Maybe Andrea **OR** whoever is in charge of developing their new website — if that's still a thing — can work on.
- Filter Production (currently used in this program, and is the sole function)
   - Filter room bagging scanner integration (Tauri desktop exclusive feature)
- QuickBooks Integration
   - One of the more complicated/expensive ideas here is the need for this. The problem it solves is minimal, potentially could be a bit of a dud. But it would be much more ideal for productivity, since it allows the employees to draw real-time data into the application, making it more useful and introducing the need for more features.
 
More new features:

- UI feature: implement fade-in animations using [React Suspense](https://blog.logrocket.com/async-rendering-react-suspense/) or [the React useTransition hook](https://youtu.be/1xjSQJWejZM)
   - "it's always a better user experience to show that the app is doing something. If it's doing nothing, there is a bit of a fear that the application is doing nothing". Maybe implement an animated icon like that seen in Visual Studio indicating the state of the building process.
