# Software Studio 2023 Spring - Midterm Project
This project mimics the UI and some :pinching_hand: of the functionality of Discord.

## Web Page Link
[GitHub Pages](https://def-not-dc.vercel.app/)



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

| **Advanced Components**                     | **Score** | **Check**            |
| :------------------------------------------ | :-------: | :------------------: |
| Using React                                 | 10%       | :white_check_mark:   |
| Sign up / sign in with Google               | 1%        | :white_check_mark:   |
| Chrome notification                         | 5%        | :small_red_triangle: |
| CSS animation                               | 2%        | :white_check_mark:   |
| Deal with code sent                         | 2%        | :white_check_mark:   |

> [!NOTE]
> Next.js is a framework built on React.

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
    <summary>Click here to expand</summary>

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

After adding the environement variables, run the development server:

```bash
npm run dev
# or
yarn run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## How to Use?
### Hompage
Route: `/`
As to now (2024-05-02), the hompage hasn't been done yet. When you visit the hompage, the only way to navigate is clicking the "Open DNDC" link in the top navbar, which takes you to `/signin`.

### Sign In Page

:warning: Hand Tool, Eyedropper Tool, and Zoom Tool currently **has no actual functionality**.

Hand Tool `H`
> Click-drag to move the canvas area if its size is larger than the container.

Eyedropper Tool `I`
> Click anywhere to pick up a color and set it to the current active color (fill or stroke).

Brush Tool `B`
> Click-drag on the canvas to draw strokes. The brush size is automatically adjusted based on pressure value for pointer devices that supports pressure.

| **Settings** | **Options**                                               |
| :----------: | :-------------------------------------------------------: |
| Stroke Color | Any valid HSL color. This property is shared globally.    |
| Brush Size   | `1` to `200`, with a step of 1. Defaults to `5`.          |
| Brush Shape  | `Circle`, `Square`, `Triangle`. **Temporarily disabled.** |

Eraser Tool `E`
> Click-drag on the canvas to erase the canvas with a selectable shape and size

| **Settings** | **Options**                                               |
| :----------: | :-------------------------------------------------------: |
| Eraser Size  | `1` to `200`, with a step of 1. Defaults to `10`.         |
| Eraser Shape | `Circle`, `Square`, `Triangle`. **Temporarily disabled.** |

Fill Tool `F`
> Click on the canvas to fill it with the fill color

| **Settings** | **Options**                                            |
| :----------- | :----------------------------------------------------: |
| Fill Color   | Any valid HSL color. This property is shared globally. |



## Bonus Function Description
### Key Control (tool change)
Switch to a canvas tool by key down. Keydown event listeners are attached in `initToolElements()` through `attachGlobalShortcuts()`, located in `assets/js/canvas.js`.
> [!NOTE]
> Text Tool's functionality is actually corrupted by this, therefore written into functions and detaches through `detachGlobalShortcuts()` when the input area is in focus.



## Changelog
### 2.0.0 (2024-03-30)
:rocket: **New**
- Eraser Tool
- Fill Tool - Fill the entire canvas with only one click
- Shape Tool - Create basic shapes by click-dragging, controllable by some extra keydown
- Import image - Import and direct paste images to canvas
- Export canvas options - User can now choose to export as PNG (w/ or w/o transparency) or JPG

:sparkles: **Improved**
- Tools are now written as classes extended from a base class. Switching event listeners of tools becomes easier to implement!
- A white `div` is shown behind the canvas instead for the background, leaving the canvas transparent. This solution has several advantages:
    - Restting the canvas needs only one line of `clearRect()`. No need to then `fillRect()` with white and mess with `fillStyle`.
    - Brush Tool and Eraser Tool can share the same DrawTool class, made possible by passing a different `compositeOperation`. Less code, less anger!
    - Able to export image with transparency.
- Automatically swap to Bezier interpolation when drawing too fast. This reduces the n-gon like shape for the curves drawn. (Powered by [Bezier.js](https://github.com/Pomax/bezierjs))

:bug: **Bugfix**
- Shapes stil have strokes even though `lineWidth` is set to 0
    - `CanvasRenderingContext2D.lineWidth` cannot be set to 0
    - Introduce a new flag `enableStroke`, set to true if the input range slider slides to 0
- Keydowns with control keys pressed also triggers tool change
    - Check for `e.altKey`, `e.ctrlKey`, `e.metaKey`, and `e.shiftKey` before searching match key