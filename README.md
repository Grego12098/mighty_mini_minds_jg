[Link to the Back End](https://github.com/Grego12098/mighty_mini_minds_backEnd)

[Demo for version 1](https://migthyminiminds.netlify.app/)

Weicome to Mighty Mini Minds, also known as MMM... 

We collaborated as a team of 6 to design and build a Full-stack mental health application for kids aged 7 to 12 within a 5-week timeframe, in order to help them improve their ability to express their emotions and communicate their feelings with others more effectively using guided journaling. They have the option to share their journal entries with their trusted person. 

In the works:
- Refactor our API and axios requests to work as intended with Supabase
- Encrpyt the data from the user's to ensure a higher level of security, and incorportate row level security into the database
- Refine our tests to align with these changes

[You can view our high fideilty prototype here](https://shorturl.at/bAHW4)

[Here's a video demo of the app](https://www.youtube.com/watch?v=MhEH8YmNl_Y&ab_channel=GM)

For more insight into our user research and design process, see the highlights below or [check out our presentation](https://www.canva.com/design/DAFo4zRd770/eyrbLyuqBd3gvLHkk7FnFA/view?utm_content=DAFo4zRd770&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink)

## Problem Statement
![problem_statement](./screenshots/problem_statement.png)
## User Research
![user_research](./screenshots/user_research.png)
## Safeguarding considerations
![safeguarding](./screenshots/safegaurding.png)
## Low Fidelity Wireframe
![low-fi_wireframe](./screenshots/low_fidelity_wireframe.png)
## Component Tree
![component_tree](./screenshots/component_tree.png)
## Design considerations
![accessibilty](./screenshots/accessibility.png)
![familiarity](./screenshots/familiarity.png)
![customisability](./screenshots/customisability.png)
## Tech Stack 
- We used Tailwind to set up our theme changer and responsive design and React Router to create a nested router to allow for pages with the Header and NavBar and for pages without them.
- We chose React Query to fetch data from our API, for it's easy syntax and improved error handling over Use effects, and Netlify as our CD for continous deployment. 
- For our Back end we used PostgreSQL and Express, as well as Sequelize as our ORM to handle the logic of interacting with our database, with the benefit of improved security against SQL injection. We used JWT and Bcrypt to handle our authentication instead of a 3rd party solution, in doing so we learnt a lot about authentication and security and also retained complete control over our user's data. 

![tech_stack](./screenshots/tech_stack.png)
![nested_router](./screenshots/nested_router.png)




