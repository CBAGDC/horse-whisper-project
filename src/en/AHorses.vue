<template>
    <div class="ah-container">
        <div class="ah-bg"></div>
        <img src="../img/horse-1.png" alt="Horse 1" class="horse-image">
        <div class="text-ah">
          <p class="ah-p1">Knowledge of</p>
          <p class="ah-p2">horses.</p>
          <p class="ah-p3">Here I will introduce the way <br />
            horses communicate with each <br />
            other, the psychological healing <br />
            effect of horses and why we love <br />
            horses.</p>

            <a href="#" class="more-link" >more &gt;</a>
        </div>
    </div>
</template>



<style scoped>
/* 引入得意黑字体 */
@font-face {
    font-family: 'DeYiHei';
    src: url('../fonts/SmileySans-Oblique.otf') format('opentype');
    font-weight: normal;
    font-style: normal;
}

body, html {
    margin: 0;
    padding: 0;
}

.ah-container {
    position: relative;
    z-index: 0;
    display: flex;
    justify-content: space-between;
    background-color: #f0f0f0;
    width: 100%;
    min-height: 100vh;
    /* 确保容器高度至少撑满视口高度 */
}

.ah-bg {
    position: absolute;
    bottom: 0;
    left: 50px;
    width: 700px;
    height: 380px;
    background-color: #3aaca7;
    z-index: 1;
}

.horse-image {
    position: absolute;
    bottom: 0;
    left: 80px;
    width: 700px;
    height: 740px;
    z-index: 1;
}

.text-ah {
  position: absolute;
        top: 50px;
        right: 0;
        width: 800px;
        height: 600px;
        z-index: 2;
        font-family: 'DeYiHei';    
}

.text-ah .ah-p1{
  position: absolute;
    top: 100px;
    right: 360px;
    color: black;
    font-size: 65px;
    
  }

  .text-ah .ah-p2 {
  position: absolute;
  top: 180px;
  right: 505px;
    color: #557c83;
    font-size: 65px;
  }

  .text-ah .ah-p3 {
  position: absolute;
  top: 260px;
  right: 300px;
  color: black;
  font-size: 32px;

  }


.more-link {
  position: absolute;
      bottom: 40px;
      right: 300px;
      color: #557c83;
      font-size: 30px;
      text-decoration: none;

}

/* 响应式设计 */
@media (max-width: 768px) {
    .container {
        flex-direction: column;
        align-items: center;
    }
    .hk-bg, .horse-image {
        width: 100%;
        height: auto;
        left: 0;
    }
    .text-content {
        position: absolute;
        left: 0;
        right: 0;
        align-items: center;
        text-align: center;
    }
    .title, .subtitle, .description, .more-link {
        text-align: center;
    }
}
</style>