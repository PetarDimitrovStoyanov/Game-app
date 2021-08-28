Angular-Project: "Game-store"

#Project idea:
This is a small website for computer game ads. Anyone can make their own registration and start buying or selling a computer games using ads.
There are two types of roles - users and admins. The users can register, log in, create game ads, edit and delete their own ads, and use the search and filter options to find the wanted game. 
Once the game ad is found they can click on the button "make an offer" to write an email to the current ad owner and make an offer.
The admin, can make everything that the user can do, and also edit not only his own ads but of all other users too. He can see all the registered users and change some of their data (like the role, name, and email).

#Application Structure:
* public part (accessible without authentication) - the non-authenticated users can see:
  - Start page - it contains brief information about the web application and buttons for login and register.
  - Login page - contains a login form.
  - Register page - contains a registration form.
  - Error page - "page not found 404" pops up when someone tries to reach a non-existing page.

* private part (available for logined/registered users) - it contains the following pages:
  - Home page - has an animated greeting message along with a carousel section that shows the website's suggestions for wanted games.
  - All games page - it contains a search field that allows searching of a game by its name. Also, has a section for sorting by price (ascending and descending) along with a second section for filtering by category. 
                     And all that working mutual to obtain the common result (by search, sort, and filter).
  - Create game page - holds an empty form to fill out. 
  - Edit game page - holds filled form, that contains the data of the selected game ad. The information can be amended by the user if he is a creator or has an admin role.
  - My games page - a completely animated page that contains an interactive section that shows an image of the hovered game and a section for all games created by the currently logged user.
  - Details page - by click on the details button of some specific game ad, the logged user will be redirected to a page that contains a section with game ad information as game name, category, price, description,
                   year of the game release, image, and creator's email address for contact.

* administrator part (available for admins only)
  - All users page - it is visible only for users with admin roles. This page shows all registered users and their names, emails, id's and roles in table form, which has pagination. 
Some of the columns have an option to be order reversed in order to be easy for working. Of course, that is not all, on this page is also a search section, 
that allows searching by email in order to be easier for the admin to find the person he wants.
