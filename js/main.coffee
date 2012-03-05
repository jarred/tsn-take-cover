takeCover = window.takeCover ||= {}
takeCover.main =

	totalImages: 145
	enoughLoaded: false

	init: ->
		_.bindAll @
		@images = []
		@preloadImages()
		return

	preloadImages: ->
		_.each [0..@totalImages], (num) =>
			img = new Image()
			$img = $ img
			src = "./images/#{num}.jpg"
			img.src = src
			if img.complete
				@imageLoaded src
			else
				$img.bind 'load', () =>
					@imageLoaded src
					return
			return
		return

	imageLoaded: (src) ->
		@images.push src
		if @images.length > 30 && !@enoughLoaded
			@enoughLoaded = true
			@int = setInterval @showImage, 150
			@showImage()

		$('#frame').bind 'mouseover', @stopShow
		return

	showImage: ->
		n = Math.floor Math.random()*@images.length
		img = new Image()
		img.src = @images[n]
		$('#frame').html img
		return

	stopShow: (e) ->
		clearInterval @int
		$('#frame').bind 'mouseout', @startShowAgain
		return

	startShowAgain: (e) ->
		clearInterval @int
		$('#frame').unbind 'mouseout', @startShowAgain
		@int = setInterval @showImage, 150
		@showImage()
		return