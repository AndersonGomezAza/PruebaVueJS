<template>
    <div>
      <h1>Login</h1>
      <form @submit.prevent="handleLogin">
        <input v-model="username" placeholder="Username" required />
        <input v-model="password" type="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
    </div>
</template>

<script>
  import api from '@/services/api';
  import swal from 'sweetalert';
  
  export default {
    data() {
      return {
        username: '',
        password: '',
      };
    },
    methods: {
      async handleLogin() {
        try {
          const response = await api.login({ username: this.username, password: this.password, recaptcha :null });
          const userData = response.data;
          const userDataDesencrypted = JSON.parse(userData.encrypted);
          if(userDataDesencrypted.data.error || userDataDesencrypted.data.password){throw `${userDataDesencrypted.data.error || userDataDesencrypted.data.password[0]}`}
          localStorage.setItem('user', JSON.stringify(userDataDesencrypted));
          this.$router.push({ path: '/dashboard' });
        } catch (err) {
            this.username = '';
            this.password = '';
            swal('Error al iniciar sesión',`${err}`, "error");
        }
      },
    },
  };
</script>

<style scoped>
    div {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: inherit;
        background-color: #f4f4f9;
        font-family: 'Arial', sans-serif;
    }

    h1 {
        font-size: 2rem;
        color: #333333;
        margin-bottom: 1.5rem;
    }

    form {
        background: #ffffff;
        padding: 2rem;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        width: 100%;
        max-width: 400px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    form input {
        width: 100%;
        padding: 0.75rem;
        margin-bottom: 1rem;
        border: 1px solid #cccccc;
        border-radius: 4px;
        font-size: 1rem;
        box-sizing: border-box;
        outline: none;
        transition: border-color 0.3s;
    }

    form input:focus {
        border-color: #007bff;
    }

    form button {
        width: 100%;
        padding: 0.75rem;
        font-size: 1rem;
        color: #ffffff;
        background-color: #007bff;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.3s;
    }

    form button:hover {
        background-color: #0056b3;
    }

    p {
        margin-top: 1rem;
        color: #ff4d4d;
        font-size: 0.9rem;
    }
</style>