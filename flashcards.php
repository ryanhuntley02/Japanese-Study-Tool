<!DOCTYPE html>
<html lang="en">

<head>
  <title>Japanese Study Tool</title>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous">
  <link href="styles/main.css" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-HwwvtgBNo3bZJJLYd8oVXjrBZt8cqVSpeBNS5n7C8IVInixGAoxmnlMuBnhbgrkm" crossorigin="anonymous"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css" integrity="sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w==" crossorigin="anonymous" referrerpolicy="no-referrer">
  <script src="https://code.jquery.com/jquery-3.7.0.js" integrity="sha256-JlqSTELeR4TLqP0OG9dxM7yDPqX1ox/HfgiSLBj8+kM=" crossorigin="anonymous"></script>
</head>

<body>
  <header>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Japanese Study Tool</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="index.html">Home</a>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Hiragana
              </a>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="hiragana_chart.html">Chart</a></li>
                <li><a class="dropdown-item" href="flashcards.php?set=hi">Flashcards</a></li>
              </ul>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Katakana
              </a>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="katakana_chart.html">Chart</a></li>
                <li><a class="dropdown-item" href="flashcards.php?set=ka">Flashcards</a></li>
              </ul>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Study Sets</a>
            </li>
          </ul>
          <form class="d-flex" role="search">
            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
            <button class="btn btn-outline-success" type="submit">Search</button>
          </form>
        </div>
      </div>
    </nav>
  </header>
  <div class="contents-block mx-auto page-wrapper">
    <div class="card-block">
      <div class="page-header">
        <h1>Flashcards</h1>
      </div>
      <div id="flashcards" class="carousel slide" data-bs-theme="dark" data-bs-wrap="false">
        <div class="carousel-inner">
          <?php
          $json = file_get_contents('flashcards.json');
          $sets = json_decode($json, true);
          $activeSet = $sets[$_GET['set']];
          $keys = array_keys($activeSet);
          for ($i = 0; $i < count($keys); $i++) {
            echo '<div class="carousel-item">
                <div class="flip-card">
                  <div class="flip-card-inner">
                    <div class="flip-card-front">
                      <p>' . $keys[$i] . '</p>
                    </div>
                    <div class="flip-card-back">
                      <p>' . $activeSet[$keys[$i]] . '</p>
                    </div>
                  </div>
                </div>
              </div>';
          }
          ?>
        </div>
      </div>
      <div class="controls">
        <div class="control-block">
          <button type="button" class="btn shuffle" data-bs-toggle="button">
            <i class="fa-solid fa-shuffle"></i>
            <span class="visually-hidden">Shuffle</span>
          </button>
        </div>
        <div class="control-block carousel-controls">
          <button class="carousel-control-prev" type="button" data-bs-target="#flashcards" data-bs-slide="prev">
            <i class="fa-solid fa-circle-arrow-left fa-3x"></i>
            <span class="visually-hidden">Next</span>
          </button>
          <p class="carousel-counter"></p>
          <button class="carousel-control-next" type="button" data-bs-target="#flashcards" data-bs-slide="next">
            <i class="fa-solid fa-circle-arrow-right fa-3x"></i>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </div>
    <div>
      <?php
      echo '<h2>Terms in this set (' . count($activeSet) . ') </h2>';
      for ($i = 0; $i < count($activeSet); $i++) {
        echo '
          <div class = "st-pair">
            <span class="st-term">' . $keys[$i] . ' </span><span class="st-def">' . $activeSet[$keys[$i]] . '</span>
          </div>';
      }
      ?>
    </div>
  </div>
  <script src="js/flashcards.js"></script>
  <script>
    $(function() {
      setup();
    })
  </script>
  <footer>
  <hr>
  <p><i class="fa-regular fa-copyright"></i> Ryan Huntley 2023</p>
</footer>
</body>

</html>