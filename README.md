# Hexagonal grid board
------------------------

This is the result of a study on hexagonal grids and Meteor pub/sub behaviour: 
a generative multiplayer open world where you can walk around.

![Screenshot](http://i.imgur.com/AnU3n63.png?1)

## To do

* Portal bug: You should not be able to click the portals without getting close enough
* Resize rows after render
* Fix movement bug: You can jump 2 tiles for some positions.
* Fix pub/sub: Should clean the previous subscriptions before resubscribe.
* Terrain generator: Improve terrain generation to don't put "portals" on impossible places.
* Terrain generator: Add other landscapes (dugeon, forest, desert)
* Security: You should not be able to modify your profile
* Security: You should not be able to see other people's personal info
