(function() {
  var takeCover;

  takeCover = window.takeCover || (window.takeCover = {});

  takeCover.main = {
    totalImages: 146,
    enoughLoaded: false,
    speed: 260,
    init: function() {
      _.bindAll(this);
      this.images = [];
      this.preloadImages();
    },
    preloadImages: function() {
      var _i, _ref, _results,
        _this = this;
      _.each((function() {
        _results = [];
        for (var _i = 0, _ref = this.totalImages; 0 <= _ref ? _i <= _ref : _i >= _ref; 0 <= _ref ? _i++ : _i--){ _results.push(_i); }
        return _results;
      }).apply(this), function(num) {
        var $img, img, src;
        img = new Image();
        $img = $(img);
        src = "./images/" + num + ".jpg";
        img.src = src;
        if (img.complete) {
          _this.imageLoaded(src);
        } else {
          $img.bind('load', function() {
            _this.imageLoaded(src);
          });
        }
      });
    },
    imageLoaded: function(src) {
      this.images.push(src);
      if (this.images.length > 12 && !this.enoughLoaded) {
        this.enoughLoaded = true;
        this.int = setInterval(this.showImage, this.speed);
        this.showImage();
      }
      $('#frame').bind('mouseover', this.stopShow);
    },
    showImage: function() {
      var img, n;
      n = Math.floor(Math.random() * this.images.length);
      img = new Image();
      img.src = this.images[n];
      $('#frame').html(img);
    },
    stopShow: function(e) {
      clearInterval(this.int);
      $('#frame').bind('mouseout', this.startShowAgain);
    },
    startShowAgain: function(e) {
      clearInterval(this.int);
      $('#frame').unbind('mouseout', this.startShowAgain);
      this.int = setInterval(this.showImage, this.speed);
      this.showImage();
    }
  };

}).call(this);
