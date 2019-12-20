/*
 Adobe AEM Brightcove Connector

 Copyright (C) 2017 Coresecure Inc.

 Authors:
 Alessandro Bonfatti
 Yan Kisen
 Pablo Kropilnicki

 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.

 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with this program.  If not, see <http://www.gnu.org/licenses/>.

 - Additional permission under GNU GPL version 3 section 7
 If you modify this Program, or any covered work, by linking or combining
 it with httpclient 4.1.3, httpcore 4.1.4, httpmine 4.1.3, jsoup 1.7.2,
 squeakysand-commons and squeakysand-osgi (or a modified version of those
 libraries), containing parts covered by the terms of APACHE LICENSE 2.0
 or MIT License, the licensors of this Program grant you additional
 permission to convey the resulting work.
 */

//setVideoTrackingEvents();


function r(f) {
	/in/.test(document.readyState) ? setTimeout('r(' + f + ')', 9) : f()
}
// use like
r(function () {
	createPlayers();
});

/**
 * Create Brightcover Players
 */
function createPlayers() {
	var all = document.getElementsByClassName("brightcove-container");

	for (var i = 0, max = all.length; i < max; i++) {
		(function () {
			var selected_element = all[i];
			var playerID = selected_element.getAttribute("data-playerid");
			try {
				videojs(playerID).dispose();
			} catch (e) {

			}
			var dataAccount = selected_element.getAttribute("data-account");
			var dataPlayer = selected_element.getAttribute("data-player");
			var dataEmbed = selected_element.getAttribute("data-embed");
			var dataVideoId = selected_element.getAttribute("data-video-id");
			var dataWidth = selected_element.getAttribute("data-width");
			var dataHeight = selected_element.getAttribute("data-height");
			var dataUsage = selected_element.getAttribute("data-usage");
			var $videoTitle = $(selected_element).closest('.brightcove_player').find(".m-video__title");
			var $videoDuration = $(selected_element).closest('.brightcove_player').find(".a-category-tag");
			var $videoClose = $(selected_element).closest('.brightcove_player').find(".m-video__close");
			var isRecipeHero = false;

			if ($(selected_element).closest('.afn-video-container').hasClass('isRecipeHero')) {
				isRecipeHero = true;
				var $recipeContainer = $(selected_element).closest('.o-recipe');
			}

			var s = document.createElement('script');
			s.src = "//players.brightcove.net/" + dataAccount + "/" + dataPlayer + "_" + dataEmbed + "/index.min.js";
			s.onload = (function (playerID, dataVideoId, dataAccount, dataPlayer, dataEmbed, dataWidth, dataHeight, selected_element) {
				return function () {
					playerHTML = '<video id=\"' + playerID + '\" data-video-id=\"' + dataVideoId + '\"  data-account=\"' + dataAccount + '\" data-player=\"' + dataPlayer + '\" data-embed=\"' + dataEmbed + '\" data-usage=\"' + dataUsage + '\" class=\"video-js\" controls width=\"' + dataWidth + '\" height=\"' + dataHeight + '\"></video>';
					selected_element.innerHTML = playerHTML;
					bc(document.getElementById(playerID));
					videojs(playerID).ready(function () {
						myPlayer = this
						if (typeof myPlayer !== "undefined") {
							myPlayer.on("firstplay", function () {
								console.log('firstplay');
								var $videoJS = $(selected_element).closest('.brightcove_player').find(".video-js");
								if ($videoTitle.hasClass('-active')) {
									$videoTitle.removeClass('-active');
								}
								if ($videoDuration.hasClass('-active')) {
									$videoDuration.removeClass('-active');
								}
								if (!$videoClose.hasClass('-active')) {
									$videoClose.addClass('-active');
								}
								if (!$videoJS.hasClass('vjs-has-started')) {
									$videoJS.addClass('vjs-has-started');
								}

								if (isRecipeHero) {
									if (!$recipeContainer.hasClass('-active')) {
										$recipeContainer.addClass('-active');
									}
								}
							});

							// var players = [];
							// // +++  Determine the available player IDs +++//
							// for (x = 0; x < Object.keys(videojs.players).length; x++) {
							// 	// Assign the player name to setPlayer
							// 	var setPlayer = Object.keys(videojs.players)[x];
							// 	// Define the ready event for the player
							// 	videojs.getPlayer(setPlayer).ready(function () {
							// 		// Assign this player to a variable
							// 		myPlayer = this;
							// 		// Assign and event listener for play event
							// 		myPlayer.on("play", onPlay);
							// 		// Push the player to the players array
							// 		players.push(myPlayer);
							// 	})
							// }

							/* eslint-disable no-inner-declarations */
							/**
							 * Handle all players' play event
							 */
							// function onPlay(e) {
							// 	// Determine which player the event is coming from
							// 	var id = e.target.id;
							// 	// Loop through the array of players
							// 	for (var i = 0; i < players.length; i++) {
							// 		// Get the player(s) that did not trigger the play event
							// 		if (players[i].id() != id) {
							// 			// Pause the other player(s)
							// 			videojs.getPlayer(players[i].id()).pause();
							// 			//console.log('players[i] pause ', players[i]);
							// 		}
							// 	}
							// }

							myPlayer.on("play", function () {
								console.log('playing ', $(selected_element));
								var $videoJS = $(selected_element).closest('.brightcove_player').find(".video-js");
								if ($videoTitle.hasClass('-active')) {
									$videoTitle.removeClass('-active');
								}
								if ($videoDuration.hasClass('-active')) {
									$videoDuration.removeClass('-active');
								}

								console.log('$videoClose ', $videoClose);
								if (!$videoClose.hasClass('-active')) {
									$videoClose.addClass('-active');
								}
								if (!$videoJS.hasClass('vjs-has-started')) {
									$videoJS.addClass('vjs-has-started');
								}

								if (isRecipeHero) {
									if (!$recipeContainer.hasClass('-active')) {
										$recipeContainer.addClass('-active');
									}
								}

								if ($(selected_element).closest('.o-carousel-container').length > 0) {
									var $carouselContainer = $(selected_element).closest('.o-carousel-container');
									console.log('$carouselContainer ', $carouselContainer);
									$carouselContainer.trigger('brightcovePlay');
								}
							});
							myPlayer.on("pause", function () {
								console.log('paused');
								var isManualPause = $(selected_element).closest('.brightcove_player').find(".video-js").hasClass('vjs-has-started');

								if (isRecipeHero && !isManualPause) {
									if ($recipeContainer.hasClass('-active')) {
										$recipeContainer.removeClass('-active');
									}
								}
							});
							myPlayer.on("ended", function () {
								console.log('ended');
								if (!$videoTitle.hasClass('-active')) {
									$videoTitle.addClass('-active');
								}
								if (!$videoDuration.hasClass('-active')) {
									$videoDuration.addClass('-active');
								}
								if ($videoClose.hasClass('-active')) {
									$videoClose.removeClass('-active');
								}

								if (isRecipeHero) {
									if ($recipeContainer.hasClass('-active')) {
										$recipeContainer.removeClass('-active');
									}
								}

								if ($(selected_element).closest('.o-carousel-container').length > 0) {
									var $carouselContainer = $(selected_element).closest('.o-carousel-container');
									console.log('$carouselContainer ', $carouselContainer);
									$carouselContainer.trigger('brightcoveEnded');
								}
							});
							// myPlayer.on("fullscreenchange", function () {
							// 	var $videoJS = $(selected_element).closest('.brightcove_player').find(".video-js");

							// 	if ($videoJS.hasClass('vjs-fullscreen')) {
							// 		if (!$videoClose.hasClass('-fullscreen')) {
							// 			$videoClose.addClass('-fullscreen');
							// 		}
							// 	} else {
							// 		if ($videoClose.hasClass('-fullscreen')) {
							// 			$videoClose.removeClass('-fullscreen');
							// 		}
							// 	}
							// });
						}
						if (typeof myPlayer !== "undefined" && typeof ga != "undefined") {
							myPlayer.on("firstplay", function () {
								var videoName = myPlayer.mediainfo.name;
								var videoID = myPlayer.mediainfo.id;
								var videoDuration = myPlayer.mediainfo.duration;
								var $videoJS = $(selected_element).closest('.brightcove_player').find(".video-js");

								if (!$videoJS.hasClass('vjs-has-started')) {
									$videoJS.addClass('vjs-has-started');
								}

								ga("send", "video", "firstplay", videoName + " - " + videoID + " - " + videoDuration);
							});
							myPlayer.on("play", function () {
								var videoName = myPlayer.mediainfo.name;
								var videoID = myPlayer.mediainfo.id;
								var $videoJS = $(selected_element).closest('.brightcove_player').find(".video-js");

								if (!$videoJS.hasClass('vjs-has-started')) {
									$videoJS.addClass('vjs-has-started');
								}

								ga("send", "video", "play", videoName + " - " + videoID, myPlayer.currentTime());
							});
							myPlayer.on("ended", function () {
								var videoName = myPlayer.mediainfo.name;
								var videoID = myPlayer.mediainfo.id;
								ga("send", "video", "ended", videoName + " - " + videoID, myPlayer.currentTime());
							});
							myPlayer.on("fullscreenchange", function () {
								var videoName = myPlayer.mediainfo.name;
								var videoID = myPlayer.mediainfo.id;
								ga("send", "video", "fullscreenchange", videoName + " - " + videoID, myPlayer.currentTime() + (myPlayer.isFullscreen() ? " Fullscreen" : ""));
							});
							myPlayer.on("pause", function () {
								var videoName = myPlayer.mediainfo.name;
								var videoID = myPlayer.mediainfo.id;
								ga("send", "video", "pause", videoName + " - " + videoID, myPlayer.currentTime());
							});
							myPlayer.on("resize", function () {
								var videoName = myPlayer.mediainfo.name;
								var videoID = myPlayer.mediainfo.id;
								ga("send", "video", "resize", videoName + " - " + videoID, myPlayer.currentTime());
							});
							myPlayer.on("seeked", function () {
								var videoName = myPlayer.mediainfo.name;
								var videoID = myPlayer.mediainfo.id;
								ga("send", "video", "seeked", videoName + " - " + videoID, myPlayer.currentTime());
							});
							myPlayer.on("volumechange", function () {
								var videoName = myPlayer.mediainfo.name;
								var videoID = myPlayer.mediainfo.id;
								ga("send", "video", "volumechange", videoName + " - " + videoID, (myPlayer.volume() * 100) + "%" + (myPlayer.muted() ? " Muted" : ""));
							});
						}
					});
				};
			}(playerID, dataVideoId, dataAccount, dataPlayer, dataEmbed, dataWidth, dataHeight, selected_element));
			document.body.appendChild(s);
		})();

	}
}
