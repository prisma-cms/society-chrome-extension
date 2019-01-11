



function startWebWorkers() {



  // chrome.webNavigation.onCompleted.addListener(function () {
  //   alert("This is my favorite website!");
  // }, { url: [{ urlMatches: 'https://www.google.com/' }] });

  // console.log("global.client", window.client);


  const {
    client,
    gql,
  } = window;


  // chrome.bookmarks.onCreated.addListener(function() {
  //   console.log("onCreate");
  //   // do something
  //   alert("Sdfsdf");
  // });
  // alert("Sdfsdf");

  // return;
  // console.log("onInstalled fetch", fetch);



  var generic = function (e) {

  };


  function createWorker(fn) {
    // var blob = new Blob(['self.onmessage = ', fn.toString()], { type: 'text/javascript' });
    // var url = URL.createObjectURL(blob);

    let url = "./worker.js";



    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register(url, {
        // scope: './'
      }).then(function (registration) {


        const {
          active,
        } = registration;


        registration.addEventListener("activate", (event) => {


        })

        var serviceWorker;


        if (registration.installing) {
          // serviceWorker = registration.installing;
          // document.querySelector('#kind').textContent = 'installing';
        } else if (registration.waiting) {
          // serviceWorker = registration.waiting;
          // document.querySelector('#kind').textContent = 'waiting';
        } else if (registration.active) {
          serviceWorker = registration.active;
          // document.querySelector('#kind').textContent = 'active';
        }



        async function showNotification(title, options = {}) {

          window.MyOpen = function (event) {
            console.log("MyOpen", event);
          }

          MyOpen = function (event) {
            console.log("MyOpen 2", event);
          }


          // let {
          //   ac
          // } = options;


          const actions = {
            openWindow: (event) => {

              const {
                data,
              } = event.target;

              const {
                url,
              } = data || {}

              if (!url) {
                return false;
              }

              // window.open(url, "/url");
            },
          }


          options = {
            icon: "public/modx_128.png",
            ...options,
            vibrate: [300, 100, 400],
            // actions: [{
            //   action: 'MyOpen',
            //   title: "Открыть",
            // }],
            actions: undefined,
            // data: {
            //   dfsdf: "DSfsdf",
            // },
            // data: {
            //   action: "openMessage",
            // },
          }



          // let notification = await registration
          //   .showNotification(title, options)
          //   ;

          let widget = new Notification(
            title,
            options,
          );


          widget.addEventListener("click", event => {

            const {
              data,
            } = event.target;

            const {
              action,
            } = data || {}


            try {
              // event.target.data.action()

              action && actions[action] && actions[action](event);

            }
            catch (error) {
              console.error(error);
            }

          });

          widget.addEventListener("close", event => {
          });

        }


        if (serviceWorker) {

          registration.addEventListener("activate", (event, data) => {


          });

          // logState(serviceWorker.state);
          serviceWorker.addEventListener('statechange', function (e) {
            // logState(e.target.state);
          });


          serviceWorker.addEventListener("activate", (event, data) => {


          });


          let subscriptions = []



          /**
           * Подписываемся на новые сообщения
           */
          if (client) {



            /**
             * Поулчаем текущего пользователя
             */
            const me = gql`
              query me{
                user: me{
                  id
                  username
                }
              }
            `;


            client.query({
              query: me,
              variables: {},
            }).then(r => {


              const {
                user: currentUser,
              } = r && r.data || {};


              /**
               * Если не был получен, возвращаем ошибку.
               */
              if (!currentUser) {

                let body = "Авторизуйтесь и обновите приложение.";


                let options = {
                  body,
                  vibrate: [300, 100, 400],
                }


                showNotification("Не был получен пользователь", options);

                return;
              }
              else {

                const {
                  id: currentUserId,
                } = currentUser;

                /**
                 * Получаем уведомления
                 */



                const noticesConnection = gql`
                  query noticesConnection{
                    objectsConnection: noticesConnection{
                      aggregate{
                        count
                      }
                    }
                  }
                `;


                const noticesRequies = async () => {
                  client.query({
                    query: noticesConnection,
                    variables: {},
                    // fetchPolicy: "network-only",
                    fetchPolicy: "no-cache",
                  }).then(r => {


                    const {
                      objectsConnection,
                    } = r && r.data || {};

                    const count = objectsConnection && objectsConnection.aggregate.count || 0;


                    const {
                      browserAction,
                    } = chrome || {};


                    if (browserAction) {

                      const text = count.toString() || "";

                      browserAction.setBadgeText({
                        text: text,
                      })
                      browserAction.setBadgeBackgroundColor({
                        color: count > 0 ? "#FF0000" : "rgb(103, 210, 113)",
                      });
                    }

                  });
                }

                noticesRequies();


                /**
                 * Подписываемся на уведомления
                 */
                const subscribeNotices = gql`
                  subscription notice (
                    $where: NoticeSubscriptionWhereInput
                  ){
                    response: notice(
                      where: $where
                    ){
                      mutation
                      node {
                        id
                        createdAt
                        User {
                          id
                          createdAt
                          fullname,
                          username,
                        }
                        CreatedBy {
                          id
                          fullname,
                          username,
                        }
                        ChatMessage{
                          id
                          contentText
                          Room {
                            id
                            name
                          }
                        }
                        ChatRoomInvitation{
                          id
                          ChatRoom{
                            id
                            name
                          }
                        }
                      }
                    }
                  }
                `;

                client
                  .subscribe({
                    query: subscribeNotices,
                    variables: {
                      where: {
                      },
                    },
                  })
                  .subscribe({
                    next: (result) => {


                      // client.reFetchObservableQueries();

                      noticesRequies();

                      const {
                        data: {
                          response: {
                            mutation,
                            node: notice,
                          },
                        },
                      } = result;



                      if (mutation !== "CREATED" || !notice) {
                        return;
                      }



                      const {
                        ChatMessage,
                        User,
                        CreatedBy,
                      } = notice;


                      const {
                        id: userId,
                        fullname,
                        username,
                      } = User || {};


                      const {
                        id: CreatedByid,
                        fullname: CreatedByFullname,
                        username: CreatedByUsername,
                      } = CreatedBy || {};


                      if (CreatedByid === currentUserId) {
                        return;
                      }

                      /**
                       * Пришло новое сообщение
                       */
                      if (ChatMessage) {

                        const {
                          id: messageId,
                          contentText,
                          Room: ChatRoom,
                        } = ChatMessage || {};

                        const {
                          id: chatRoomId,
                        } = ChatRoom || {};

                        let title = `Новое сообщение ${CreatedBy ? `от ${CreatedByFullname || CreatedByUsername}` : ""}`;
                        let body = contentText;



                        if (body) {

                          window.MyOpen = function (event) {
                            console.log("MyOpen", event);
                          }

                          const url = chatRoomId ? `https://modxclub.ru/chat-rooms/${chatRoomid}` : `https://modxclub.ru/chat-messages/${messageId}`;

                          let options = {
                            body,
                            vibrate: [300, 100, 400],
                            // actions: [{
                            //   action: 'MyOpen',
                            //   title: "Открыть",
                            // }],
                            // data: {
                            //   action: function (event) {

                            //     window.open("https://modxclub.ru", "crm-chat");

                            //   },
                            // },
                            data: {
                              action: "openWindow",
                              url,
                            },
                          }

                          showNotification(title, options);

                        }

                      }



                      return;


                    },
                    error(error) {
                      console.error('subscribeMessages callback with error: ', error)
                    },
                  });

                showNotification("Приложение активировано");

              }

              return;


            })
              .catch(error => {
                console.error(error);

                showNotification("Ошибка выполнения запроса");

              });




          }

          else {
            showNotification("Не был получен клиент");

            return;
          }







        }
      }).catch(function (error) {
        // Something went wrong during registration. The service-worker.js file
        // might be unavailable or contain a syntax error.
        console.error("Error", error);
      });
    } else {
      // The current browser doesn't support service workers.
      console.error("No serviceWorker");
    }

  }

  createWorker(generic);


}


chrome.runtime.onInstalled.addListener(function () {
  // ERROR! Events must be registered synchronously from the start of
  // the page.


  startWebWorkers();



  chrome.webNavigation.onCompleted.addListener(function () {
    // alert("This is my favorite website!");

    // const {
    //   document,
    // } = window;


    // document.addEventListener("DOMContentLoaded", () => { 
    // });

    // document.addEventListener("click", event => { 
    // });




  });

  chrome.webNavigation.onDOMContentLoaded.addListener(function () {
    // alert("This is my favorite website!");


    const {
      document,
    } = window;


  });

});


chrome.runtime.onStartup.addListener((e) => {

  startWebWorkers();

});

chrome.runtime.onSuspend.addListener((e) => {
});

chrome.runtime.onConnect.addListener((e) => {
});


chrome.runtime.onConnectExternal.addListener((e) => {
});


chrome.runtime.onMessage.addListener((e) => {
});

chrome.runtime.onMessageExternal.addListener((e) => {
});

chrome.runtime.onRestartRequired.addListener((e) => {
});


