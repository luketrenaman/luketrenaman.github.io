# Wave editor for Brain Food
This is a wave editor for a game I'm working on, called Brain Food, where you use burgers to keep zombies at bay.
# How do I use it?
This editor allows you to add waves and elements, which can be used to create a full playthrough of the game. A wave has a **wave delay**, which is the default delay between enemies. Additionally, there are four types of elements:
* **Enemies**, which have their own **type**, **intensity**, **amount**, and optional **delay**.
* **Dialogue**, which has an **expression** and **text**.
* **Conditions**, which are used to determine dynamic behavior. All conditions require an **end condition** element, except for **wait x seconds** and **no zombies on screen**, as those are time based.
* **Animations**, which link to custom scripts within the game, causing certain effects. For example, one of these is `shake.tscn`, which will shake the game's background.
# How I made it
This project was made using react, with a component `App.js` managing all of the lower components such as `Wave.js` and `Element.js`. By using React, I was able to directly tie elements to the export data, making it extremely easy to export and import files.