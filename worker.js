
// function onmessage(e){
//   console.log("onmessage");
// }

// console.log("Worker self", self);


self.addEventListener('install', function (event) {
  // console.log("Worker addEventListener install", event);
})
 

// self.addEventListener('onnotificationclick', function (event) {
//   console.log("Worker addEventListener onnotificationclick", event);
// })


// self.addEventListener('notificationclick', function (event) {
//   console.log("Worker addEventListener notificationclick", event);
// })

self.onnotificationclick = function(NotificationEvent){
  // console.log("Worker notificationclick", NotificationEvent);
}

self.onmessage = function(event){
  // console.log("Worker onmessage", event);
}


