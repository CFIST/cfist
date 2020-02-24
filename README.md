### Setup this project

> - `git clone` this repo into your local directory
> - `cd` into backend directory and run - `npm install`
> - `cd` into front directory and run - `npm install`
>
> The backend is powered by an ExpressJS framework and runs on port 5000.
> The frontend is powered by React and runs on port 3000.

### Environment Variables

> For the backend modules to properly function, a few environment variables have to be set:
>
> - `mm_jwtPrivateKey`
> - `mysqluser`
> - `mysqlpass`
>
> `mm_jwtPrivateKey` will be the private key for [Json Web Tokens](https://jwt.io/) to be generated. We will be using JWT Tokens as part of the request respose cycle by authenticating and authorizing users.
>
> `mysqluser` and `mysqlpass` are the credentials for the username and password for the MySQL Community Server.
>  Make sure to name database in mysql "cs160"
>
> The way to set environment variables differ between platforms and interface.  
> **_Only the terminal running the backend needs to set its env_var._**
>
> ```
> // Windows CMD
> > set mm_jwtPrivateKey="value"
> > set mysqluser="username"
> > set mysqlpass="password"
>
> // Windows Powershell
> > $env:mm_jwtPrivateKey="value"
> > $env:mysqluser="username"
> > $env:mysqlpass="password"
>
> // Mac/Linux Bash Shell
> > export mm_jwtPrivateKey="value"
> > export mysqluser="username"
> > export mysqlpass="password"
> ```

### Running the Project

> - Open 2 terminals for each of the applications
> - Run the backend with command - `node app`
> - Run the frontend with command - `npm start`
>
> If successful, the 2 terminals should display the following:
>
> ```
> // Frontend
> > npm start
>
> Compiled with warnings.
> ...
> ...
> Search for the keywords to learn more about each warning.
> To ignore, add // eslint-disable-next-line to the line before.
> ```
>
> ```
> // Backend
> > node app
>
> CFist listening on port 5000
> Executing (default): SELECT 1+1 AS result
> database connected
> All models synced to tables
> ```
>
> Using a web browser, go to <localhost:3000> and start playing around with our app!
>
