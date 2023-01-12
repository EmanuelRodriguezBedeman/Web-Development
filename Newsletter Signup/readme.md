<div align="center">
  <h1>Newsletter Signup</h1>

  <p align="center">Webapp example, of a subscription to a newsletter though email using Node.js and Mailchimp.</p>
  
  ![image](https://user-images.githubusercontent.com/93904438/212150192-6b68ed67-06cc-46cf-838e-f61768a9194c.png)
</div>

</br>

### How to set it up:
1. Run `npm install` on your terminal
2. Create an account in [Mailchimp](https://mailchimp.com)
3. Store your API-KEY and SERVER inside an .env file

It should look something like this:

```
MAILCHIMP_KEY=YOUR_API_KEY
MAILCHIMP_SERVER=YOUR_SERVER_ID
```

> Replace "YOUR_API_KEY" and "YOUR_SERVER_ID" for your API-KEY and SERVER-ID respectively.

4. Install dotenv package using `npm install dotenv --save` on the terminal

5. If you want to make it functional, remember to configure your Mailchimp settings.
