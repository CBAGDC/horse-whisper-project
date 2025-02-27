<template>
    <div class="container">
        <div class="text">
            <p>The Story</p>
            <p>of</p>
            <p>the riders</p>
        </div>
        <div class="right">
            <img src="../img/rider-k.png" alt="Rider on horse" class="float-img">
            <p class="bg-color"></p>
            <a href="#" class="mp-more">more &gt;</a>
        </div>
    </div>
</template>

<style scoped>
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    /*引入得意黑字体*/
    @font-face {
        font-family: 'DeYiHei';
        src: url('../fonts/SmileySans-Oblique.otf') format('woff2');
        font-weight: normal;
        font-style: normal;
    }

   .container {
        z-index: 0;
        position: relative;
        justify-content: space-between;
        background-color: #f0f0f0;
        padding: 20px;
        width: 100%;
        min-height: 100vh;
        /*确保容器高度至少撑满视口高度*/
    }
    .text {
        position: absolute;
        left: 180px;
        top: 150px;
    }

   .text p {
        font-family: 'DeYiHei';
        font-size: 100px;
        color: black;
        margin: 10px;
    }
    .text p:nth-child(3){
        color: #557c83;
    }

    /* 为图片添加类名并设置样式 */
   .float-img {
        z-index: 2;
        position: absolute;
        right: 130px; /* 距离右边框20px，可根据需求调整具体距离值 */
        bottom: 0; /* 距离下边框20px，可根据需求调整具体距离值 */
        width: 500px;
        height: 650px;
    }

    /* 为背景色的p元素添加类名并设置样式 */
   .bg-color {
        z-index: 1;
        position: absolute;
        right: 90px; 
        bottom: 0; 
        width: 750px;
        height: 370px;
        background-color: #557c83;
    }
    .mp-more {
        position: absolute;
        right: 100px; 
        top: 130px;
        color: #557c83;
        font-family: 'DeYiHei';
        font-size: 36px;
        text-decoration: none;        
    }
</style>