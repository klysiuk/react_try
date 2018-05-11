import SVG from 'svg.js';
import moment from 'moment';
import { saveSvgToFile } from '../common/saveToFile.js';

export default class Timeline {
	/**
	 * Render svg element in given container
	 * 
	 * @type {Object}
	 * @property {HTMLElement} parent The dom element
	 * @property {number} startingHour The hour from which timeline will begin
	 * @property {number} height The heigh of svg container in pixels
	 * @returns {this}
 	*/
	render({parent, startingHour = 5, height = 300, title}) {
		if (parent instanceof HTMLElement) {
			return this
				.createContainer(parent, height)
				.createTimeAxis(startingHour)
				.addTitle(title)
				.init();
		} else {
			console.error('parent parameter should be HTMLElement');
			return null;
		}
	}

	init() {
		const timeline =  this;
		this.svg.click(function(ev) {
			const x = this.point(ev.clientX, ev.clientY).x;

			this.node.dispatchEvent(new CustomEvent('userClickOnChart', { 
				bubbles: true, detail: { time: timeline.getTimeFromPosition(x) }
			}))
		});
		return this;
	}

	addTitle(title) {
		let text = this.svg.text(title).attr({
			'font-family': 'Gothic A1, sans-serif',
			'font-size': '20px',
			x: this.margin,
			y: 0
		});

		return this;
	}

	createContainer(parent, height) {
		this.width = parent.clientWidth;
		this.height = height;

		//TODO add name, desc for accessibility
		this.svg = SVG(parent).size(this.width, this.height);
		this.activitiesArea = this.svg.group(); // Place to draw activities with text

		return this;
	}

	/**
	 * Return moment.js object with time from screen coordinate
	 *
	 * @param {number} x Screen coordinate
	 * @returns {object}
	 */
	getTimeFromPosition(x) {
		const quatersFromStart = (x - this.margin) / this.quarterWidth;
		let currentHour = null;
		if ( (quatersFromStart/4 + this.startingHour) >= 24) {
			currentHour = (Math.floor(quatersFromStart/4) + this.startingHour) - 24;
		} else {
			currentHour = Math.floor(quatersFromStart/4) + this.startingHour
		}

		const minutes = (Math.floor(quatersFromStart)%4) * 15;

		return moment(`${currentHour}:${minutes}`,'hh:mm');
	}

	getPositionFromTime(time, type = 'end') { // accept moment object 
		let currentHour = time.get('hour');
		let minutes = time.get('minutes');
		let hourPosition = null;

		if (currentHour > this.startingHour) {
			hourPosition = currentHour - this.startingHour;
		} else if(currentHour < this.startingHour){
			hourPosition = 24 - this.startingHour + currentHour;
		} else { // if equal
			if (type == 'start') {
				hourPosition = this.startingHour
			} else {
				hourPosition = 24;
			}
		}

		let position = this.margin + this.quarterWidth*4*hourPosition + (minutes ? minutes/15*this.quarterWidth : 0);

		return position;
	}

	createTimeAxis(startingHour) {
		const quatersCount = 24*4;
		const timeAxis = this.svg.group().addClass('time-axis');

		this.startingHour = startingHour;
		this.labelFontSize = this.height / 25;
		this.margin = this.labelFontSize * 1.5; // right, left spaces
		this.quarterWidth = (this.width - this.margin * 2) / quatersCount;
		this.yTickBottomCoord = this.height/2;
		this.yHourTickTopCoord = this.height/4
		this.yTickTopCoord = this.height/3;

		// Draw ticks every quarter (15min), hour tick are different
		for (let i = 0; i < quatersCount+1; i++) {
			let isHourTick = (i == 0 || !(i%4));
			let xCoordOfTick = this.margin + i*this.quarterWidth;
			
			if (isHourTick) { // Add label
				let currentHour = (startingHour + i/4)%24;
				currentHour = currentHour < 10 ? `0${currentHour}:00` : `${currentHour}:00`;
				
				let text = timeAxis.text(currentHour);
				text
					.font({ family: 'Arial', size: this.labelFontSize })
					.attr({
						x: xCoordOfTick - (text.node.clientWidth / 2),
						y: this.yHourTickTopCoord - this.labelFontSize * 1.5,
					});
			}

			timeAxis.line( // Add tick
				xCoordOfTick,
				this.yTickBottomCoord,
				xCoordOfTick,
				(isHourTick ? this.yHourTickTopCoord : this.yTickTopCoord)
			).stroke({ width: 1 })
		}
		return this;
	}

	addSection({actionName, startTime, endTime, color}) {

		let displayedInterval = this.getTimeInterval(startTime, endTime)

		let startX = this.getPositionFromTime(startTime, 'start');
		let endX = this.getPositionFromTime(endTime, 'end');

		let heightRect = (this.yTickBottomCoord - this.yTickTopCoord)/2;
		let yRect = this.yTickBottomCoord- heightRect;
		let textYposition = this.yTickBottomCoord;


		if (startX < endX) { // Check if activity doesn't cross end of timeline

			let widthRect = endX - startX;
			let textXposition = startX + widthRect/2;

			this.drawActivityRect(widthRect, heightRect, startX, yRect, color);
			this.drawActivityLabel(actionName, displayedInterval, textXposition, textYposition, heightRect);

		} else { // Draw 2 blocks in this case

			let widthRect1 = this.width - this.margin - startX;
			let widthRect2 = endX - this.margin;

			let text1Xposition = startX + widthRect1/2;
			let text2Xposition = this.margin + widthRect2/2;

			this.drawActivityRect(widthRect1, heightRect, startX, yRect, color);
			this.drawActivityRect(widthRect2, heightRect, this.margin, yRect, color);

			this.drawActivityLabel(actionName, displayedInterval, text1Xposition, textYposition, heightRect);
			this.drawActivityLabel(actionName, displayedInterval, text2Xposition, textYposition, heightRect);
		}

		return this;
	}

	getTimeInterval(startTime, endTime) {
		let startHour = startTime.get('hour');
		let endHour = endTime.get('hour');

		if (endHour < startHour) {
			endHour+=24;
		}

		let hoursDiff = endHour-startHour;
		let minutesDiff = endTime.get('minutes') - startTime.get('minutes')

		if (minutesDiff < 0) {
			hoursDiff--;
			minutesDiff = 60+minutesDiff;
		}

		return moment(`${hoursDiff}:${minutesDiff}`,'hh:mm').format('HH:mm');
	}

	drawActivityRect(width, height, x, y, color) {
		this.activitiesArea
			.rect(width, height)
			.fill(color)
			.attr({ x, y});
	}

	drawActivityLabel(name, timeInterval, x, y, heightRect) { // TODO remove last param
		let text = this.activitiesArea.text(`${name} ${timeInterval}`);

		let textHeight = text.node.getBoundingClientRect().height;
		let textWidth = text.node.getBoundingClientRect().width;

		text.attr({
			transform: `rotate(-90, ${x - textHeight}, ${y+textWidth + heightRect})`,
			x,
			y: y+textWidth+heightRect
		});

	}

	/**
	 * Exports svg to selected format
	 *
	* @param {string} name File name.
	* @param {string} extention File extention.
* @returns {this}
 	*/

	export(name, extention) {
		saveSvgToFile({
			svg: this.svg.svg(),
			width: this.width,
			height: this.height,
			extention
		});

		return this;
	}

	/**
	 * Unrender svg element with all data
	 *
 	*/
	unrender() {
		this.svg.off();
		this.svg.remove();
	}
}