# ITRex-Lab-Project
This project will create an electronic doctor's waiting list. The project includes the creation of two websites with working functionality and the connection of databases.

// TODO Добавить запись, что нужно также npm i websocket
How to use? There are several options:
  If you want to run the application, follow these instructions: 
    1. Сlone this repository.
    2. Open the cloned repository folder in the terminal.
    3. Run npm i
    4. Run npm start
    5. Open browser and go to the following links:
     1) http://0.0.0.0:3000/html/client.html
     2) http://0.0.0.0:3000/html/clinic.html

  Then emulate the doctor and the patient and watch the result :) 
    
  If you want to start Docker, follow these instructions:
    1. Open your terminal and enter the following commands:
     1) docker build . -t queue
     2) docker build . -t websocket
     3) docker-compose up
    2. Open browser and go to the following links:
     1) http://0.0.0.0:3000/html/client.html
     2) http://0.0.0.0:3000/html/clinic.html

  Then emulate the doctor and the patient and watch the result :) 

  If you want to run unit tests, follow these instructions:
    1. Сlone this repository.
    2. Open the cloned repository folder in the terminal.
    3. Run npm i 
    4. Go to the next directory: 'ITRex-Lab-Project/src/api/classes'
    5. Run this command: export NODE_ENV=dev && mocha --delay test.js

  You may not be able to run a test. You probably do not have mocha for bash.
   Open your terminal and type the following command: $ sudo apt install mocha


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

 2.0.0
  1) Изменена структура хранения клиентов в Redis (от строк к объектам)
  2) Изменена структрура проекта 
  3) Docker работает правильно (есть один вопрос)
  4) Добавлены конфиг файлы
  5) Исправлены ошибки с REST API
  
 2.0.1
  1) Подключена БД
  2) Временно не работает:
      1. inMemory storage(работает, но с ограничениями)
      2. Docker
      3. Tests

 2.0.2
  1) Временно не работает:
      1. Docker
  2) Добавлен scheduler
  3) API по стандартам REST
  4) Налажено общение между frontend - backend
  5) Работает валидация и проверка на существование при запросах
  6) Удален лишний код
  7) Код сделан чище

 2.0.3
  1) Добавлен пароль в базу данных
  2) Вся информация берется из конфиг файла

 2.0.4
  1) Удален весь inMemory, Redis, database 
  2) Redis используется только для хранения очереди(id пациента) использую осортированный set
  3) Немного измененна структура БД. Добавлены/удалены некоторые таблицы
  4) Изменился frontend:
      1. Добавлена таблица со всеми резолюциями на странице клиента
      2. Search as you type
      3. Добавлены страницы авторизации/аунтефикации
  5) Изменилась структура проекта
  6) Добавлено много новых маршрутов
  7) Временно не работает:
      1. Docker
      2. Tests
      3. Websoket
  

  2.0.5
   1) Fix bugs 