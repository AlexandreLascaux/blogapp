<script>
  import { createEventDispatcher } from "svelte";
  import {getUser} from "./utils";
  export let post, editModeId, switchMode;
  const defaultPost = {
      titre: "",
      author: getUser().pseudo,
      text: "",
    };

  const dispatch = createEventDispatcher();
  const baseUrl = "http://localhost:3001/test";
  let addNewPost = async () => {
    if (
      post.titre.trim() === "" ||
      post.author.trim() === "" ||
      post.text.trim() === ""
    ) {
      return;
    }
    await fetch(`${baseUrl}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': getUser().token
      },
      body: JSON.stringify(post),
    });
    const postCreated = post;
    post = defaultPost;
    dispatch("postCreated", postCreated);
  };

  let editPost = async () => {
    if (
      post.titre.trim() === "" ||
      post.author.trim() === "" ||
      post.text.trim() === ""
    ) {
      return;
    }
    await fetch(`${baseUrl}/${editModeId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        'Authorization': getUser().token
      },
      body: JSON.stringify(post),
    }).then(() =>
{      const postUpdated = post;
       dispatch("postUpdated", postUpdated);
      resetForm();}
      );

  };

  let resetForm = () => {
    post = defaultPost;
    switchMode();
  }

</script>

      <div class="col-md-3">
        <div class="card p-3">
          <form on:submit|preventDefault={!editModeId ? addNewPost : editPost}>
            <input
            bind:value={post.author}
            type="text"
            class="form-control"
            hidden
            id="author"
          />
            <div class="form-group">
              <label for="title">Titre</label>
              <input
                bind:value={post.titre}
                type="text"
                class="form-control"
                id="titre"
                placeholder="Title"
              />
            </div>
            <div class="form-group">
              <label for="content">Text</label>
              <textarea
                bind:value={post.text}
                class="form-control"
                id="content"
                rows="3"
                placeholder="Text"
              />
            </div>
            <button type="submit" class="w-100 btn btn-primary">{editModeId !== null ? "Edit Post" : "Add Post"}</button>
          </form>
          {#if editModeId !== null}
          <button on:click={resetForm} class="mt-2 btn btn-danger">Cancel</button>
           {/if}
        </div>
      </div>
