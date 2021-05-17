 
   $(document).ready(function()
   {
      // Запуск api комет сервера
      CometServer().start({dev_id: 15 }) // Идентификатор разработчика на comet-server.ru

      // Запуск чата. Передаём ему элемент в котором надо создать окно чата.
      htmljs_Chat_Init( $("#html-chat") )
   });