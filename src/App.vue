<template>
  <div id="app">
    <a href="https://github.com/hsiaosiyuan0/jlua" style="position: absolute; top: 0px; right: 0px; border: 0px; width: 150px; height: 150px; z-index: 1000;">
      <img
        style="position: absolute; top: 0; right: 0; border: 0;"
        src="https://camo.githubusercontent.com/38ef81f8aca64bb9a64448d0d70f1308ef5341ab/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f6461726b626c75655f3132313632312e706e67"
        alt="Fork me on GitHub"
        data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_darkblue_121621.png"
      >
    </a>
    <div id="nav">
      <div id="title">
        Demo for
        <a href="https://github.com/hsiaosiyuan0/jlua" target="_blank">jlua</a>
      </div>
      <router-link to="/ast">AST</router-link>&nbsp;|
      <router-link to="/js">JS</router-link>
    </div>

    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
#nav {
  /* padding: 30px; */
  text-align: center;
}

#title {
  display: block;
  float: left;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  clear: both;
}

#nav a.router-link-exact-active {
  color: #1d8ce0;
  text-decoration: none;
}
</style>
