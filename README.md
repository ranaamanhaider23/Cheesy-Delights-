# ChessyDelights — Food-only website

A responsive food menu website with WhatsApp ordering, category filters, QR codes, party deals, and an interactive 360° 3D viewer shell.

## 360° viewer: important asset requirement
The viewer uses Google's `<model-viewer>` web component. It supports mouse drag and mobile touch drag, zoom and orbit controls, but **actual food 3D model files are not included**. The viewer is not pretending that a rotating emoji/photo is real 3D.

### Test a model on your device
1. Open the site in a modern browser with internet access.
2. Scroll to **Explore in 360°**.
3. Choose a food category, then tap **Upload a 3D food model**.
4. Select a genuine `.glb` or `.gltf` model. Drag on the viewer to rotate it.

### Add models to the live GitHub Pages website
1. Create an `assets` folder in this project.
2. Add properly licensed model files such as `burger.glb`, `pizza.glb`, `pasta.glb`, etc.
3. In `script.js`, uncomment/edit the `hostedFoodModels` map to point to those files, e.g. `burger: 'assets/burger.glb'`.
4. Commit and push the files to GitHub. Keep model file sizes reasonable for mobile users and ensure any external model assets are licensed for your use.

A `.jpg` or `.png` photo cannot become a true 3D model just by adding it to this viewer. To create true 3D, obtain a 3D scan/model (GLB/GLTF) or a series of photos for a separate multi-view photo-spin implementation.

## Publish on GitHub Pages
Upload/replace `index.html`, `styles.css`, `script.js`, and `README.md` in your repository. GitHub Pages serves the static site; no backend is required. QR generation and model-viewer load external libraries, so those features need internet access.

## Contact
WhatsApp: 0319 4249341 (`+92 319 4249341`)
Location: Satiana Road, Saleemi Chowk, Near Punjab Lab
Slogan: **MORE CHEESE. MORE HAPPINESS.**
