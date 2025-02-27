<template>
  <footer class="stats-footer">
    <div>
      <span>36</span>
      <p>文章</p>
    </div>
    <div>
      <span>1.2k</span>
      <p>浏览</p>
    </div>
    <div>
      <span>365天</span>
      <p>运行时间</p>
    </div>
  </footer>
</template>

<style scoped>
.container .stats-footer {
  position: absolute;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 250px;
  padding-bottom: 5px;
}

.stats-footer div {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
  color: #47686EFF;
}

.stats-footer span {
  font-size: 24px;
  font-weight: bold;
  padding-bottom: 12px;
  font-family: 'SiYuanHeiTiB';
}

.stats-footer p {
  font-size: 12px;
  color: #557C83;
  font-family: 'SiYuanHeiTiR';
}
</style>