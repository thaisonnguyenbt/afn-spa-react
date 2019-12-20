//SEND DATA

[
  '{{repeat(20, 20)}}',
  {
	author: '{{lorem(2, "words")}}',
	category: function (tags) {
      var categories = ['recipe', 'article'];
      return categories[tags.integer(0, categories.length - 1)];
    },
	mediaType: function (tags) {
      var mediaTypes = ['default', 'video'];
      return mediaTypes[tags.integer(0, mediaTypes.length - 1)];
    },
    title: '{{lorem(5, "words")}}',
    thumbnail: function (tags) {
      var smallImages = ['clientlib-site/resources/images/carousel/carousel-mobile-01.jpg', 'clientlib-site/resources/images/carousel/carousel-mobile-02.jpg', 'clientlib-site/resources/images/carousel/carousel-mobile-03.jpg', 'clientlib-site/resources/images/carousel/carousel-mobile-04.jpg', 'clientlib-site/resources/images/carousel/carousel-mobile-05.jpg'];
      return smallImages[tags.integer(0, smallImages.length - 1)];
    },
    alt: '{{lorem(5, "words")}}',
	url: 'http://localhost:9000/recipe-detail.html'
  }
]
