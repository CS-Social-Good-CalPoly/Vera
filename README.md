# The Vera Project

## Overview

The Vera Project is a student-designed website that focuses on the central goal of enhancing accessibility to mental health resources for Cal Poly students. This project seeks to provide a centralized repository of resources, including those available on campus, in the local community, and at the national level. Additionally, it serves as a platform for students to share and read personal stories related to their experiences with mental health. The overarching aim of The Vera Project is to create a supportive and informative environment that empowers students to navigate their mental health journey.

## Tech Stack

The Vera Project is built using the MERN stack, which is a popular choice for building web applications. Here's a brief overview of what each letter in MERN stands for:

- **M** - **MongoDB**: A NoSQL database that stores data in a flexible, JSON-like format.
- **E** - **Express.js**: A web application framework for Node.js that simplifies the creation of server-side applications and APIs.
- **R** - **React**: A JavaScript library for building user interfaces, enabling the creation of dynamic and responsive front-end applications.
- **N** - **Node.js**: A runtime environment that allows you to execute JavaScript on the server-side, making it an excellent choice for building scalable and fast applications.

This tech stack was chosen for its versatility, performance, and the ability to develop a full-stack web application seamlessly.

## Workflow

The development workflow for The Vera Project is structured to ensure effective collaboration and efficient code management. Follow these steps to contribute to the project:

1. **Switch to the Local Main Branch:**

   - Before starting a new task, switch to your local main branch using the following command:
     ```
     git checkout main
     ```
     FYI: You can see which branch you're currently in by doing `git branch`, and there'll be a asterisk next to the one you're on.
   - If Git warns about possible work conflicts when switching branches, either commit your changes or stash them to avoid data loss. To stash changes, use
     `git stash save "Your stash message"`. You can later apply your stashed changes when needed.

2. **Update from the Remote Main Branch:**

   - Execute `git pull` to ensure your local main branch is up-to-date with the latest changes from the remote main branch (production branch).
     ```
     git pull
     ```

3. **Create a New Task Branch:**

   - Create a new branch with a name related to the task you'll be working on:
     ```
     git checkout -b NewBranchName
     ```
     For example, if you're fixing a bug, you might name the branch "fix/bug-description."

4. **Work on Your Task:**

   - Make changes in your local branch related to the task. We recommend committing your progress every now and then so that
     if you, let's say, deleted all your code and exited your IDE...you would be able to recover your progress using Git. In case
     this happens to you, here's some useful commands to know:

     ```
     git log
     ```

     Outputs the commit history of your branch.

     ```
     git reset --hard <Commit_Hash_Here>
     ```

     Allows you to restore a specific version of your code.

   - **Running the code**
     - Open two terminals in VSCode. In the first terminal, do the following:
       ```
       cd backend
       ```
       If your task required changes to anything in the models, routes, or app.js files, you
       might need to also run the following command if you haven't applied the format-on-save shortcut:
       ```
       npm run format
       ```
       ```
       npm start
       ```
     - In the second terminal, do the following:
       ```
       cd frontend
       ```
       ```
       npm run format
       ```
       ```
       npm start
       ```

5. **Commit and Push Your Code:**

   - Once you've completed your task (including testing), commit your code and push it to the remote repository. Here's the whole shabang:

     - **Add the files with your changes:**

       Make sure you are in the root directory of the repository (when you do `ls`, it should list directories like backend, vera-react-app, etc).
       This command is to be used for any file you created, modified, or deleted:

       ```
       git add <path_to_file_here>
       ```

       We recommend doing git add for each file, even if it is tedious. We know that `git add .` exists, but this might
       end up adding some files which are not meant to be pushed (package.json would be a good example).

     - **Commit your changes:**

       ```
       git commit -m "Your commit message"
       ```

     - **Push your changes to the remote branch:**
       ```
       git push origin NewBranchName
       ```
       One neat shortcut you can instead do is simply enter `git push`. You will likely be met with a message to set up an upstream that looks something
       like this: `git push --set-upstream origin NewBranchName`. Just copy and paste what it tells you and then do `git push` right after. That way,
       any time you need to commit and push code on your new branch, you just need to do `git push` instead of `git push origin NewBranchName`.

   - Make sure to replace "Your commit message" with a meaningful description of your changes, and "your-branch-name" with the actual name of your branch.

6. **Make a Pull Request:**

   - When you're ready for us to look at your work, create a pull request (PR) on the project's repository.
   - Ensure that your PR provides as much detail as possible about the changes you've made.
   - Link the PR with the issue you worked on (look for and click on "Development" on the right side of the screen).
   - Your PR will have to be approved by us before merging. If there are changes we request you to make, follow section 7.

7. **Review and Make Edits:**

   - If feedback or alterations are requested, make the necessary changes in your branch. Re-push to the same branch as you work.
     Please do not make new PRs when you make new pushes, the existing PR will automatically get updated when you push changes.
     See section 8 if you are working on multiple tasks.

8. **Switch Back to the Previous Task Branch:**

   - If you're working on multiple tasks, switch back to the branch where you were working on a previous task and continue your work.

9. **Repeat the Process:**
   - Repeat this process for picking up new tasks or making additional contributions to the project.

This workflow is designed to maintain a clean and organized codebase and ensure that all contributions are thoroughly reviewed and tested before being integrated into the project. Collaboration and communication are key to the success of The Vera Project.
