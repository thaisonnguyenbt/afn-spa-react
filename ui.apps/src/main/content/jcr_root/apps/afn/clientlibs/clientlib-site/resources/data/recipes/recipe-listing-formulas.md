//ALL

[
  '{{repeat(10, 10)}}',
  {
    title: '{{lorem(5, "words")}}',
	description: '{{lorem(30, "words")}}',
    thumbnail: function (tags) {
      var smallImages = ['clientlib-site/resources/images/carousel/carousel-mobile-01.jpg', 'clientlib-site/resources/images/carousel/carousel-mobile-02.jpg', 'clientlib-site/resources/images/carousel/carousel-mobile-03.jpg', 'clientlib-site/resources/images/carousel/carousel-mobile-04.jpg', 'clientlib-site/resources/images/carousel/carousel-mobile-05.jpg'];
      return smallImages[tags.integer(0, smallImages.length - 1)];
    },
    alt: '{{lorem(5, "words")}}',
	url: 'https://www.google.com',
	categoryTitle: function (tags) {
      var catgoryTitles = ['Asian Delicacies', 'Convenient and Simple', 'Cooking Skills', 'Foolproof for Beginners', 'Nutrition', 'Time-bound', 'Togetherness/Comaraderie', 'Optimizing Daily Routine', 'Dietary', 'Dining Experience'];
      return catgoryTitles[tags.integer(0, catgoryTitles.length - 1)];
    },
	ratingconfig: 'afn_ratings_reviews_default_configuration',
	streamid: function (tags) {
      var streamIDs = ['recipe-review-stream', 'article-review-stream', '/content/afn/global/en/recipe/cuisine/kueh-salat.html'];
      return streamIDs[tags.integer(0, streamIDs.length - 1)];
    },
  }
]
