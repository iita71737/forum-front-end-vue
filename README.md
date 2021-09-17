![image info](https://github.com/iita71737/forum-front-end-vue/blob/dev-backend/public/pic1.PNG?raw=true)


## client side setup
```
git checkout dev-backend
```
```
npm install
```
```
npm run serve
```

### Server side setup

```
git clone https://github.com/ALPHACamp/forum-express.git 
```
```
cd forum-express
```
```
npm install
```
```
npm run dev
```

then, the server side is running on localhost:3000

### deploy setting
```
set deploy.sh file on root
```
```
set     publicPath: process.env.NODE_ENV === 'production'
        ? '/danlin-resume/'
        : '/',
in vue.config.js
```
```
run ./deploy.sh 
```
