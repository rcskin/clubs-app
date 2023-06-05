System Requirements:

Overview:

This MERN full stack app is designed for a school to manage its extra-curricular clubs without the need for schools to continuously make and modify PDF documents and print for pupils every term. This project was conceptualized from working in a school and researching from staff and pupils if they would use an online system they could view on any computer or on their phones.

This app allows an admin to add extra-curricular clubs to the termly clubs list, and pupils can view the list of clubs and join them which in turn generates a timetable for them to easily follow. Teachers are able to register as admin to view the clubs list, but also to view the number of attendees to better organize resources or support for their club.

The app aims to simplify the process of managing and organizing extra-curricular clubs and communicating between pupils and organizers.

Note - this app is a simplified version of what a school could use. In order to safeguard the school this is based on, I have used a fake school name and fake school email addresses for users. In real-life context, the school could use their secure email addresses.

How to Use:

The app can be used by either an admin, like an office adminitrator at the school, or a pupil/student that attends that school. 

A - Admin Use:
1. On the browser, the admin should use the admin login form and put in the hardcoded admin values.
For the purpose of this project, I hardcoded simple admin details, but in real-life context the admin details should have a more secure password. 
Admin details:
username: admin@stc.edu
password: admin123
2. Press the 'Login' button to get to the admin's dashboard
3. To add a club, the admin can add the day of the week, which is case sensitive, from Monday to Friday, the name of the club (must be unique), the time the club is on (as either a numerical value like '3:15' or a description like 'lunchtime'), the room number or description, the staff member's initials, the year groups that the club is open to (example '7' for year/grade 7s, or '9, 10' for year/grade's 9 and 10), and a capacity value so the teacher who is running the club can limit how many pupils can be in it. Once all inputs are filled in the admin can press 'Add Club".
4. Below the form to add a club is the list of 'All Clubs' where the admin can see/proof-read all the clubs they have by the day of the week to view.
5. The admin can edit any club they need to modify by pressing the 'Edit' button. Once the button has been pressed, inputs appear in each column of the club row to edit. The inputs have the values that were saved in them so that the editing is minimal and easier for the admin. Once the admin has made the changes needed, they can press 'Save' in order to save the changes. 
6. Some clubs are not offered every term, so the admin might want to completely delete a club because it is no longer needed. The admin presses 'delete' in the case they want to remove a club. 

B - Pupil/Student User:
This is using the assumption that schools have their own secure email addresses as UK schools do. 
i. 
If the pupil is a new user, they can register themselves by clicking the 'Need to register?' button. This toggles additional inputs on the form for their information. They must use their school email addresses to protect their data with built in security features that school's use. In the case of this app, the username is the email address of the pupil and must end with '@stc.edu' to validate them as an approved user. If they try to add a personal email, there will be an alert to use their school email address. 
They can add their own password, year group (example '8' if they are year/grade 8), and their name. Once finished filling in the inputs they can press the 'Register' button and are alerted to successfully registering. Then they can press the 'Already have an account? Login here' button to toggle back to the original login form.
ii. If the pupil is a registered user, they enter their username and password and press the 'Login' button to navigate to their pupil dashboard. 

Once logged in, the dashboard displays on the clubs from the database that match the year group they entered/are in, to reduce the amount of data being sent. 
The user can then join a club they want by pressing the 'Join!' button. 
If the user accidently tries to join a club they are already in, an alert telling them they are already in the club appears.
If the pupil wants to see the list of clubs they have joined, they can press the 'Joined Clubs' link under the header. This navigates to their list of clubs for that term. 
If the pupil wants to delete a club from their list because they no longer want to attend, they press the delete button and it removes the club from the user's database. 

Note: the capacity of the club changes when a pupil adds the club. It reduces by 1 so that the club does not overfill. If the pupil deletes a club were in, the capacity for the club goes up by 1 so that the space becomes available to another user. 

The user can log out by navigating back to Pupil Dashboard and press the 'Logout' button.


How to Install and Run App Locally:

1. Clone the GitHub repository: git clone 
2. Navigate to the project directory: cd clubs-app
3. Install the dependencies: npm install
4. Run the app: npm start
4. Navigate to the frontend directory: cd frontend
5. Install the dependencies: npm install
6. Run the app: npm start


System Architecture:

What web stack is used? The web stack that will be used is a MERN full stack. It follows a three-tier architectural pattern which includes the display tier using React.js, an application tier using Express.js and Node.js, and finally a database tier using MongoDB.

Why is this stack used? The MERN stack choice is motivated by how well suited it is for this type of application, how fast it is to build on, and how it is easy to debug. MongoDB is a document database that stores JSON/BSON data natively and is built on JSON and JavaScript. This application will have a lot of users and will need to make and modify many documents easily, so a document database makes this efficient and easy to manipulate the data stored. MongoDB also works very well with Node.js making it easy to store and manipulate JSON data. Express.js is a server-side application framework that deals with HTTP requests and responses. React.js is the front-end framework for building interactive interfaces in HTML and communicating with the server. (1)

How is the front-end built and why? This app will be using Create React App (CRA) to create the front-end because of the ease in building the app and utilizes client-side rendering so the application can be built quickly as well. A good reason to use it is also that it uses a virtual DOM meaning it is fast and responsive which is ideal in a school where there are many teachers and students using it. CRA is also a good tool to use for this application because the school would want an app that is private with authentication layers for the users (pupils), because it is cheaper to host, and will be frequented by users and admin. Since we don’t need to worry about Search Engine Optimization (SEO) for this school-based application, this is another reason to choose CRA over Next.js. Adding CSS and bootstrap libraries allows it to be easily styled to fit the client’s needs. (2,3)

How will the app be deployed? To deploy this app, I will be using Heroku as it is designed to make it easy for developers to deploy apps, it is cost-effective by providing various pricing plans which is suitable for freelance developers, it provides a secure environment which is essential for data that comes from schools, and it is scalable for increased traffic. (4)

How will the app be secure? In addition to the security that Heroku provides, the use of user authentication such as jsonwebtokens (JWTs) and Helmet which helps keep Express apps secure by setting various HTTP headers, will enhance security of the application. (5)

System Requirements Specification:

How will the application work? This application is designed for a school to easily manage their extra-curricular clubs available to pupils. Teachers and/or office staff and pupils will be able to use this application in a number of ways.

Administrators will be able to take information from teachers or outside organizers about the club they want to provide, including the name, time/duration it runs, room it is held in, staff member supervising/organizing, age group it is open to, and the maximum number of attendees that can join. Some schools might want the teachers to be able to log in as admins, however at the school this project is designed for, they prefer office staff to update any literature used to ensure it is consistent.

The administrators will be able to add, edit, delete, and view the clubs on their dashboard, whereas the pupils will be able to register, log in, view the clubs available to them, join clubs, remove themselves from clubs they no longer want to do, and view their bespoke timetable of clubs that they have added.

How will users benefit from using this application? Teachers at this school currently have no means of knowing who is signed up to their club to keep track of its popularity or how many resources might need to be provided. Office admin staff need to constantly modify word documents and turn them into PDF documents every term and upload these documents to the website any time there are changes to the clubs, and sometimes changes are not made until the term is over, leaving the list out-of-date. Pupils either must scroll through the PDF documents on the website or ask office staff/teachers to print the entire list if they want to keep track of what clubs they want to do. This causes a lack of access to many pupils or a reliance on many printed pages of club information that needs to continuously be re-printed.

This application streamlines usability for all parties. Administrators benefit from being able to easily manage club information quickly and easily without frustrating Word formatting and saving multiple versions of the same document. Teachers will be able to view the number of attendees in order to plan for their club effectively. Pupils will be able to quickly browse and join the clubs that suit their interests and availability. They will also be able to see their bespoke timetable to easily see what their time commitments are and be able to learn time-management skills.

Overall, this application will enhance the extra-curricular experience for all involved.

What other software is out there that does something similar? This school and many other schools use a management system called SIMS, however this is better for tracking attendance and behavior of students. It is also expensive and frustrating for teachers to keep track of pupils and register them. It also doesn’t provide a timetable for the activities for pupils. MySchool is also a school management system that is faster and more intuitive than SIMS and provides many more features, for example payment management and events management, however it does not show that it could display, track, and modify extra-curricular clubs on their website.

Many school management systems need to keep track of pupil data such as attendance, finance information, reports, behavior tracking, resource management, medical data etc. but they don’t seem to have similar functionality to this application nor customization options. These management systems are also incredibly costly, and many schools rely on multiple app subscriptions to get what they need either for admin, pupils, parents, or a combination of those. Therefore, this application option is based on my experience working in a school and seeing what specific issues lie in using multiple apps and platforms for teachers, admin, and pupils. It also provides a cheaper option to state schools who are struggling with dwindling budgets.

User Stories:

Admin: • As an admin, I want to be able to log in to the app. • As an admin, I want to be able to add a new club with a name, time, room location, staff member running the club, the year group it is open to, and how many attendees the club can hold. • As an admin, I want to be able to edit and delete clubs. • As an admin, I want to be able to see a list of all the clubs that have been added.

Student: • As a student, I want to be able to view a list of all the clubs available. • As a student, I want to be able to view clubs based on day of the week. • As a student, I want to be able to add a club to my booking. • As a student, I want to be able to remove a club from my booking. • As a student, I want to be able to view a timetable of the clubs I have booked.

Requirements:

Functional Requirements: • Allows admin to add/edit/delete/view clubs • Each club has a specific number of attendees that can attend • Allows pupils to log in and view all available clubs • Allows pupils to add clubs to their timetable and remove any from their timetable • App shows availability of each club in real-time

Non-functional Requirements: • Easy to use and navigate • Secure and protects personal information of users • Accessible and works on various devices and platforms • Reliable and able to handle many users • Scalable and able to accommodate future growth of number of clubs and number of pupils in a growing school

System Requirements: A. Software required to run the server: • Node.js • npm v6 or later • MongoDB B. Software required to run the client: • Node.js • npm v6 or later C. Dependencies: • React • Express • Mongoose • nodemon

Sources: 1. https://www.mongodb.com/mern-stack 2. https://merge.rocks/blog/create-react-app-vs-next-js-how-are-they-different-and-similar-in-2023 3. https://prismic.io/blog/create-react-app-cra-vs-nextjs 4. https://www.heroku.com/what 5. https://helmetjs.github.io