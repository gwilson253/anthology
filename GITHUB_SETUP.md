# How to Push to GitHub

Since you have an existing project capable of being pushed, follow these steps:

1.  **Log in to GitHub** and create a new repository: [https://github.com/new](https://github.com/new)
    *   **Name:** `anthology`
    *   **Description:** "Digital catalogue of Greg Wilson's musical works"
    *   **Public/Private:** Your choice.
    *   **Initialize:** Do **NOT** check "Add a README", "Add .gitignore", or "Choose a license". We already have these. Create an **Empty Repository**.

2.  **Copy the Repository URL** provided by GitHub (e.g., `https://github.com/YourUsername/music-hosting-app.git`).

3.  **Run these commands** in your terminal inside this folder:

    ```bash
    # Link your local repo to the new GitHub repo
    git remote add origin <PASTE_YOUR_GITHUB_URL_HERE>

    # Rename the branch to 'main' if it isn't already
    git branch -M main

    # Push your code
    git push -u origin main
    ```

4.  **Done!** Refresh your GitHub page to see your code.
