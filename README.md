Appointment for teaching
------------------------


---
## 🚀 Quick start

1. You should first install gatsby onto your system
   ```
   npm install -g gatsby-cli
   ```

1.  **Open up the source files using a code editor.**

    Navigate into your new site’s directory, install, and start it up.

    ```
    git clone `githubURL`
    cd directory
    npm install
    gatsby develop
    ```  

1.  **Add your own Snipcart data!**

    Your site is now running at `http://localhost:8000`!

    Open the `my-shop-starter` directory in your code editor of choice and edit `gatsby-config.js` to change the API key to your own public test API key (you can find this in your Snipcart account).


---
## 📁 Important files

  There are a few important files to take note of:
  
  - `src/pages/index.js`  
    This file is the homepage of your shop. 

  - `src/templates/item.js`  
    This file is the template used for the programmatically generated item pages in your shop.

  - `src/components/layout.js`  
    This file provides a basic layout to all the pages of your shop.

  - `src/styles/theme.js`  
    This file is used by the styled-components package to provide a theme to the entire site. It contains three colours that are used throughout the site. To easily change the color scheme, you can change the colours in this file.

  - `src/styles/globalStyle.js`  
    This file is used by the styled-components package to reset styles and provide some basic global styling to your shop via the layout  file described above.

  - `content/items`  
    This **folder** contains all the markdown files representing items in your shop. Each item consists of a folder containing a markdown file (`index.md`) and an image. Edit or create more of these with the same markdown structure to change/add items to the shop.

---

TODOs:

- please convert the local file (see directory in `itmes`) based users render into a Conentful (or other cloud databased based render)

- Please add the registration page for initiatee (i.e Invitee)

- The initiator (i.e. Invitor) should be able to check the time slot availability for the Invitee (there should be one API about this, say /availableslots)

- The initiator (i.e. Invitor) invite request should detect the conflict (there should be one API about this, say /appointment)
