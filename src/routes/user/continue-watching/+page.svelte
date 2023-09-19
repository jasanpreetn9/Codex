<script>
    let continueWatchingList = [
      {
        id: 1,
        title: 'Movie 1',
        progress: '50%',
        thumbnail: 'https://via.placeholder.com/150',
      },
      {
        id: 2,
        title: 'TV Show 1 - Episode 3',
        progress: '25%',
        thumbnail: 'https://via.placeholder.com/150',
      },
    ];
  </script>

  <main class="continue-watching-page">
    <h1 class="page-title">Continue Watching</h1>

    <ul class="continue-watching-list">
      {#each continueWatchingList as item (item.id)}
      <li class="continue-watching-item">
        <img class="thumbnail" src={item.thumbnail} alt={item.title} />
        <div class="info">
          <h2 class="title">{item.title}</h2>
          <p class="progress">Progress: {item.progress}</p>
        </div>
      </li>
      {/each}
    </ul>
  </main>

  <style>
    .continue-watching-page {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20px;
      font-family: Arial, sans-serif;
    }

    .page-title {
      font-size: 24px;
      margin-bottom: 20px;
      color: #333;
    }

    .continue-watching-list {
      list-style: none;
      padding: 0;
      width: 100%;
      max-width: 600px;
    }

    .continue-watching-item {
      display: flex;
      align-items: center;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 8px;
      margin-bottom: 10px;
      background-color: #f7f7f7;
    }

    .thumbnail {
      width: 150px;
      height: 100px;
      object-fit: cover;
      border-radius: 4px;
      margin-right: 20px;
    }

    .info {
      flex-grow: 1;
    }

    .title {
      font-size: 18px;
      font-weight: bold;
      color: #333;
      margin-bottom: 5px;
    }

    .progress {
      font-size: 14px;
      color: #666;
    }
  </style>
