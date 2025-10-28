<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Edit Post</title>
</head>
<body>
    <h1>Edit Post
    <div style="border: 1px solid black; padding: 10px; margin: 10px;">
        <form action="/edit-post/{{$post->id}}" method="POST">
            @csrf
            @method('PUT')
            <input name="title" value="{{$post->title}}"/>
            <textarea name="body">{{$post->body}}</textarea>
            <button type="submit">Update Post</button>
        </form>
    </div>
</body>
</html>