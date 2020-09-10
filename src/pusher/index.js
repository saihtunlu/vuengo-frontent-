import Pusher from "pusher-js";
// Enable pusher logging - don't include this in production
Pusher.logToConsole = false;

var pusher = new Pusher("52dfa0f74320dffea202", {
  cluster: "ap1",
});

export default pusher;
