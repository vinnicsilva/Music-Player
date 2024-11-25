// script.js
document.addEventListener("DOMContentLoaded", function() {
    const audioPlayer = document.getElementById("audio-player");
    const playPauseBtn = document.getElementById("play-pause-btn");
    const progressBar = document.getElementById("progress-bar");
    const volumeControl = document.getElementById("volume-control");
    const currentTimeDisplay = document.getElementById("current-time");
    const totalTimeDisplay = document.getElementById("total-time");
    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");
    const musicCover = document.getElementById("music-cover");
    const range = document.querySelector('input[type="range"]');
    const playIcon = 'fas fa-play';
    const pauseIcon = 'fas fa-pause';
    const musicTitle = document.getElementById('music-title')
    const musicArtists = document.getElementById('music-artist')
    const playlistElement = document.getElementById("playlist");
    let isPlaying = false;

document.addEventListener("DOMContentLoaded", function () {
        const likeBtn = document.getElementById("like-btn");

        likeBtn.addEventListener("click", function () {
            likeBtn.classList.toggle("liked");
        });
});
    

playPauseBtn.addEventListener('click', () => {
    if (isPlaying) {
        audioPlayer.pause();
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
        audioPlayer.play();
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    }
    isPlaying = !isPlaying;
});

range.addEventListener('input', function() {
    const value = (range.value - range.min) / (range.max - range.min) * 100;
    range.style.setProperty('--progress', `${value}%`);
});

    const musicas = [
        "Local Forecast - Elevator.mp3",
        "Sneaky Snitch.mp3",
        "Aurea Carmina.mp3",
        "Latin Industries.mp3",
        "Monkeys Spinning Monkeys.mp3",
        "Scheming Weasel (faster Version).mp3"
    ];

    const capas = [
        "Disco Ultralounge.png",
        "Sneaky Snitch.png",
        "Disco Ultralounge.png",
        "Hard Eletronic.png",
        "Monkey Spinning Monkeys.png",
        "Comedy Scoring.png"
    ];

    const titulos = [
        "Local Forecast - Elevator",
        "Sneaky Snitch",
        "Aurea Carmina",
        "Latin Industries",
        "Monkeys Spinning Monkeys",
        "Scheming Weasel (Faster Version)"
    ];

    const artistas = [
        "Kevin MacLeod",
        "Kevin MacLeod",
        "Kevin MacLeod",
        "Kevin MacLeod",
        "Kevin MacLeod",
        "Kevin MacLeod"
    ];

    let currentTrack = 0;

    // Função para carregar música
    function loadTrack(index) {
        audioPlayer.src = musicas[index];
        musicCover.src = capas[index];
        musicTitle.textContent = titulos[index];
        musicArtists.textContent = artistas[index];
        audioPlayer.load();
        updatePlaylist();
        audioPlayer.play();
        
        // Redefinir o botão para "play" e atualizar o estado
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        isPlaying = false;

        setBackgroundColor()
    }

    // Atualiza a lista de reprodução, destacando a música atual
    function updatePlaylist() {
            playlistElement.innerHTML = '';
            for (let i = 0; i < musicas.length; i++) {
                const li = document.createElement('li');
                li.textContent = titulos[i];
                if (i === currentTrack) {
                    li.style.fontWeight = 'bold'; // Destaque para a música atual
                }
                li.addEventListener('click', () => {
                    currentTrack = i;
                    loadTrack(currentTrack);
                });
                playlistElement.appendChild(li);
            }
    }

    function setBackgroundColor() {
        const img = document.getElementById('music-cover'); 
        const colorThief = new ColorThief();
    
        if (img.complete) {
            try {
                const dominantColor = colorThief.getColor(img);
                console.log('Cor extraída:', dominantColor);
                document.body.style.backgroundColor = `rgb(${dominantColor[0]}, ${dominantColor[1]}, ${dominantColor[2]})`;
            } catch (error) {
                console.error("Erro ao extrair cor da imagem:", error);
            }
        } else {
            img.addEventListener('load', function() {
                try {
                    const dominantColor = colorThief.getColor(img);
                    console.log('Cor extraída:', dominantColor);
                    document.body.style.backgroundColor = `rgb(${dominantColor[0]}, ${dominantColor[1]}, ${dominantColor[2]})`;
                } catch (error) {
                    console.error("Erro ao extrair cor da imagem:", error);
                }
            });
        }
    }

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const sec = Math.floor(seconds % 60);
        return `${minutes}:${sec < 10 ? '0' : ''}${sec}`;
    }

    audioPlayer.addEventListener("loadedmetadata", function() {
        totalTimeDisplay.textContent = formatTime(audioPlayer.duration);
    });

    playPauseBtn.addEventListener("click", function() {
        if (audioPlayer.paused) {
            audioPlayer.play();
            icon.ClassName = pauseIcon;
        } else {
            audioPlayer.pause();
            icon.className = playIcon;
        }
    });

    audioPlayer.addEventListener("timeupdate", function() {
        const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        progressBar.value = progress || 0; 
        currentTimeDisplay.textContent = formatTime(audioPlayer.currentTime);
    });

    progressBar.addEventListener("input", function() {
        const newTime = (progressBar.value / 100) * audioPlayer.duration;
        audioPlayer.currentTime = newTime;
    });

    volumeControl.addEventListener("input", function() {
        audioPlayer.volume = volumeControl.value;
    });

    nextBtn.addEventListener("click", function() {
        currentTrack = (currentTrack + 1) % musicas.length; 
        loadTrack(currentTrack);
    });

    prevBtn.addEventListener("click", function() {
        currentTrack = (currentTrack - 1 + musicas.length) % musicas.length;
        loadTrack(currentTrack);
    });

    loadTrack(currentTrack);
});
