# Marine-Analysis-Teacher

## Project info
Welcome to MAT (Marine Analysis Teacher)!
This project is a kiosk-friendly web app for aquatic museums who want to give their younger visitors (ages 6 ~ 8) a fun and interactive learning experience at their marine biology exhibits.

Examples of Kiosks (large screens on the walls) at the Toronto Holocaust Museum
<img width="1024" height="683" alt="image" src="https://github.com/user-attachments/assets/504558d7-2f86-4bc7-bdb6-2ae3de7f1788" />

Kiosk Integration Tutorial:

**Create a dedicated user account:** Create a new user account on the device, not an administrator, and set it to auto-login without a password.

**Disable sleep and locking:** Adjust the system settings to prevent the device from sleeping or locking automatically.

**Disable other functions:** Disable unnecessary ports and settings to prevent users from exiting the kiosk environment. 

**Launch in kiosk mode:** Set the web browser (e.g., Chrome, Edge) to launch automatically when the kiosk user logs in.

**Use command-line arguments:** Use the kiosk mode command-line argument along with the URL to force the browser to open the web app in a full-screen, locked-down environment.

**Hide unnecessary elements:** Include additional command-line options to hide the address bar and other interface elements.

**Optional:**
Use a dedicated kiosk browser: Install and configure a dedicated kiosk browser application, such as Fully Kiosk Browser or a Linux-based distribution like Porteus-kiosk, which is designed specifically for this purpose. 

**Youtube Tutorial by Gary Cruz Dot Com**
https://youtu.be/kgaWVsUPaV0?si=OaaDJWbQfAmHuDZy

## User eXperience:
The kisok loads up a simple Homepage with two simple buttons at the top: **"Museum Learning Experience"** and **"Marine Sound Analysis"**

### Museum Learning Experience
This is the main part of the user's learning journey.
The user will navigate through a total of 4 modules each with a different topic of marine biology.

Each module will introduce different characters who will accompany the user through their learing journey!
These friends include: Danny the Dolphin, Tessa the Turtle, Kai the Otter, Oillie the Octopus, and more.

At the end of each module, there will be a simple quiz that will help reinforce the user's learning, as well as unlocking the next module.

### Marine Sound Analysis (MSA)
This is a tool created for analyzing pre-recorded marine ecosystem audio to determine a general score out of 100 regarding the healthiness of the marine ecosystem.
the Marine Sound Analysis tool pairs well with the first module of the Museum Learning Experience, after users become familar with how certain sounds can give clues to marine ecosystem health.

After a supported audio file is uploaded, MSA uses an algorithm to judge the ecosystem's health weighing in various factors such as:
- Biophony (biological sounds: whale calls, dolphin clicks, snapping shrimp activity, etc.)
- Anthrophony (human-made sounds: Ship engines, drilling, sonar)
- Sound Diversity

Note that this tool is **not fool-proof**, it is simply a fun way for young learners to apply what they've learned during their Museum Learning Experience.

## Which Sustainable Goals for Development (UNITED NATIONS) Does MAT Cover?
MAT blends two goals together seamlessly
- Quality Education
- Life Below Water

### Why is This a Great Blend?
Mixing a very well-known topic like quality education along with a less-popular topic like life below water helps create this balance where the lesser-known goal is able to garner more attention.

## What technologies/stack are used for this project?

This project is built with:

- Vite
- TypeScript
- Javascript
- React
- Tailwind CSS
- HTML
