<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    @auth 
    <div>
        <p>Welcome you are logged in</p>
        <form action="/logout" method="post">
            @csrf
            <button type="submit">Logout</button>
        </form>
    </div>
    <div style="border: 1px solid black;">
        <h2>Create Post</h2>
        <form action="/create-post" method="POST">
            @csrf 
            <input name="title" placeholder="title"/>
            <textarea name="body" placeholder="body text area..."></textarea>
            <button type="submit">Create Post</button>
        </form>
    </div>

    <div style="border: 1px solid black;">
        <h2>Posts</h2>
        @foreach($posts as $post)
        <div style="border:1px solid black; background-color:grey; margin: 10px; padding: 10px;">
            <h3>{{ $post->title }}</h3>
            <p>{{ $post->body }}</p>
        </div>
        @endforeach
    </div>
    @else
    <div style="border: 1px solid black;">
        <h2>Register</h2>

        <form action="/register" method="post">
            @csrf
            <input type="text" placeholder="name" name="name"/>
            <input type="email" placeholder="email" name="email"/>
            <input type="password" placeholder="password" name="password"/>
            <button type="submit">Submit</button>
        </form>
    </div>
    <div style="border: 1px solid black;">
        <h2>Login</h2>

        <form action="/login" method="post">
            @csrf
            <input type="text" placeholder="name" name="loginname"/>
            <input type="password" placeholder="password" name="loginpassword"/>
            <button type="submit">Log in</button>
        </form>
    </div>
    @endauth


    
</body>
</html> 