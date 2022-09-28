# Сборка проекта на Gulp
Быстро настроить сборку вашего проекта на Gulp и писать код на:
- HTML5EmbedUseLinkSyntax
- CSS, SCSS, SASS
- JavaScript

## Функционал сборки
- минификация HTML
- компиляция препроцессоров SASS
- минификация CSS
- автоматическое добавление префиксов CSS
- преобразования кода ECMAScript 2015 + в обратно совместимую версию JavaScript с помощью Babel
- минификация JavaScript
- объединение нескольких файлов JavaScript в один
- сжатие изображений
- отслеживание новых изображений, которые еще не были сжаты
- отображение размеров файлов в терминале
- локальный сервер с автоматическим обновлением страницы при изменении файлов
- ...(еще не дописал)

## Input
|| HTML | Styles | Scripts | Images | Fonts |
|:---|:------:|:-----:|:----:|:-----:|:-----:|
| **Каталог** | src/pages/ | src/styles/, src/sass/ | src/scripts/ | src/images/ | src/fonts/
| **Расширение** | .html | .css, .scss, | .js | .png, .jpg, .jpeg, .gif, .svg | .eot, .ttf, .otf, .otc, .ttc, .woff, .woff2, .svg |

## Output
|| HTML | Styles | Scripts | Images | Fonts |
|:---|:------:|:-----:|:----:|:-----:|:-----:|
| **Путь** | dist/ | dist/styles/main.min.css, /main.css | dist/scripts/main.js | dist/images/ | dist/fonts |

## Зупуск:  
1. Склонировать или скачать ZIP файл  
2. В терминале перейти в каталог проекта  
3. Выполнить команду: npm install (должен быть установлен node.js)  
4. В задаче build выбрать css или scss
5. Писать свой код в каталоге src/
6. Выполнить команды: для development npm start, для production npm build
7. Писать свой код и наслаждаться автоматической сборкой проекта. 