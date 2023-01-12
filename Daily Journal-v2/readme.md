<div align="center">

  <h1><a href="https://daily-journal-fp1r.onrender.com/">Daily Journal</a></h1>

  ![image](https://user-images.githubusercontent.com/93904438/212163819-e2f4a789-f810-4938-97df-4de942f8fdf6.png)

  <p>Daily Journal Webapp, made using Node.js and Mongoose</p>

</div>

</br>

---

</br>

### Main features:

   * Uses a database (mongoose) instead of JavaScript variables.
    
   * Allows to delete an entire entry by just hitting the trash icon next to the title, removing it from the database.
    
   * New navbar buttons to navigate faster and easier though the website.
    
   * **Theme Switch button**, which alternates between Light ☀ and Dark 🌙 themes.
    
   * Now the page has responsiveness. It adapts depending on the device.

</br>

---

</br>

### How to set it up:
1. Run `npm install` on your terminal
2. Create your account locally in mongoose or online in [MongoDB Atlas](https://www.mongodb.com/atlas/database)
3. Create an authorised user in MongoDB Atlas
4. Store your USER, PASSWORD, DB NAME inside an .env file

It should look something like this:

```
MONGODB_USER=USER-NAME
MONGODB_PASSWORD=USER-PASSWORD
MONGODB_NAME=DB-NAME
```

> Replace "USER-NAME", "USER-PASSWORD" and "DB-NAME" for the respective fields.

4. Install dotenv package using `npm install dotenv --save` on the terminal.
