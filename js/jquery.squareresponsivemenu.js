/** @author Gyl */

(function($){
	$.fn.squareResponsiveMenu = function(options) {
		
	options = $.extend({}, $.fn.squareResponsiveMenu.defaults, options); //plugin default options
				
		return this.each(function(){
			var levelOneShown = false, levelTwoShown = false, levelThreeShown = false, //used in menu interaction behavior
			$firstLevel, $secondLevel, 			//saving selection - used in menu interaction behavior
			$levelOneItems, $levelTwoItems,		//saving selection = used in menu interaction behavior
			xPositionMod, xUpperPositionMod, yUpperPositionMod, yFirstPositionMod,		//modifier for adjusting menu-level position based on toggle position						
			marginBetweenSquares, 				//saving left-margin value between squares 
			menuLevelsWidth, firstMenuLevelsHeight,	//variables for saving calculated ul width value and level-1 menu height
			verticalPositioning, horizontalPositioning;				//vertical and horizontal positioning according to toggle position
			
			switch(options.togglePosition){		
				case 'bottom-left':
					yFirstPositionMod = -1;
					yUpperPositionMod = 1;
					verticalPositioning = 'bottom';
					horizontalPositioning = 'left';
					break;
				case 'top-right':
					xPositionMod = -1;
					xUpperPositionMod = 0;
					yPositionMod = 0;
					verticalPositioning = 'top';
					horizontalPositioning = 'right';
					break;
				case 'bottom-right':
					xPositionMod = -1;
					xUpperPositionMod = 0;
					yFirstPositionMod = -1;
					yUpperPositionMod = 1;
					verticalPositioning = 'bottom';
					horizontalPositioning = 'right';
					break;
				default:
					verticalPositioning = 'top';
					horizontalPositioning = 'left';
			}
			
			$('title').nextUntil('body', 'style').remove();
			$('<style type="text/css">' +
				'.square-menu-items { height:'+ options.squareHeight +'px; width:'+ options.squareWidth +'px; float:'+ options.menuItemsFlow +'}'+
			'</style>').appendTo('head');
			$('#square-menu > ul li').addClass('square-menu-items');

			marginBetweenSquares = parseInt($('#square-menu > ul li:nth-child(2)').css('margin-left'), 10);
			menuLevelsWidth = (options.squareNumbers * ($('#square-menu > ul li').outerWidth() + marginBetweenSquares));
			firstMenuLevelsHeight = Math.ceil($('#square-menu ul.level-1 > li').length/options.squareNumbers) * $('#square-menu ul li').outerHeight(true) + $('#toggle-square').outerHeight(true);
			
			$('<style type="text/css"> .square-menu-level { width:'+ menuLevelsWidth +'px; } </style>').appendTo('head');
			$('#square-menu ul').addClass('square-menu-level');	
			
			$('<style type="text/css">' +
				'.square-first-level { margin:'+ $('#toggle-square').outerHeight(true) +'px 0 0 -1px !important; }' +
				'.square-upper-level { margin:'+ $('#square-menu > ul li').outerHeight() +'px 0 0 -'+ ($('#square-menu > ul li').outerWidth()) +'px }' +
				'.square-first-positioned { '+
						'left:'+ (menuLevelsWidth * xPositionMod + $('#toggle-square').outerWidth() + marginBetweenSquares) +'px;'+
						'top:'+ (firstMenuLevelsHeight * yFirstPositionMod) +'px;'+
				' }' +
				'.square-upper-positioned {'+ 
						horizontalPositioning + ':'+ (($('#square-menu > ul li').outerWidth() + (marginBetweenSquares * options.squareNumbers)) * xUpperPositionMod) +'px;'+
						verticalPositioning + ':'+ ( $('#square-menu > ul li').outerHeight(true) * yUpperPositionMod) +'px;'+ 
				' }' +
			'</style>').appendTo('head');
				
			$('#square-menu ul.level-1').addClass('square-first-level');
			$('#square-menu ul.level-2').addClass('square-upper-level');
			$('#square-menu ul.level-3').addClass('square-upper-level');
			
			if( options.togglePosition == 'bottom-right' || options.togglePosition == 'bottom-left' || options.togglePosition == 'top-right'){
				$('#square-menu ul.level-1').addClass('square-first-positioned');
				$('#square-menu ul.level-2').addClass('square-upper-positioned');
				$('#square-menu ul.level-3').addClass('square-upper-positioned');
			}
				
			$('#square-menu ul.level-1').addClass('hide');
			$('#square-menu ul.level-2').addClass('hide');
			$('#square-menu ul.level-3').addClass('hide');
			
			$('li > ul').parent().addClass('have-subs');
			
			$('#square-menu #toggle-square').click(levelOneToggle);
			$('#square-menu ul.level-1 > li.have-subs > a').click(levelTwoToggle);
			$('#square-menu ul.level-2 > li.have-subs > a').click(levelThreeToggle);
		
			/* ------------ Square toggle button related behavior: Toggling level-1 Menu ------------*/
			function levelOneToggle(){
				if( !levelOneShown ){
					$(this).addClass('active');
					$('#square-menu ul.level-1').fadeIn(150, function(){
						$('#square-menu ul.level-1').removeClass('hide');
						$('#square-menu ul.level-1').addClass('show');
						levelOneShown = true;	
					});	
				} else {
					$(this).removeClass('active');
					$('#square-menu ul.level-1 > li.have-subs').removeClass('active');
					$('#square-menu ul.level-2 > li.have-subs').removeClass('active');
					$('#square-menu ul.level-1').fadeOut(150, function(){
						$('#square-menu ul.level-1').removeClass('show');
						$('#square-menu ul.level-1').addClass('hide');
						levelOneShown = false;
						if(levelTwoShown){
							$firstLevel.fadeTo(200, 1);
							$levelOneItems.bind('click', levelTwoToggle);
							$('#square-menu ul.level-2').removeClass('show');
							$('#square-menu ul.level-2').addClass('hide');
							levelTwoShown = false;
						}
						if(levelThreeShown){
							$secondLevel.fadeTo(200, 1);
							$levelTwoItems.bind('click', levelThreeToggle);
							$('#square-menu ul.level-3').removeClass('show');
							$('#square-menu ul.level-3').addClass('hide');
							levelThreeShown = false;
						}					
					});				
				}
			}
		
			/* ------------ Level-1 menu behavior: Toggling level-2 Menu ------------*/
			function levelTwoToggle(){
				$firstLevel = $(this).parent().siblings();
				$levelOneItems = $(this).parent().siblings('.have-subs').children('a');
				if( !levelTwoShown ){
					$(this).parent().addClass('active');
					$firstLevel.fadeTo(200, 0.1);
					$levelOneItems.unbind('click'); //disabling click event on other faded menu items
					$(this).parent().children('ul.level-2').fadeIn(200, function(){
						$(this).parent().children('ul.level-2').removeClass('hide');
						$(this).parent().children('ul.level-2').addClass('show');
						levelTwoShown = true;
					});	
				} else {
					$(this).parent().removeClass('active');
					$firstLevel.fadeTo(200, 1);
					$levelOneItems.bind('click', levelTwoToggle);	
					$('#square-menu ul.level-2 > li.have-subs').removeClass('active');		
					$('#square-menu ul.level-2').fadeOut(150, function(){	
						$('#square-menu ul.level-2').removeClass('show');
						$('#square-menu ul.level-2').addClass('hide');
						levelTwoShown = false;
						if(levelThreeShown){
							$secondLevel.fadeTo(200, 1);
							$('#square-menu ul.level-3').removeClass('show');
							$('#square-menu ul.level-3').addClass('hide');
							levelThreeShown = false;
						}				
					});	
				}
			}
			
			/* ------------ Level-2 menu behavior: Toggling level-3 Menu ------------*/
			function levelThreeToggle(){
				$secondLevel = $(this).parent().siblings();
				$levelTwoItems = $(this).parent().siblings('.have-subs').children('a');
				if( !levelThreeShown ){
					$(this).parent().addClass('active');
					$secondLevel.fadeTo(200, 0.1);
					$levelTwoItems.unbind('click'); //disabling click event on other faded menu items
					$(this).parent().children('ul.level-3').fadeIn(200, function(){
						$(this).parent().children('ul.level-3').removeClass('hide');
						$(this).parent().children('ul.level-3').addClass('show');
						levelThreeShown = true;
					});		
				} else {
					$(this).parent().removeClass('active');
					$secondLevel.fadeTo(200, 1.0);
					$levelTwoItems.bind('click', levelThreeToggle); 
					$('#square-menu ul.level-3').fadeOut(150, function(){				
						$('#square-menu ul.level-3').removeClass('show');
						$('#square-menu ul.level-3').addClass('hide');
						levelThreeShown = false;
					});
				}
			}	
		});	
	};
	
	$.fn.squareResponsiveMenu.defaults = {
		'squareHeight': 75,
		'squareWidth':  75,
		'squareNumbers': 3,
		'menuItemsFlow': 'left',
		'togglePosition': 'top-left'	
	};
})( jQuery );
