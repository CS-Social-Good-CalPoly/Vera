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
   - If Git warns about possible work conflicts when switching branches, either commit your changes or stash them to avoid data loss. To stash changes, use:
     ```
     git stash save "Your stash message"
     ```
     You can later apply your stashed changes when needed.

2. **Update from the Remote Main Branch:**
   - Execute `git pull` to ensure your local main branch is up-to-date with the latest changes from the remote main branch (production branch).

3. **Create a New Task Branch:**
   - Create a new branch with a name related to the task you'll be working on. For example, if you're fixing a bug, you might name the branch "fix/bug-description."

4. **Work on Your Task:**
   - Make changes in your local branch related to the task. Use `git push` to push your changes to the remote branch to facilitate collaboration.

5. **Commit and Push Your Code:**
   - Once you've completed your task (including testing), commit your code and push it to the remote repository. Here's how you can do it:

     - **Add the files with your changes:**

       Make sure you are in the same directory as your file-to-add.
       This command is to be used for any file you created, modified, or deleted:
       ```
       git add file-name
       ```
       We recommend doing git add for each file, even if it is tedious. We know that git add . exists, but this might
       end up adding some files which are not meant to be pushed (package.json would be a good example).

     - **Commit your changes:**
       ```
       git commit -m "Your commit message"
       ```

     - **Push your changes to the remote branch:**
       ```
       git push origin your-branch-name
       ```
   - Make sure to replace "Your commit message" with a meaningful description of your changes, and "your-branch-name" with the actual name of your branch.

6. **Make a Pull Request:**
   - When you're ready to merge your changes into the main branch, create a pull request (PR) on the project's repository.
   - Ensure that your PR provides a clear and concise description of the changes you've made.
   - Your PR will be reviewed by other contributors, and any necessary discussions or adjustments will be made before merging.

7. **Review and Make Edits:**
   - If feedback or alterations are requested, make the necessary changes in your branch.

8. **Switch Back to the Previous Task Branch:**
   - If you're working on multiple tasks, switch back to the branch where you were working on a previous task and continue your work.

9. **Repeat the Process:**
   - Repeat this process for picking up new tasks or making additional contributions to the project.

This workflow is designed to maintain a clean and organized codebase and ensure that all contributions are thoroughly reviewed and tested before being integrated into the project. Collaboration and communication are key to the success of The Vera Project.
