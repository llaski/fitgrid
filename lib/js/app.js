/*

Every thumbnail is always 50x50 pixels

- figure out window width & height
- figure out how many photos we have
	- based on that figure out the width = window width * 2 and set the container width
	- create 8 clones surrounding the middle original grid
	- check the final height of the 3 middle grids and make sure its greater than the window height - if not create another horizontal layer on both sides
	- traverse to the center of the midle grid


- methods
	- add grids to top/right/bottom/left sides


 */
var Images = [
	'1.jpg',
	'2.jpg',
	'3.jpg',
	'4.jpg',
	'5.jpg',
	'6.jpg',
	'7.jpg',
	'8.jpg',
	'9.jpg',
	'10.jpg',
	'11.jpg',
	'12.jpg',
	'13.jpg',
	'14.jpg',
];

var FitGrid = {
	imgWidth: 150,
	imgHeight: 150,

	init: function() {
		this.elems();
		this.createFullGrid();
		this.events();
	},

	elems: function(){
		this.$window = $(window);
		this.$body = $('body');
	},

	events: function() {
		var self = this;

		this.scrollToMiddle();

		this.$window.scroll(function(evt){
			self.scroll(evt);
		});
	},

	scrollToMiddle: function() {
		var self = this;
		console.log(this.totalGridHeight / 2, self.totalGridWidth / 2);
		self.$body.animate({
			scrollTop: self.totalGridHeight / 2,
			scrollLeft: self.totalGridWidth / 2
		}, 0);
	},

	scroll: function(evt) {
		if (this.$window.scrollTop() + this.$window.height() >= this.totalGridHeight) {
			this.$window.scrollTop(1);
		} else if (this.$window.scrollTop() <= 0) {
			console.log(this.totalGridHeight - 5)
			this.$window.scrollTop(this.totalGridHeight - this.$window.height() - 5);
		}

		if (this.$window.scrollLeft() + this.$window.width() >= this.totalGridWidth) {
			this.$window.scrollLeft(1);
		} else if (this.$window.scrollLeft() <= 0) {
			this.$window.scrollLeft(this.totalGridWidth - this.$window.width() - 5);
		}
	},

	calculateGridDimensions: function() {
		this.imgsInRow = Math.ceil(this.$window.width() / this.imgWidth);
		this.imgsInColumn = Math.ceil(this.$window.height() / this.imgHeight);
		this.gridWidth = this.imgWidth * this.imgsInRow;
		this.gridHeight = this.imgHeight * this.imgsInColumn;

		this.totalGridWidth = this.gridWidth * 3;
		this.totalGridHeight = this.gridHeight * 3;
	},

	createGrid: function(top, left) {
		var extraImages = 0,
			extraRows = 0,
			totalImages = Images.length,
			top = top || 0,
			left = left || 0;

		//Calculate # of extra images for the top row
		if (this.imgsInRow > Images.length)
			extraImages += this.imgsInRow - Images.length;

		//Calulate images to fill in full second row
		extraImages += this.imgsInRow - (Images.length % this.imgsInRow);

		//Calculate # of extra full rows
		if (Math.floor((Images.length + extraImages) / this.imgsInRow) < this.imgsInColumn)
			extraRows = this.imgsInColumn - Math.floor((Images.length + extraImages) / this.imgsInRow);

		var grid = $('<div class="grid"></div>').css({
			width: this.gridWidth + 'px',
			top: top + 'px',
			left: left + 'px'
		});

		totalImages += extraImages + (extraRows * this.imgsInRow);
		
		for(var i = 0; i < totalImages; i++) {
			grid.append('<img src="img/' + Images[i % Images.length] +'" alt="" />');
		}

		this.$body.append(grid); 
	},

	createFullGrid: function() {
		this.calculateGridDimensions();

		var numGrids = 9,
			top = 0,
			left = 0;

		while (numGrids--) {
			var left = numGrids % 3 * this.gridWidth; 
			var top = Math.floor(numGrids / 3) * this.gridHeight; 
			this.createGrid(top, left);
		}
	}
};

$(function(){
	FitGrid.init();
});