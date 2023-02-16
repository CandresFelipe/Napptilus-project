<h1 align="center">Napptilus project</h1>

Repository for a small application to purchase mobile phones. The description of the work  develope in this project is found [in this PDF](Reto_Frontend.pdf)

## Getting started

Make sure you are using the same node version of this project otherwise vite won't start the server. This project uses Node 16.14.2

Go to your terminal and clone this repository by executing this in your terminal:
```
  git clone https://github.com/CandresFelipe/Napptilus-project.git
```

Once this is successfully cloned, go to the project directory from where is located.

```bash
  cd napptilus project
```
Before starting the server, you need to setup the local env variables. For this you need to create a `.env` file in the root of your project
and add this endpoint:

```
VITE_API_URL="https://itx-frontend-test.onrender.com/api/"
```

Install dependencies

### Setting up the development environment

Below you will find the command for setting up the project within your machine.

```bash
  npm install
```

Start the dev server

```bash
  npm run start
```

Build for production

```bash
  npm run build
```