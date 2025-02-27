<template>
  <div class="main">
    <div class="login-register">
      <h2>{{ isLogin ? '登录' : '注册' }}</h2>
      <form @submit.prevent="handleSubmit">
        <div v-if="isLogin">
          <label for="login-username">用户名:</label>
          <input type="text" id="login-username" v-model="loginUsername" required />
          <label for="login-password">密码:</label>
          <input type="password" id="login-password" v-model="loginPassword" required />
        </div>
        <div v-else>
          <label for="register-username">用户名:</label>
          <input type="text" id="register-username" v-model="registerUsername" required />
          <label for="register-password">密码:</label>
          <input type="password" id="register-password" v-model="registerPassword" required />
          <label for="confirm-password">确认密码:</label>
          <input type="password" id="confirm-password" v-model="confirmPassword" required />
        </div>
        <button type="submit">{{ isLogin ? '登录' : '注册' }}</button>
      </form>
      <p @click="toggleForm">{{ isLogin ? '没有账号？去注册' : '已有账号？去登录' }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLogin: true,
      loginUsername: '',
      loginPassword: '',
      registerUsername: '',
      registerPassword: '',
      confirmPassword: ''
    };
  },
  methods: {
    toggleForm() {
      this.isLogin = !this.isLogin;
    },
    handleSubmit() {
      if (this.isLogin) {
        this.login();
      } else {
        this.register();
      }
    },
    async login() {
      try {
        const response = await fetch('http://j.cwebcrm.cn/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: this.loginUsername,
            password: this.loginPassword
          })
        });
        const data = await response.json();
        console.log(data);
        // 处理登录成功后的逻辑
      } catch (error) {
        console.error('登录失败:', error);
      }
    },
    async register() {
      if (this.registerPassword !== this.confirmPassword) {
        alert('密码不一致');
        return;
      }
      try {
        const response = await fetch('http://j.cwebcrm.cn/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: this.registerUsername,
            password: this.registerPassword
          })
        });
        const data = await response.json();
        console.log(data);
        // 处理注册成功后的逻辑
      } catch (error) {
        console.error('注册失败:', error);
      }
    }
  }
};
</script>

<style scoped>
.main {
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  height: 100vh; /* 使容器高度占满整个视口高度 */
}

.login-register {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 350px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  text-align: center;
}

form {
  display: flex;
  flex-direction: column;
}

label {
  margin-top: 10px;
}

input {
  padding: 8px;
  margin-top: 5px;
}

button {
  margin-top: 20px;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

p {
  margin-top: 20px;
  text-align: center;
  cursor: pointer;
  color: #007bff;
}

p:hover {
  text-decoration: underline;
}
</style>