<script>
    import { user } from "../components/store.js";
    import { goto } from "$app/navigation";
  
    const url = "http://localhost:3001/user/signup/";
  
    let createUser = async () => {
      if ($user.email.trim() === "" || $user.password.trim() === "") return;
      const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify($user)
    }).then((response) => {
    if (response.ok) {
      goto("/login");
    } else {
      throw new Error('Something went wrong');
    }
  })
  .catch((error) => {
    console.log(error)
  });
  };
    </script>
    <div class="p-4">
      <h1>Sign Up</h1>
  
      <form class="content" on:submit|preventDefault={createUser}>
          <!-- svelte-ignore a11y-label-has-associated-control -->
        <label>Email</label>
        <input type="text" autocomplete="email" bind:value={$user.email} />
          <!-- svelte-ignore a11y-label-has-associated-control -->
          <label>Pseudo</label>
          <input type="text" autocomplete="name" bind:value={$user.pseudo} />
          <!-- svelte-ignore a11y-label-has-associated-control -->
        <label>Password</label>
        <input type="password" autocomplete="current-password" bind:value={$user.password} />
        
        <button type="submit">Sign up</button>
      </form>
  
    </div>
