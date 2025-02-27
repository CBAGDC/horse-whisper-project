<template>
    <div class="ma-container">
        <div class="ma-header">
            <p>The Story of&nbsp;</p>
            <p>Me and Horses</p>
        </div>
        <div class="ma-sections">
            
                <div class="ma-content">
                    <p class="m1">Process</p>
                    <p class="m2">Our process has been <br> carefully built over years to <br>ensure quality and speed.</p>
                    <img src="../img/MaHorses-3.png" alt="Process Image">
                </div>
     
                <div class="ma-content">
                    <div class="image-container">
                        <img src="../img/MaHorses-1.png" alt="Innovation Image 1">
                        <img src="../img/MaHorses-2.png" alt="Innovation Image 2">
                    </div>
                    <p class="m1">Innovation</p>
                    <p class="m2">We are passionate about <br>innovation. It comes first in <br>every project we take on.</p>
                </div>
         
                <div class="ma-content">
                    <img src="../img/MaHorses-4.png" alt="Time Image">
                    <p class="m1">Time</p>
                    <p class="m2">We never rush, but are <br>always timely. We’re yet to <br>miss a deadline.</p>
                    <a href="#" class="ma-more">more &gt;</a>
                </div>
        </div>
    </div>
</template>

<style scoped>

* {
  margin: 0;
  padding: 0;
}
/*引入得意黑字体*/
@font-face {
  font-family: 'DeYiHei';
  src: url('../fonts/SmileySans-Oblique.otf') format('woff2');
  font-weight: normal;
  font-style: normal;
}
.ma-container {
  position: relative;
  z-index: 0;
  background-color: #f0f0f0;
  width: 100%;
  min-height: 100vh;
  overflow: hidden; /* 隐藏滚动条 */
}
.ma-header {
  display: flex;
  text-align: left;
}
.ma-header p {
  position: absolute;
  z-index: 1;
  font-size: 52px;
  top: 50px;
  font-family: 'DeYiHei';
  word-spacing: 5px;
  letter-spacing: 3px;
}
.ma-header p:nth-child(1) {
  left: 70px;
  color: black;
}

.ma-header p:nth-child(2) {
  left: 360px;
  color: #557c83;
}

.ma-sections {
    display: flex;
    gap: 100px; /* 添加空隙 */
    justify-content: center; /* 水平居中 */
    flex-wrap: wrap;
    margin-top: 165px;
}

.ma-content {
    width: 325px;
    height: 550px;
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    position: relative; /* 添加相对定位 */
}

.ma-content img {
  max-width: 100%;
  width: 100%;
  height: 320px;
}

.ma-content p, .ma-content a {
  position: relative;
  margin: 20px auto;
  line-height: 1.5;
  z-index: 2;
}

.ma-content .m1 {
  font-size: 20px; 
  margin-top: 40px;
  margin-left: 40px;
}

.ma-content .m2{
  font-size: 16px; 
  margin-top: 10px;
  margin-left: 40px;
}

.ma-content a {
  position: absolute;
  bottom: 20px;
  right: 20px;
  color: #557c83;
  text-decoration: none;
}

.image-container {
  position: relative;
  width: 100%;
  height: 320px;
}

.image-container img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.image-container img:nth-child(1) {
  z-index: 1;
}

.image-container img:nth-child(2) {
  z-index: 2;
}

.ma-content img:nth-child(1) {
    position: absolute; /* 修改为绝对定位 */
    bottom: 0;
    left: 0;
    z-index: 1;
}

.ma-content img:nth-child(3) {
    position: absolute; /* 修改为绝对定位 */
    bottom: 0;
    left: 0;
    z-index: 2;
}

.ma-more {
  position: absolute;
  top: 20px;
  right: 20px;
  font-family: 'DeYiHei';
  font-size: 24px;
  color: #557c83;
  text-decoration: none;
}
</style>