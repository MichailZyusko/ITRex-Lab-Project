# ITRex-Lab-Project
This project will create an electronic doctor's waiting list. The project includes the creation of two websites with working functionality and the connection of databases.

How to use? There are several options: 
  1. Open the current directory in a terminal and type in the command "npm start". Then open browser and go to the following links:
    1) http://localhost:3000/api/html/client.html
    2) http://localhost:3000/api/html/clinic.html
    
  2. Open your terminal and enter the following commands:
   1) docker build . -t queue
   2) docker build . -t websocket
   3) docker-compose up
 After that, see step one. Enjoy)
  
Then emulate the doctor and the patient and watch the result :) 

If you have any questions, feel free to ask me on the discord

Versions:
 1.0.0
  1) Создание проекта. Новые файлы .html, .css, .js . Полностью рабочий функционал
  2) Сервер на express
  3) Хранение данных в localStorage
  4) Добавление websocket для синхронизации данных на двух сайтах

 1.1.0
  1) Новый дизайн для двух сайтов. 
  2) Переделана структура и логика работы программы
  3) Хранение данных на сервере в ОЗУ компьютера. POST, GET запросы для извлечения информации
  4) Добавлены случайные клиенты, которые время от времени записываются на прием (каждые 10-15 секунд)
  5) Добавлена страница для выбора требуемого сайта

 1.1.1
  1) Добавлено "lint": "eslint public/js --ext .js" в package.json
  2) Добавлено TTL (Time To Life) для пациентов
  3) Немного изменен дизайн для стартовой страницы
  4) Очередь разбита на классы

 1.1.2
  1) Новая структура проекта
  2) Минорные изменения кода
  3) Удалена уязвимость с перезагрузкой страницы и удалением текущего пациента доктора

 1.1.3
  1) Текущий пациент находиться на сервере а не в localstorage
  2) Добавлены функция, которая исользует замыкание для создние разных маршрутов для HTTP запросов
  3) Мионорные изменения кода
  4) Добавлена валидация(частично)
  5) Выделил обработчики для HTTP Req: Validate, Adapt, Process on middleware
  6) Добавил красивое и понятное логирование
  
 1.1.4
  1) Добавлен докер
  2) Код стал чище
  3) Вынес websocket server в отдельную папку т поднимаю там отдельный контейнер
  
 1.1.5
  1) Удален лишний код
  2) Код сделан чище
  3) Добавлен обработчик ошибок

 1.1.6
  1) Добавлен Redis
  2) Изменена структура проекта
  3) inMemory storage теперь Map, а не Array
  4) Временно не работает Docker :(
