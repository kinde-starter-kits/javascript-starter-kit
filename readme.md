# Kinde Starter Kit - JavaScript

## Register an account on Kinde

To get started set up an account on [Kinde](https://app.kinde.com/register).

## Setup your local environment

Clone this repo.

We are using the hosted version of the Kinde SDK for simplicity so no install required.

Find this code block in the `index.html` file:

```
const kinde = await createKindeClient({
    domain: 'https://your_subdomain.kinde.com',
    redirect_uri: 'http://localhost:3000'
});
```

Replace `https://your_subdomain.kinde.com` in the code block with with the `Token host` value from the Kinde `App Keys` page

## Set your Callback and Logout URLs

Your user will be redirected to Kinde to authenticate. After they have logged in or registered they will be redirected back to your React application.

You need to specify in Kinde which url you would like your user to be redirected to in order to authenticate your app.

On the App Keys page set `Allowed callback URLs` to `http://localhost:3000`

> Important! This is required for your users to successfully log in to your app.

You will also need to set the url they will be redirected to upon logout. Set the ` Allowed logout redirect URLs` to http://localhost:3000.

## Start your app

Run `npm start` and navigate to `http://localhost:3000`.

_Note_ This uses the built in python server that ships with Mac.

Click on `Sign up` and register your first user for your business!

## View users in Kinde

If you navigate to the "Users" page within Kinde you will see your newly registered user there. 🚀
