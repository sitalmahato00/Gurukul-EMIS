<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>SMS Gurukul - School Management System</title>
@php
  $manifest = json_decode(file_get_contents(public_path('build/manifest.json')), true);
  $jsEntry = $manifest['resources/js/main.tsx']['file'] ?? '';
  $cssEntry = $manifest['resources/css/app.css']['file'] ?? '';
@endphp
    <link rel="stylesheet" href="/build/{{ $cssEntry }}" />
    <script type="module" src="/build/{{ $jsEntry }}"></script>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
