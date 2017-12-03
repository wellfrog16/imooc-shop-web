<template>
<nav class="navbar navbar-default">
  <div class="container-fluid">
    <!-- Brand and toggle get grouped for better mobile display -->
    <div class="navbar-header">
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#top-nav" aria-expanded="false">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a class="navbar-brand" href="#">Shop</a>
    </div>

    <div class="collapse navbar-collapse" id="top-nav">
      <ul class="nav navbar-nav navbar-right">
        <li><a href="#">站位看看</a></li>
        <li class="dropdown">
          <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">frog <span class="caret"></span></a>
          <ul class="dropdown-menu">
            <li><a href="#">登陆</a></li>
            <li><a href="#">状态</a></li>
            <li><a href="#">状态</a></li>
            <li role="separator" class="divider"></li>
            <li><a href="#">购物车</a></li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</nav>
</template>

<script>
    export default {
        name: 'x-header'
    };
</script>

<style>

</style>