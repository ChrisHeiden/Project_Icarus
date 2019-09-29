# Project Icarus ![alt text](./server/public/images/logo.png)


Project Icarus is a web application that visualizes Twitter, Tumblr and Flickr content on the page. 

# Features!

  - filter by time
  - filter by location
  - remove a whole dataset 
  - shrink the dataset by removing the newest and oldest datasets
  - remove one item by right click
  - get extra information by hovering and left click
  - rearrange the dataset by year
  - chose a specific tag you wanna lookup
All items have a specific opacity that is dependent on the timestamp.
If you rearrange the dataset you can't use the filters; however, it gives you an overview of how often this specific tag has been used in a post in a year. The diameter of an item gives a hint about how often it has been used.

### Technology

Project Icarus uses a number of technologies:

* [React](https://reactjs.org/) - Cient side 
* [node.js](https://nodejs.org/en/) - evented I/O for the backend
* [Express](https://expressjs.com/) - fast node.js network app framework
* [socket.io](https://socket.io/) - create websockets for server-client communication
* [Tumblr Api](https://www.tumblr.com/privacy/consent?redirect=https%3A%2F%2Fwww.tumblr.com%2Fdocs%2Fen%2Fapi%2Fv2) - get tag specific data from Tumblr
* [Flickr Api](https://www.flickr.com/services/api/) - get tag specific data from Flickr
* [Twitter Api](https://developer.twitter.com/en/docs.html) - get tag specific data from Twitter
* [Axios](https://github.com/axios/axios) - fetch data from endpoints

### Installation

Icarus requires [Node.js](https://nodejs.org/).

Install the dependencies and start the server.
```sh
$ cd server
$ npm install
$ npm start
```

Install the dependencies and start the client.
```sh
$ cd client
$ npm install
$ npm start
```

Start the web application by open a browser and open
```url
$ http://localhost:3000
```

If you use Chrome, you get the best outcome. However, it depends on the resolution of the desktop. Unfortunately, the webpage isn't responsive yet.
