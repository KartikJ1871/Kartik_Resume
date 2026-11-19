KARTIK JADHAV — PORTFOLIO 2.1
================================

WHAT'S NEW
- Field Notes photo gallery with the 12 photos supplied for this update.
- Add photos directly from the website (no code editing).
- Drag-and-drop photo upload.
- Added photos are stored in this browser on this device using IndexedDB.
- View photos in a full-screen lightbox; use arrow keys to move between images.
- Delete any gallery photo using the × button on its card. This hides built-in photos in this browser.
- Manage added photos and remove your uploaded additions whenever you want.
- Original gallery photos are part of the website and are not deleted by the photo manager.

RUN ON WINDOWS 10/11
1. Extract the ZIP file.
2. Open the extracted Kartik_Jadhav_Portfolio_2 folder.
3. Double-click Run_Portfolio.bat.
4. Your browser opens http://localhost:8000.
5. Keep the black command window open while using the website.
6. To stop the local website, click the command window and press Ctrl+C.

REQUIREMENT
Python 3 is required only to run the tiny local web server. No pip packages,
Node.js, npm, or database installation is needed. If Python is not installed,
install it from https://www.python.org/downloads/ and enable "Add Python to PATH".

ADDING PHOTOS
- Click "Add photos" in the Field Notes gallery and select one or more images.
- Or drag image files into the dashed drop area.
- Your new photos persist in this browser/device. They are not automatically
  uploaded to the internet or shared with other devices.
- To see your saved additions later, start the site again using Run_Portfolio.bat
  in the same browser profile.
- Use the × button on any gallery card to hide that photo on this browser. Use "Manage added photos" to remove uploaded photos from local storage.

PORTABILITY
The 12 supplied gallery photos are in assets/gallery. Keep the assets folder
alongside index.html, script.js and styles.css.


ONLINE HOSTING — IMPORTANT
For GitHub Pages, Netlify, or Vercel, redeploy the COMPLETE contents of this
Kartik_Jadhav_Portfolio_2 folder (not only index.html). Keep the assets folder
at the same level as index.html. The resume must exist at:
assets/Kartik_Jadhav_Resume.pdf

The resume buttons now validate that the server returned a real PDF before
downloading it. If the PDF is missing from the deployed site, the page shows
an error instead of downloading an HTML 404 page with a .htm extension.
