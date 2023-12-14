# My Nest.js Blog
This is a blog built with Nest.js that allows you to write and publish blog posts in Markdown format. It also includes user authentication, a working chat function, and integration with PocketBase, which is used to store all the data for the blog.

## Getting started
To run this blog, you'll need to have Docker and Docker Compose installed on your machine.

Clone this repository to your local machine.

Navigate to the root directory of the project in your terminal.

Run docker-compose up to start the app.

Open your web browser and go to http://localhost:3000 to view the app.
the backend admin ui is at http://localhost:8080/_/

## Writing a blog post
To write a blog post, follow these steps:

Create a new Markdown file in the blogposts directory. The name of the file will be used as the URL for the blog post.

Add your blog post content in Markdown format to the file.

Add a title attribute to the top of the file to give your blog post a title.

Add any other metadata attributes you want to the top of the file, such as author, date, or tags.

Save the file and commit it to the repository.

Your blog post will now be available at http://localhost:3000/posts/<filename>.

## User authentication
This blog includes user authentication using Passport.js. To log in, click the "Log in" button in the navigation bar and enter your credentials. To log out, click the "Log out" button.

## Chat function
This blog includes a working chat function that allows users to chat with each other in real-time. To use the chat function, click the "Chat" button in the navigation bar. You can enter a message in the chat box and hit enter to send it. Other users will be able to see your message and respond.

## PocketBase integration
This blog uses PocketBase to store all the data for the blog, including blog posts, user information, and chat messages. The PocketBase executable is included in the pocketbase directory of the repository, and is started automatically when you run docker-compose up.

## Styling
This blog uses Tailwind CSS and DaisyUI for styling. To customize the styling, you can edit the CSS files in the public directory.

## Gun.js integration
In the future, this blog may include integration with Gun.js for decentralized data storage. There are currently some files related to Gun.js in the repository, but they are deactivated.

That's it! Enjoy using our Nest.js blog. If you have any questions or feedback, please let us know.

### adding new projects with their own git history
```sh
git subtree add --prefix=apps/next-blog https://github.com/valiantlynx/next-blog.git main --squash
git subtree pull --prefix=apps/next-blog https://github.com/valiantlynx/next-blog.git main --squash
git subtree push --prefix=apps/next-blog https://github.com/valiantlynx/next-blog.git main

```
