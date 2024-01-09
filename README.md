<h1 align="center">Metrics dashboard app</h1>
<h2 align="center">This project is live ! check it out <a href="https://billboard.seiki.co/">here</a></h2>
<p align="center">
<img src="https://cdn.discordapp.com/attachments/774360587391860769/1194247145197420694/image.png?ex=65afa853&is=659d3353&hm=8df864a449677ab2995a97f29f0b087580219c26e324f2d8d60406410c577246&" alt="banner"></img>
</p>

## Demo

<p align="center">
   (loading, wait a few seconds) :
</p>

<p align="center">
<img src="demo/demo.gif" alt="androiddevnotes logo"></img>
</p>

## Doc

Follow these instructions to build and run the project OR you can use the Dockerfile at your disposal

## Env

For this project you will need a `.env.local`
There is a .env.example that you can follow but you will have to do two things : - Register an app in <a href="https://firebase.com/">Firebase</a> with firestore, storage and authentication (mp, google) instances - Create an app at the <a href="https://www.themoviedb.org/">The Movie DB</a> (Follow the .env.example instructions)

## .env.local file :

```
# Please create your .env.local following this structure :

# MOVIES API
NEXT_PUBLIC_TMDP_BASE_URL=https://api.themoviedb.org/3
NEXT_PUBLIC_TMDP_AUTH=<FIREBASE_TOKEN> # (https://www.themoviedb.org/settings/api) - second token!! (*not* the first smaller api key)>


# FIREBASE API
NEXT_PUBLIC_FIREBASE_API_KEY=<FIREBASE_TOKEN>
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=<FIREBASE_TOKEN>
NEXT_PUBLIC_FIREBASE_PROJECT_ID=<FIREBASE_TOKEN>
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=<FIREBASE_TOKEN>
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=<FIREBASE_TOKEN>
NEXT_PUBLIC_FIREBASE_APPID=<FIREBASE_TOKEN>
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=<FIREBASE_TOKEN>
```

### Setup Project

- Clone this repository using `git clone https://github.com/juniorconseiltaker-technicaltest/CAMPO_Noe.git`.
- `cd` into `CAMPO_Noe`.
- `cd` into `metrics`.
- `yarn install` to get all the dependencies.
- `npm run build` to build the project.
- `npm run start` to start the project on localhost.

or in dev mode :

```
npm run dev
```

## Docker <img src="https://cdn.discordapp.com/attachments/774360587391860769/1169799936792080384/docker-logo-CF97D0124B-seeklogo.png?ex=6556b816&is=65444316&hm=8fe5e5d310418e2a8bfaca75db7ef99811b6e4f3beccda90b3ce39371d2ee7ea&" width="40" height="25"></img>

```
docker build -t metrics .
```

```
docker run -p 8083:8083 metrics
```

> Web App enforces [Conventional Commits specification](https://www.conventionalcommits.org/en/v1.0.0/), make sure to read and follow them.

## Tips for correction

- The routing of the app is made by the app folder but the UI itself is inside the section folder
- In the discover, movies and shows folder inside the section folder is the main UI for the 3 main section of the app
- The component folder only contains MUI reusable components

## Project Structure

```bash
seiki-web-app/
├── node_modules/                   # This folder contains all the dependencies that the project requires, including React Native itself.
|   └── ...                         # all the dependencies listed
├── src/                            # Main source files folder
|   ├── app/                        # Main app pages corresponding to the route (url)
|   └── components/                 # Reusable components
|   └── sections/                   # Different UI pages of the applications (called by the app files)
|       └── discover/               # Discover section source files
|       └── movies/                 # Movies section source files
|       └── shows/                  # Shows section source files
|   └── auth/                       # Auth engine
|   └── types/                      # Typescript types and interfaces declarations
|   └── routes/                     # Routing engine
├── package.json                    # This file contains metadata about the project, including the project name, version, and dependencies.
├── package-lock.json               # This file is generated by npm and ensures that the project's dependencies are installed in a consistent manner.
```

## Dependencies

| Name       | Description             | Version |
| ---------- | ----------------------- | ------- |
| [@emotion] | Simple styling in React | ^11.0   |
| [@iconify] | SVG images as icons     | ^4.1.1  |
| [@mui]     | Core styling            | ^5.14.1 |
| [@Jest]    | Testing                 | ^4.2.4  |
| [@axios]   | HTTP requests           | ^1.5.1  |
| [@next]    | React Framework         | ^13.5.4 |
| [@react]   | JS library              | ^18.2.0 |

## License

**metrics** Copyright ©2023 - metrics / Noé Campo.

**metrics** software under
the [GPL v3](https://opensource.org/licenses/gpl-3.0.html)
license, see the [LICENSE](./LICENSE) file in the project root for the full license text.
