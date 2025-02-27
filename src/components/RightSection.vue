<template>
  <div class="right-section">
    <Navbar />
    <MainHeader />
    <TextContent />
    <ImageSection />
    <StatsFooter />
    <NextPage />
  </div>
</template>

<script>
import Navbar from './Navbar.vue';
import MainHeader from './MainHeader.vue';
import TextContent from './TextContent.vue';
import ImageSection from './ImageSection.vue';
import StatsFooter from './StatsFooter.vue';
import NextPage from './NextPage.vue';

export default {
  components: {
    Navbar,
    MainHeader,
    TextContent,
    ImageSection,
    StatsFooter,
    NextPage
  }
};
</script>

<style scoped>
.right-section {
  z-index: 0;
  flex: 0 60%;
  background-color: black;
  padding: 250px 250px 250px 100px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
}
</style>