<script>
    import { Input } from '$lib/components';

    export let data;

    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

    let user = {
      username: capitalizeFirstLetter(data.user.username),
      profilePicture: `https://ui-avatars.com/api/?name=${data.user?.username}`,
      watchlist: [],
      favorites: [],
    };

    // You can load user data from an API or store here

    function addToWatchlist(title, progress) {
      user.watchlist.push({ title, progress });
    }

    function removeFromWatchlist(title) {
      user.watchlist = user.watchlist.filter((item) => item.title !== title);
    }
  </script>

  <main class="profile-page">
    <section class="user-info">
      <img class="profile-picture" src={user.profilePicture} alt="Profile Picture" />
      <h1 class="username">{user.username}'s Profile</h1>
    </section>

    <section class="watchlist">
      <h2 class="section-title">Watchlist</h2>
      <ul>
        {#each user.watchlist as item (item.title)}
        <li class="watchlist-item">
          <div class="watchlist-info">
            <span class="title">{item.title}</span>
            <span class="progress">{item.progress}</span>
          </div>
          <button class="remove-button" on:click={() => removeFromWatchlist(item.title)}>Remove</button>
        </li>
        {/each}
      </ul>
    </section>

    <section class="favorites">
      <h2 class="section-title">Favorites</h2>
      <ul>
        {#each user.favorites as favorite}
        <li>{favorite}</li>
        {/each}
      </ul>
    </section>
  </main>

  <style>
    .profile-page {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20px;
      font-family: Arial, sans-serif;
    }

    .user-info {
      text-align: center;
      margin-bottom: 20px;
    }

    .profile-picture {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      margin-bottom: 10px;
      object-fit: cover;
    }

    .username {
      font-size: 24px;
      color: #333;
    }

    .section-title {
      font-size: 20px;
      font-weight: bold;
      margin-bottom: 10px;
      color: #333;
    }

    .watchlist,
    .favorites {
      width: 100%;
      max-width: 600px;
      margin-bottom: 20px;
    }

    ul {
      list-style: none;
      padding: 0;
    }

    .watchlist-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 8px;
      margin-bottom: 10px;
      background-color: #f7f7f7;
    }

    .watchlist-info {
      display: flex;
      flex-direction: column;
    }

    .title {
      font-size: 18px;
      font-weight: bold;
      color: #333;
    }

    .progress {
      font-size: 14px;
      color: #666;
    }

    .remove-button {
      background-color: #ff5733;
      color: white;
      border: none;
      padding: 8px 16px;
      cursor: pointer;
      transition: background-color 0.3s ease;
      border-radius: 4px;
    }

    .remove-button:hover {
      background-color: #ff4022;
    }
  </style>
