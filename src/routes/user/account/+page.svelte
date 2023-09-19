<script>
	import { Input } from '$lib/components';
	export let data;
  </script>

  <main class="account-page">
	<h1 class="page-title">Account</h1>

	<form class="avatar-upload-form" action="">
	  <input class="file-input" type="file">
	  <img class="avatar" src={`https://ui-avatars.com/api/?name=${data.user?.username}`} alt="Profile Picture" />
	</form>

	<div class="input-fields">
	  <Input class="input-field" name="Username" value={data.user.username} />
	  <Input class="input-field" name="Email" value={data.user.email} />
	</div>
  </main>

  <style>
	.account-page {
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

	.avatar-upload-form {
	  display: flex;
	  flex-direction: column;
	  align-items: center;
	  margin-bottom: 20px;
	}

	.file-input {
	  display: none;
	}

	.avatar {
	  width: 120px;
	  height: 120px;
	  border-radius: 50%;
	  cursor: pointer;
	  object-fit: cover;
	  border: 2px solid #333;
	}

	.avatar:hover {
		scale: 1.1;
	}

	.input-fields {
	  display: flex;
	  flex-direction: column;
	  width: 100%;
	  max-width: 300px;
	  justify-content: center;
	}

	.input-field {
	  margin-bottom: 10px;
	}

	input[type="text"] {
	  padding: 10px;
	  border: 1px solid #ddd;
	  border-radius: 4px;
	  font-size: 16px;
	}
  </style>
