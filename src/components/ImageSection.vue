<template>
  <section class="image-section">
    <div class="Masking-Layer">
      <img src="../img/Rectangle 14.png" alt="Masking Layer">
    </div>
    <div class="image-rider">
      <img src="../img/rider.png" alt="Rider">
    </div>
    <div class="Green-Screen">
      <img src="../img/Rectangle 10.png" alt="Green Screen">
    </div>
    <div class="bottom-right-image">
      <img src="../img/horse.png" alt="Horse">
    </div>
  </section>
</template>

<style scoped>
.container .image-section {
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;
}

.image-rider {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-40%, -50%);
  z-index: 7;
}

.image-rider img {
  width: 260px;
  height: 340px;
}

.Masking-Layer {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-40%, -50%);
  z-index: 8;
}

.Masking-Layer img {
  width: 260px;
  height: 340px;
}

.Green-Screen {
  position: absolute;
  top: calc(50% + 30px);
  left: calc(50% + 50px);
  transform: translate(-50%, -50%);
  z-index: 6;
}

.Green-Screen img {
  width: 310px;
  height: 320px;
}

.bottom-right-image {
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 2;
}

.bottom-right-image img {
  width: 350px;
  height: 225px;
}
</style>