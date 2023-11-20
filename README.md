# <p align="center">HetChat</p>
HetChat is an innovative mobile application developed by students from HETIC. The main goal of this project is to provide a real-time chat platform, offering a seamless and versatile communication experience.
        
## 🛠️ Tech Stack

| Front | Back | Websocket|
| -------- | -------- | -------- | 
| <img src="https://img.shields.io/badge/react_native-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB">   | <img src="https://img.shields.io/badge/fastify-%23000000.svg?style=for-the-badge&logo=fastify&logoColor=white">|<img src="https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101">
| <img src ="https://img.shields.io/badge/expo-1C1E24?style=for-the-badge&logo=expo&logoColor=#D04A37">| <img src="https://img.shields.io/badge/Docker-2496ED.svg?style=for-the-badge&logo=Docker&logoColor=white"> |

## Prerequisites
  
- Docker
- Node.js
- npm
- Expo
- React Native

## Features
- User authentication
- Create conversations with one or more participants
- Sending text messages, images and videos

## GIT process
### Merge feature branch into develop
Using the git command

```
git checkout develop
git pull
git checkout feature -branch
git pull
git rebase develop
git checkout develop
git merge --squash feature-branch
git commit -m "Merge commit"
```
## 🛠️Installation 
Create a `config.json` file in back and front and enter the IP address indicated by expo when launching the app (following the schema of the config.example.json file)

#### Then
In front folder do or copy and paste
```bash
npm i
```

In back folder do or copy and paste
```bash
npm i
```
## 🛠️ Launch
In front folder do or copy and paste
```bash
npm start
```

In back folder do or copy and paste
```bash
docker-compose up -d --build
npm start 
```

## ➤  Routes list
<details><summary>Click to expand</summary>

|HTTP|URL |Method|
| -------- | -------- | -------- |
| GET    | /getUser    | getUser   |
| GET        | /getOneUser   | getOneUser  |
| POST    | /login   | signIn   |
| GET        | /get-message-by-conv-id/:convId   | getMessageByConvId|
| GET        | /getOneMessage   | getOneMessage|
| POST    | /send-message   | sendMessage|
| GET        | /get-all-conv-by-user/:id   | getAllConvByUser|
| GET        |/getOneConv  | getOneConv|
| POST    | /createConv   | createConv|

        
</details>


---
## 🙇 Authors

#### Valentine Lefebvre
- Github: [@ValentineLefebvre](https://github.com/ValentineLefebvre)
#### Romain LHUILLIER
- Github: [@TisoOfficiel](https://github.com/TisoOfficiel)
#### Pauline Miranda       
- Github: [@polinzz](https://github.com/polinzz)
#### Herby NÉRILUS
- Github: [@Nerilus](https://github.com/Nerilus)
#### Adrien QUIMBRE
- Github: [@Doud75](https://github.com/Doud75)
#### Anthony RINGRESSI
- Github: [@anthony-rgs](https://github.com/anthony-rgs)
