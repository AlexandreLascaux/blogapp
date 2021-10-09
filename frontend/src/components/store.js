import { writable, derived } from 'svelte/store';
import { getUser } from './utils';
/** Store for your data. 
This assumes the data you're pulling back will be an array.
If it's going to be an object, default this to an empty object.
**/
export const apiData = writable([]);

/** Data transformation.
For our use case, we only care about the drink names, not the other information.
Here, we'll create a derived store to hold the drink names.
**/
export const posts = derived(apiData, ($apiData) => {
  if ($apiData){
    return $apiData.map(t =>{ return {titre: t.titre, author: t.author, text: t.text }});
  }
  return [];
});

export const user = writable(getUser())

export default {
  subscribe: user.subscribe,
  set: user.subscribe
}