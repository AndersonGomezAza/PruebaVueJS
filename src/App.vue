<template>
  <div id="app">
    <main>
      <router-view />
    </main>
    <footer>
      <p>&copy; 2025 Prueba Técnica OpenTic</p>
    </footer>
  </div>
</template>

<script>
  export default {
    name: 'App',
  };
</script>

<style>
  #app {
    font-family: Arial, sans-serif;
    text-align: center;
    color: #2c3e50;
  }

  main {
    height: 95vh;
  }

  footer {
    background: #f1f1f1;
    padding: 10px 0;
    position: fixed;
    height: 5vh;
    width: 100%;
    bottom: 0;
  }
</style>