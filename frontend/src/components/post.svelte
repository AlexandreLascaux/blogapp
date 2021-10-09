<script>
  import {getUser} from "./utils"
  export let post, deletePost, updatePost
  let pseudo = getUser().pseudo;
</script>

<div class="col-md-4 mb-4">
  <div class="card">
    <div class="card-body">
      <h5 class="card-title">Titre: {post.titre}</h5>
      <p class="card-text">{post.text}</p>
      <p class="card-text"><small class="text-muted">Posté par : {post.author}</small></p>
      {#if pseudo === post.author }
      <button class="btn btn-info" on:click={() => updatePost(post._id)}>Edit</button>
      <button class="btn btn-danger" on:click={() => deletePost(post._id)}>Delete</button>
      {/if}
    </div>
  </div>
</div>
