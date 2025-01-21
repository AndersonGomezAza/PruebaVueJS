<template>
  <div>
    <h1>Dashboard</h1>
    <h2>Bienvenido {{ nombreUser }}</h2>
    <button @click="logout">Cerrar sesión</button>
    <Menu :menu="menu" />
  </div>
</template>

<script>
  import Menu from './Menu.vue';
  import menuJson from '@/assets/menu.json'

  const user = JSON.parse(localStorage.getItem('user'));

  function validarMenu (menuJson, operacionesUser){
    // Extraemos los nombres de las operaciones permitidas
      const operacionesPermitidas = operacionesUser.map(op => op.nombreRolOperacion);

    // Filtrar el menú
    const menuFiltrado = {};

    for (const [categoria, items] of Object.entries(menuJson)) {
      // Filtramos los ítems de cada categoría
      const itemsFiltrados = items.filter(item => operacionesPermitidas.includes(item.operacion));

      // Solo añadimos la categoría si tiene ítems permitidos
      if (itemsFiltrados.length > 0) {
        menuFiltrado[categoria] = itemsFiltrados;
      }
    }
    return menuFiltrado;
  }
  export default {
    components: { Menu },
    data() {
      return {
        nombreUser: user.data.nombre,
        menu: validarMenu(menuJson, user.data.operaciones) || {},
      };
    },
    methods: {
      logout() {
        this.$router.push('/');
        localStorage.removeItem('user')
      },
    },
  };
</script>
<style scoped>
  button {
    padding: 10px 20px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-bottom: 20px;
  }

  button:hover {
    background-color: #374151;
  }

  button:focus {
    box-shadow: none;
    outline: 2px solid transparent;
    outline-offset: 2px;
  }
</style>