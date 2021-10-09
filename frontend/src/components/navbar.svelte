<script>
  import {getUser, clearStore} from "./utils";
  import user from "./store";
  import {onDestroy} from 'svelte'

  let updatedUser = getUser();

  const userSubscription = user.subscribe(() => updatedUser = getUser())
  onDestroy(userSubscription)

  async function onLogout(){
    await clearStore();
    updatedUser = getUser();
    //await user.set(defaultUser);
  }
</script>

<nav class="navbar navbar-expand-lg navbar-light bg-dark">
      {#if !updatedUser.isConnected}
      <a class="navbar-brand text-light" href="/login">Login</a>
      <a class="navbar-brand text-light" href="/signup">Sign Up</a>
    {/if}
    {#if updatedUser.isConnected}
    <a class="navbar-brand text-light" href="/" on:click={onLogout}>Logout</a>
    <div class="pl-3 text-white d-flex align-items-center">Connected as {updatedUser.pseudo}</div>
    {/if}

  
</nav>