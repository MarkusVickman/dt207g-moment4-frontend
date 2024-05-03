# Moment 4 i kursen Dt207G - Backend-baserad webbutveckling

### Webbplatsen
På den här webbplatsen kan du lagra ditt CV i form av anställningar med Företagsnamn, arbetstitel, ort, start och sluttid för anställningen samt en längre beskrivning av arbetet. Inläggen sparas i en databas med hjälp av ett api. För att skapa inlägg måste användaren först registrera ett konto. Användarnamn, lösenord och datum för när kontot skapades lagras i en mongoDb-databas. Lösenordet krypteras över https på vägen till servern och i servern hashas lösenordet så att det inte går att ses av någon. På användaren sida går det att ta bort kontot och då tar alla användarspecifika cv också bort från databasen. Användaruppgifter och cv-inlägg sparas i olika collections i databasen.


### Sidan består av följande:
* Startsida:
  * Information om sidan.
* logga in:
  * Logga in formulär.
  * Här skickas användarnamn och lösenord med till servern i ett post-anrop. Som svar får webbplatsen en JWT-token med användarnamn och authentisering som sparas i sessionstorage för att ge åtkomst till mina sidor.
* Registrera användare:
  * Formulär för att registrera en användare.
  * Här skickas användarnamn och lösenord med till servern i ett post-anrop. Användaren dirigeras sedan till logga in-sidan.
* Mina sidor - Mitt CV:
  * För att få åtkomst till denna sida behöver användaren vara inloggad och ha en giltig JWT-token sparad i sessionstorage. Denna token används sedan av servern för att ge användarspecifik information till webbplatsen.
  * Formulär som läser in data och skickar vidare till apin med ett post-anrop om alla värden är ifyllda. Där sparas inlägget in till en databas.
  * Här syns alla CV-inlägg eftersom att de hämtas med ett fetch get-anrop efter att sidan har laddats in.
  * Det går att välja vilket inlägg som ska tas bort eftersom att id-knappen innehåller index för inlägget som skickas med till databasen genom ett fetch delete-anrop.
* Mina sidor - Min användare:
  * För att få åtkomst till denna sida behöver användaren vara inloggad och ha en giltig JWT-token sparad i sessionstorage. Denna token används sedan av servern för att ge användarspecifik information till webbplatsen.
  * Här skrivs information ut på skärmen om användaren med hjälp av GET-anrop och det går även att ta bort användaren och då försvinner alla kontospecifika cv-inlägg också från databasen.

 
### Uppbyggnad
*Webbplatsen skapades i ett node.js-projekt och använde parcel som atomatiserad utvecklingsmiljö.
*Skriven i html, css och javaScript

Här går det att testköra webbplatsen [på denna länk](https://personligt-cv.netlify.app/). Koden innehåller många kommentarer som kan svara om fler frågor finns om webbplatsen. En mer ingående beskrivning av api-funktionerna och hur den används hittar du [här](https://github.com/MarkusVickman/dt207g-moment4).

### Replikera
För att jobba vidare på webbplatsen eller testköra koden lokalt behövs node.js vara installerat på datorn. Sedan ska kommandot "npm install" köras i rotkatalogen för webbplatsen. För att testköra används kortkommandot "npm run start" eller "npm run build" för att skapa en produktionsfärdig webbplats.

## Markus Vickman
Jag läser till en högskoleexamen i datateknik med inriktning webbutveckling på mittuniversitet.

### Student ID: mavi2302
