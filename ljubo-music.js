Module.register("ljubo-music",{
    currentSong: 0,
    intervalProgBar: 0,
	// Default module config.
	defaults: {
        songsSource: [
            {name: 'song 1', src: 'modules/ljubo-music/music/horse.mp3'},
            {name: 'song 1', src: 'modules/ljubo-music/music/BrunoMars-TheLazySong.mp3'}],
        hide: true
	},
	// Override dom generator.
	getDom: function() {
        var that = this;
        var mainWrapper = document.createElement('div');
        var wrapper = new Audio("");
        mainWrapper.setAttribute('id', 'ljubo-music-main');
        wrapper.style.display = 'none';
        wrapper.setAttribute('id', 'ljubo-music');
        wrapper.setAttribute('controls', false);
        wrapper.setAttribute('autoplay', true);
        /* wrapper.style.display = 'none'; */
        /* wrapper.onended = function () {
            that.playNewSong(wrapper, this.currentSong);
        }; */
		/* var customDiv = testLjuboDiv();
        wrapper.appendChild(customDiv); */
        /* if(this.currentSong == 0) {
            this.playNewSong(wrapper, this.currentSong);
        } */
        setTimeout(function () {
            that.onEndSong();
            that.onPlayingSong();
            that.createButtons(mainWrapper);
            that.showHidePlayPause(true);
        }, 100);
        mainWrapper.appendChild(wrapper);
        
		return mainWrapper;
    },
    showHidePlayer: function () {
        $('#ljubo-music')[0].style.display = null;
        if(this.config.hide) {
            $('#ljubo-music')[0].style.display = 'none';
        }
    },
    playSong: function() {
        var audio = $('#ljubo-music')[0];
        audio.play();
        clearInterval(this.intervalProgBar);
        this.intervalProgBar = setInterval(function () {
            if(audio.currentTime && audio.duration) {
                var percent = (audio.currentTime/audio.duration) * 100;
                $('.l-m-progress-i')[0].style.width = percent + '%';
            }
        }, 1000);
    },
    createElement: function(tag, atributes) {
        var el = document.createElement(tag);
        for(var i = 0; i < atributes.length; i++) {
            el.setAttribute(atributes[i].name, atributes[i].value);
        }
        return el;
    },
    onEndSong: function () {
        var that = this;
        var audio = $('#ljubo-music')[0];
        audio.onended = function () {
            clearInterval(that.intervalProgBar);
            that.next();
        }
    },
    showHidePlayPause: function (showPlay) {
        var that = this;
        var play = $('#ljubo-music-play')[0];
        var pause = $('#ljubo-music-pause')[0];
        if(showPlay) {
            play.style.display = null;
            pause.style.display = 'none';
        } else {
            play.style.display = 'none';
            pause.style.display = null;
        }

    },
    onPlayingSong: function () {
    },
    createButtons: function(mainWrapper) {
        var that = this;
        var progressBar = document.createElement('div');
        progressBar.setAttribute('class', 'l-m-progress');
        progressBar.appendChild(this.createElement('div', [{name: 'class', value: "l-m-progress-i"}]));
        var title = document.createElement('div');
        /* var titleChild = this.createElement('div', [{name: 'id', value: "l-m-title-child"}]) */
        title.setAttribute('id', 'l-m-title');
        /* titleChild.innerHTML = that.config.songsSource[that.currentSong%(that.config.songsSource.length)].name; */
        title.innerHTML = that.config.songsSource[that.currentSong%(that.config.songsSource.length)].name;
        var play = document.createElement('div');
        play.setAttribute('id', 'ljubo-music-play');
        play.appendChild(this.createElement('i', [{name: 'class', value: "fa fa-play"}]));
        play.addEventListener('click',this.play.bind(this))
        var pause = document.createElement('div');
        pause.appendChild(this.createElement('i', [{name: 'class', value: "fa fa-pause"}]));
        pause.setAttribute('id', 'ljubo-music-pause');
        pause.addEventListener('click',this.pause.bind(this))
        var next = document.createElement('div');
        next.appendChild(this.createElement('i', [{name: 'class', value: "fa fa-step-forward"}]));
        next.setAttribute('id', 'ljubo-music-next');
        next.addEventListener('click',this.next.bind(this))
        var prev = document.createElement('div');
        prev.appendChild(this.createElement('i', [{name: 'class', value: "fa fa-step-backward"}]));
        prev.setAttribute('id', 'ljubo-music-prev');
        prev.addEventListener('click',this.prev.bind(this))
        var buttonWrapper = this.createElement('div', [{name: 'class', value: "l-m-button-w"}]);
        buttonWrapper.appendChild(prev);
        buttonWrapper.appendChild(play);
        buttonWrapper.appendChild(pause);
        buttonWrapper.appendChild(next);
        mainWrapper.appendChild(title);
        mainWrapper.appendChild(buttonWrapper);
        mainWrapper.appendChild(progressBar);
    },
    play: function () {
        var audio = $('#ljubo-music')[0];
        if(!audio.currentSrc) {
            this.next(this);
        } else {
            this.playSong();
            this.showHidePlayPause(false);
        }
    },
    pause: function () {
        var audio = $('#ljubo-music')[0];
        audio.pause();
        this.showHidePlayPause(true);
    },
    next: function (that) {
        var audio = $('#ljubo-music')[0];
        that = this;
        audio.src = that.config.songsSource[that.currentSong%(that.config.songsSource.length)].src;
        audio.pause();
        audio.load();
        this.playSong();
        $('#l-m-title')[0].innerHTML = that.config.songsSource[that.currentSong%(that.config.songsSource.length)].name;
        that.currentSong++;
        that.showHidePlayPause(false);
    },
    prev: function (that) {
        var audio = $('#ljubo-music')[0];
        that = this;
        that.currentSong = that.currentSong - 2;
        if(that.currentSong < 0) that.currentSong = this.config.songsSource.length;
        audio.src = that.config.songsSource[that.currentSong%(that.config.songsSource.length)].src;
        audio.pause();
        audio.load();
        this.playSong();
        $('#l-m-title')[0].innerHTML = that.config.songsSource[that.currentSong%(that.config.songsSource.length)].name;
        that.currentSong++;
        that.showHidePlayPause(false);
    },

	getScripts: function() {
        return ['modules/ljubo-music/node_modules/jquery/dist/jquery.min.js'];
    },
    getStyles: function() {
        return [
            'ljubo-music.css', 'font-awesome.css'
        ]
    }
    
});