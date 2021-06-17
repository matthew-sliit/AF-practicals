@echo off
setlocal EnableExtensions EnableDelayedExpansion
:loop
echo.
echo  ============================================
echo ^|GET:1 ^| POST:2 ^| PUT:3 ^| DELETE:4 ^| exit:0 ^|
echo  ============================================
set /p option="Enter Option: "
IF "%option%"=="0" goto end
IF "%option%"=="1" goto get
IF "%option%"=="2" goto post
IF "%option%"=="3" goto put
IF "%option%"=="4" goto delete
:get
curl localhost:8080/posts
goto loop
:post
set /p name="Enter name: "
set /p desc="Enter desc: "
curl -X POST localhost:8080/posts -H "Content-type:application/json" --data "{\"name\": \"%name%\", \"description\": \"%desc%\"}"
goto loop
:put
set /p name="Enter id: "
set /p name="Enter new name: "
set /p desc="Enter new desc: "
curl -X PUT localhost:8080/posts/%id% -H "Content-type:application/json" --data "{\"name\": \"%name%\", \"description\": \"%desc%\"}"
echo putting to localhost
goto loop
:delete
set /p id="Enter id: "
curl -X DELETE localhost:8080/posts/%id%
goto loop
:end
echo Ending Program
endlocal