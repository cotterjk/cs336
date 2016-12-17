#ReactJS Frontend
Our page would be very straightforward and consist of only a few components. At the top of the page, a component box would display instructions such as "WHERE ARE YOU FROM?" Underneath that, another component box would display an image, such as a world map, where the user would click. These are components rather than hard-coded elements, so that as the user clicks, the image box and instruction box would progress through the series of questions. A button at the very bottom would allow the user to restart. A container component would also be implemented merely to contain the aforementioned three components.

[Design Screenshot](https://github.com/javinunger/cs336/blob/master/project/materials/design.png)

#MongoDB Backend
Collections for images, documents for clicks
Our Mongo database would collect and store the coordinates of a user’s mouse clicks on images. We plan to have a separate collection for each image, and have a click trigger the creation of a document within the collection corresponding to the image the user clicks on. The documents would contain the x and y coordinates of the mouse click. This way, to display where every user has clicked on, say, the GLOBE image, the page would read every document from the GLOBE collection, and display a marker for each set of x and y coordinates.
