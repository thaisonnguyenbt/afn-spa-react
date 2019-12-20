//INDIVIDUAL

[
  '{{repeat(8, 8)}}',
  {
    title: '{{lorem(5, "words")}}',
    thumbnail: function (tags) {
      var smallImages = ['clientlib-site/resources/images/carousel/carousel-mobile-01.jpg', 'clientlib-site/resources/images/carousel/carousel-mobile-02.jpg', 'clientlib-site/resources/images/carousel/carousel-mobile-03.jpg', 'clientlib-site/resources/images/carousel/carousel-mobile-04.jpg', 'clientlib-site/resources/images/carousel/carousel-mobile-05.jpg'];
      return smallImages[tags.integer(0, smallImages.length - 1)];
    },
    alt: '{{lorem(5, "words")}}',
	url: 'https://www.google.com'
  }
]
