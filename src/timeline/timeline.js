/*

class Timeline

createTimeAxis

addActivity

addGroupActivity

addPeriod


*/
import SVG from 'svg.js';
import moment from 'moment';

export default class Timeline {
	render({parentDomElem, startingPoint, height}) {
		// TODO add checkings
		this.createContainer(parentDomElem, height);	
		this.createTimeAxis(startingPoint);
		this.init();
	}
	init() {
		this.clickListener = (function(ev) {
			let x = this.svg.point(ev.clientX, ev.clientY).x;
			let margin = this.margin;
	
			let quaterWidth = (this.width-margin*2)/24/4;
			let quatersFromStart = (x-margin)/quaterWidth;
			let currentHour = Math.floor(quatersFromStart/4) + this.startingPoint;
			let minutes = (Math.floor(quatersFromStart)%4) * 15;
	
			this.domElem.dispatchEvent(new CustomEvent('userClickOnChart', { 
				bubbles: true, detail: { time: moment(`${currentHour}:${minutes}`,'hh:mm') }
			}))

		}).bind(this);
		this.svg.node.addEventListener("click", this.clickListener, false);
	}
	createContainer(parentDomElem, height = 300) {
		// set width and height
		this.width = parentDomElem.clientWidth;
		this.height = height;

		this.domElem = document.createElement('div');
		this.svg = SVG(this.domElem).size(this.width, this.height);

		parentDomElem.appendChild(this.domElem);
		// TODO maybe remove extra div
	}
	createTimeAxis(startingPoint = 5) {
		this.startingPoint = startingPoint;

		var timeAxis = this.svg.group();
		timeAxis.addClass('time-axis');

		const labelFontSize = this.height/25;
		const margin = labelFontSize*1.5;
		const quatersCount = 24*4;
		const quater = (this.width-margin*2)/quatersCount;
		const yStart = this.height/2; // y coord of tick
		const yEnd = this.height/3; // y coord of small quoter tick
		const yEndHour = this.height/4; // y coord of big hour tick

		this.margin = margin;
		console.log('margin ', this.margin);


		for (let i = 0; i < quatersCount+1; i++) { // 23*4 = hours* quoters in hour
			let isHourTick = (i == 0 || !(i%4));
			
			if (isHourTick) { // add label
				let currentHour = (startingPoint + i/4)%24;
				currentHour = currentHour < 10 ? `0${currentHour}` : currentHour;
				
				let text = timeAxis.text(`${currentHour}:00`);
				text
				.font({ fill: '#f06', family: 'Inconsolata', size: labelFontSize })
				.attr({
					x: i*quater + margin -(text.node.clientWidth/2),
					y: yEndHour - labelFontSize*1.5,
				});
			}

			timeAxis.line( // add tick
				i*quater + margin,
				yStart,
				i*quater + margin,
				(isHourTick ? yEndHour : yEnd)
			).stroke({ width: 1 })
		}
	}

	addSection({actionName, startTime, endTime}) {
		console.log('section added!', actionName, startTime, endTime);
	}
	unrender() {
		// TODO remove DOM elem
		this.svg.removeEventListener("click", this.clickListener, false);
	}
}