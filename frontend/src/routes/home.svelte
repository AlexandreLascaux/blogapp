<script>
  import { onMount } from "svelte";
  import {getUser} from "../components/utils";
  import Post from "../components/post.svelte";
  import PostForm from "../components/createPost.svelte";
  const baseUrl = "http://localhost:3001/test";
  let posts = [];
  let editModeId = null;
  let postUpdated = {
    titre: "",
    text: "",
    author: getUser().pseudo
  };
  onMount(async () => {
    let res = await fetch(baseUrl, {
      method: 'GET',
      headers: {
        'Authorization': getUser().token
      }
    });
    posts = await res.json();
  });

  let addpost = ({ detail: post }) => {
    posts = [post, ...posts];
  };

  async function deletePost(idPost) {
    const res = await fetch(`${baseUrl}/${idPost}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        'Authorization': getUser().token
      },
    }).then((data) => {
      if (data) {
        posts = posts.filter((post) => idPost !== post._id);
      }
    });
  }

  function updatePost(idPost){
  if(typeof window !== "undefined") window.scrollTo(0, 0);
    if(idPost === null) {
      editModeId = null;
      return;
    }
    postUpdated = posts.find(post => post._id === idPost);
    editModeId = idPost;
  }

  function onPostUpdated({ detail }){
    const updatedPostIndex = posts.findIndex(post => post._id === detail._id);
    posts[updatedPostIndex] = detail;
    editModeId = false;
  }

</script>

<svelte:head>
  <title>Home</title>
</svelte:head>

<main>
  <div class="d-flex flex-column justify-content-center w-100 pt-3">
    <div class="d-flex justify-content-center">
      <h2>{editModeId ? "Editer" : "Créer"} un post</h2>

    </div>
    <div class="d-flex justify-content-center">
      <PostForm
      on:postCreated={addpost}
      on:postUpdated={onPostUpdated}
      post={postUpdated}
      editModeId={editModeId}
      switchMode={() => {editModeId=null}}
      />
    </div>

  </div>

  <section class="mt-5">
    <div class="container">
      <div class="row">
        {#if posts.length === 0}
          <p>Loading</p>
        {:else}
          {#each posts as post}
            <Post {post} {deletePost} {updatePost}/>
          {/each}
        {/if}
      </div>
    </div>
  </section>
</main>
