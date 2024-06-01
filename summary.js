// authentication part start

//27-05-2024 create an auth.js file for MVC in this project in main session && signup and login 
//28-05-2024 create an post.js file for MVC in this project in main session && authorization get and post data

// 27-05-2024 start 

// first create MVC architecture and then create an simple connection with each other then 
// create two post API and join some other connection as well then
// in this controller file aapne bcrypt NPM no use karine tema first SALT and second HASH sodhine tema some functionality add karisu 
// jem ke check email is already present , nahi hoy to signUp karo 
// pachhi login API ma jaine check krsu ke email chhe DB ma ke nahi pachhi nahi hoy to  message ma This Email is not found, Please SignUp First!" lakhishu 
// and hoy to teno password check karisu ke pass barabar chhe ke nahi 
//hoy to Login sucess nahi to Incorrect Password that it... 

// 27-05-2024 end


// 28-05-2024 start 

// when user signup and then login with their user id then 
//so server create JWT token and after that token is passed by particular user
//in this token we have pass an payload,tokenExpiry and jwtsecretkey via server backend for frontend 
// then login success and get your jwt token 
// we create an routes => post.js file and setup your backend 2 API 
// get  API => when user get thier token to server
// post API => when we get token and send response via server to users
// then we create an routes => controllers.js file and set 2 API in router folder =>1.listPosts 2.createPost
// and that postController pass inside routes => post.js file
// then we get token so that token we check 5 condition in middleware => auth.js file
// then each of condition is not match then we pass an error other than we get particular user data
// 

// 28-05-2024 end 

// authentication part end




// authorization part start
// after the login authentication part we have jump into authorization part
// we can use authorization part bcz we have to pass data for specific user like CONTENT CREATOR , ADMIN
// we have cut the validateUser => auth.js middleware in the routes => post.js file and paste into index.js file directly
// so in this authorization part we have create an second middleware is roleMiddleware in middleware folder 
// after we have pass the auth.js middleware particular user in the roleMiddleware.js file
// we have check into roleMiddleware is user is for CREATE_CONTENT or ADMIN that data we have pass into particulat users...
//user is not for particular role so we have pass error is "You Are Not Use This Authorization Account"...
//that is whole authentication and authorization part ......

// authorization part end


