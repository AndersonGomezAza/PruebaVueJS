<template>
  <nav class="navbar" @click.self="closeAllDropdowns">
    <button class="hamburger" @click="toggleMobileMenu">
      ☰
    </button>
    <ul :class="['menu', { 'menu-open': isMobileMenuOpen }]">
      <li v-for="(items, category) in menu" :key="category" class="menu-item">
        <button class="menu-title" @click.stop="toggleDropdown(category)">
          {{ category }}
          <i :id=category class='bx bxs-down-arrow'></i>
        </button>
        <ul v-if="isDropdownOpen(category)" class="submenu">
          <li v-for="item in items" :key="item.route" class="submenu-item">
            <a :href="item.route">
              <i :class="item.icon"></i>
              {{ item.name }}
            </a>
          </li>
        </ul>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "Menu",
  props: {
    menu: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      openDropdowns: null,
      isMobileMenuOpen: false
    };
  },
  methods: {
    toggleDropdown(category) {
      if (this.openDropdowns === category) {
        this.openDropdowns = null;
        document.getElementById(category).classList.add('bxs-down-arrow');
        document.getElementById(category).classList.remove('bxs-up-arrow');
      } else {
        this.openDropdowns = category;
        document.getElementById(category).classList.add('bxs-up-arrow');
        document.getElementById(category).classList.remove('bxs-down-arrow');
      }
    },
    isDropdownOpen(category) {
      return this.openDropdowns === category;
    },
    closeAllDropdowns() {
      this.openDropdowns = null; 
      document.querySelectorAll('.bx').forEach((elemento) => {
        elemento.classList.remove('bxs-up-arrow');
        elemento.classList.add('bxs-down-arrow');
      });
    },
    toggleMobileMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen;
      if (!this.isMobileMenuOpen) {
        this.closeAllDropdowns();
      }
    }
  },
  mounted() {
    document.addEventListener("click", this.closeAllDropdowns);
  },
  beforeUnmount() {
    document.removeEventListener("click", this.closeAllDropdowns);
  }
};
</script>

<style scoped>
.navbar {
  background-color: #333;
  color: white;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hamburger {
  background: none;
  border: none;
  color: white;
  font-size: 1.5em;
  cursor: pointer;
  display: none;
}

.menu {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  gap: 20px;
}

.menu-item {
  position: relative;
}

.menu-title {
  background: none;
  border: none;
  color: white;
  font-size: 1em;
  cursor: pointer;
  padding: 5px 10px;
}

.submenu {
  list-style: none;
  margin: 0;
  padding: 10px;
  background-color: #444;
  position: absolute;
  top: 100%;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 150px;
  border-radius: 4px;
  z-index: 1000;
}


.submenu-item {
  margin: 5px 0;
}

.submenu-item a {
  color: white;
  text-decoration: none;
  display: flex;
  align-items: center;
  padding: 5px;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.submenu-item a:hover {
  background-color: #555;
}

@media (max-width: 768px) {
  .navbar {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  .hamburger {
    display: block;
  }

  .menu {
    display: none;
    gap: 20px;
    flex-direction: column;
    width: 100%;
  }
  
  .menu-open {
    display: flex !important;
  }

  .submenu {
    position: relative;
    align-items: start;
}

  .menu-item {
    width: 100%;
  }
}
</style>
