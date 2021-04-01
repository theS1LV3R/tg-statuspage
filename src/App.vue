<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

html {
  background-color: #404040;
  color: hsla(0, 0%, 100%, 0.8);
}

#nav {
  padding: 10px;

  a {
    font-weight: bold;
    color: currentColor;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
