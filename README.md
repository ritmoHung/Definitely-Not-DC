# Software Studio 2023 Spring - Midterm Project
This project mimics the UI and some :pinching_hand: of the functionality of Discord.

## Web Page Link
[Vercel App](https://def-not-dc.vercel.app/)



## Scoring
| **Basic Components**                        | **Score** | **Check**          |
| :------------------------------------------ | :-------: | :----------------: |
| Membership - Email Sign Up                  | 7.5%      | :white_check_mark: |
| Membership - Email Sign In                  | 7.5%      | :white_check_mark: |
| Host your page                              | 5%        | :white_check_mark: |
| Database R/W                                | 15%       | :white_check_mark: |
| RWD                                         | 15%       | :white_check_mark: |
| Chatroom                                    | 20%       | :white_check_mark: |

> [!NOTE]
> This project is powered by Next.js, hence deployed on Vercel (which goes the most well with Next.js), instead of Firebase.

> [!CAUTION]
> Since Vercel is serverless, it is not possible to use WebSocket or socket.io to watch MongoDB change streams, therefore the message rendering may be slower than realtime.

| **Advanced Components**                     | **Score** | **Check**            |
| :------------------------------------------ | :-------: | :------------------: |
| Using React                                 | 10%       | :white_check_mark:   |
| Sign up / sign in with Google               | 1%        | :white_check_mark:   |
| Chrome notification                         | 5%        | :small_red_triangle: |
| CSS animation                               | 2%        | :white_check_mark:   |
| Deal with code sent                         | 2%        | :white_check_mark:   |

> [!NOTE]
> Next.js is a framework built on React.

> [!CAUTION]
> The current Chrome notification implementation only sends new message notifications in the selected thread. After some testing, it is known that 1. It cannot receive notifications when the window is blurred, and 2. The same method doesn't work on mobile devices, and will cause a crash if any notification comes in (has something to do with Service Worker).

| **Bonus Components**                        | **Score** | **Check**            |
| :------------------------------------------ | :-------: | :------------------: |
| User profile                                | 1%        | :white_check_mark:   |
| Profile picture                             | 1%        | :white_check_mark:   |
| Send image                                  | 1%        | :small_red_triangle: |



## Get Started
This project uses Yarn Modern + node_modules installation strategy to do package control, please remember to migrate Yarn version by `yarn set version berry`. If you wish to use npm instead, please remove `.yarn` folder, `.yarnrc.yml`, and `yarn.lock`.

First, install the dependencies:

```bash
npm install
# or
yarn install
```

Next, create a `.env.local` file at the root of the project. Add the following environement variables.
<details>
    <summary>Click here to see the variables</summary>

    ```
    AUTH_SECRET=LI5ubK+ZHFngobSfFyiUjUqBby90pmM+NzLu3s55nHtc

    AUTH_GOOGLE_ID=794276175753-ndaq44m20khcd0d4b1bnpdjstei8rv37.apps.googleusercontent.com
    AUTH_GOOGLE_SECRET=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

    MONGODB_URI=mongodb+srv://108030015:SbY4tEm2QUwJN9DF@clusterdndc.0jub7lp.mongodb.net
    MONGODB_DB=dndcTest

    IMGUR_ID=47c0be817ac37c2
    IMGUR_SECRET=38da011c9655de3f41d0d4ded58f31c2bd416fc2
    ```
</details>

> [!CAUTION]
> I am only sharing these environment variables for demo convenience. Please **DO NOT** share it to others!
> If you want the exact same threads and messages as deployed, change `dndcTest` to `dndc`. Use with caution!

After adding the environement variables, run the development server:

```bash
npm run dev
# or
yarn run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## How to Use?
### Hompage `/`
As to now (2024-05-02), the hompage hasn't been done yet. When you visit the hompage, the only way to navigate is clicking the "Open DNDC" link in the top navbar, which takes you to `/signin`.

### Sign Up Page `/signup`
The sign up page has a pair of credential inputs, further used for creating a user. There are 3 possible cases when you submit:
1. A user with the same email already exists. It will stay at the same page with a popup "Either you already signed up with this email, or signed in by OAuth before."
2. Failed to create a user or other internal error. It will stay at the same page with a popup "Account creation failed." or other error messages.
3. All conditions passed. It will navigate to `/signin` with a popup "You can now sign in with your new account.".\

There is also a link at the bottom that could directly take you to `/signin`.

### Sign In Page `/signin`
The sign in page also has a pair of credential inputs, used for matching a user in the database. Every sign in errors, including wrong email, wrong password, user DNE, OAuth failed, etc., would eventually route you back to this page.

> [!NOTE]
> If you logged in first by credentials, your name is randomly generated in the format `User[######]`. You're also able to sign in with Google OAuth using the exact same email, but not vice versa, because signing in with credentials requires a password match.
> If you sign in with Google OAuth first, you will have a name and PFP that the provider returns.

There is also a link at the bottom that could directly take you to `/signup`.

### Chat `/chat`
> [!NOTE]
> This page is only accessible when you are signed in. Otherwise, you will be routed to the sign in page.

On the left is the sidebar, which displays all public threads and private threads you're in, your personal profile (name, PFP), some theme settings, and a link to `/chat/settings`.
The thread creation button locates at the top of it. A name, slogan, and is public are required to create a new thread. Friend select does not show when is public is true. The result of search user excludes the user itself and those that are selected, which can always be removed by pressing the `X` button rendered along with their names.

On the right is the main thread messages container. The top shows the current thread's slogan, and the bottom is the input area.

:warning: The image button currently only opens your selected image in a new tab.

Only if you select a thread from the sidebar does it render the corresponding messages. Messages supports the Markdown format and mimics the UI of Discord (render a compact version of message when the same user sends multiple messages within a period; each new date has a separator above).

### Settings `/chat/settings`
> [!NOTE]
> This page is only accessible when you are signed in. Otherwise, you will be routed to the sign in page.

Currently it only allows you to adjust theme appearance and sign out. You will be routed back to `/` when sign out.



## Bonus Function Description
### Theme / Palette changing
This is actually a quite complex set to explain. It combines Sass functions, dynamic classes, Provider, useContext, and localStorage to function.
If you're interested about how it works:
- For Sass: Start with `/scss/color.modules.scss`, `/scss/_utils.scss`, `/scss/__schemata.scss`, and `/scss/components.scss`.
- For the rest: Start with `/utils/providers.js` and `/components/theme.js`.

### User Profile / Profile Picture
Each user has its own profile, including account_id (similar to Instagram ID, handy for user search), PFP, status, and name color. Status is currently not implemented, and color is randomly assigned on user creation. If a message is sent by the user, the message would show the correct PFP and the name text would be colored by the user's name color. Others would be rebdered using a default image and an accent color.
Profile settings is also not implemented yet.

### Send Image
You couldn't say that it's fully functional because you can't actually upload local images, but if you know an image's url, you can always insert it using the Markdown syntax `![image]({url})`.



## Changelog
(TBD)
