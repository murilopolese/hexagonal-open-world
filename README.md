# Hexagonal grid board
------------------------

This is the result of a study on hexagonal grids and Meteor pub/sub behaviour:
a generative multiplayer open world where you can walk around.

![Screenshot](http://i.imgur.com/AnU3n63.png?1)

Don't expect too much and test the [demo](https://fabulous-hex.herokuapp.com/).

## How it works?

- You are the red thing.
- You move by clicking on the hexagons around you.
- You can step on everything that is green.
- Blue is supposed to be water and you don't know how to swim so you can't step there. Deal with it.
- The greyish things are rocks and you don't know how to climb so you can't step there. Deal with it again.
- Purple things are other players.
- The brown things are the portals to other terrains.
- The big name with numbers on the side are that terrains name and it's coordinate in the world.

## To do

* Portal bug: You should not be able to click the portals without getting close enough
* Resize rows after render
* Fix movement bug: You can jump 2 tiles for some positions.
* Fix pub/sub: Should clean the previous subscriptions before resubscribe.
* Terrain generator: Improve terrain generation to don't put "portals" on impossible places.
* Terrain generator: Add other landscapes (dugeon, forest, desert)
* Security: You should not be able to modify your profile
* Security: You should not be able to see other people's personal info
