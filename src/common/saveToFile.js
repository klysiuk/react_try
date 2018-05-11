import canvg from 'canvg';
import {saveAs} from 'file-saver';
import jsPDF from 'jspdf';

export function saveSvgToFile({svg, width, height, extention = 'png'}) {

	if (!isAllowedExtentionForSvgExport) {
		console.error('not allowed extention provided, allowed are png, jpg, jpeg, pdf, svg');
	}

	var canvas = document.createElement('canvas');
	canvas.height = height;
	canvas.width = width;

	canvg(canvas, svg, {}); // Draw svg on canvas

	if (extention === 'png') {
		canvas.toBlob(function(blob) {
	    	saveAs(blob, `pretty image.${extention}`);
		});
	} else if (extention === 'jpg' || extention === 'jpeg') {
		let dataURL = canvas.toDataURL('image/jpg', 1.0);
		let data = atob(dataURL.substring('data:image/jpg;base64,'.length)),
		asArray = new Uint8Array(data.length);

		for (let i = 0, len = data.length; i < len; ++i) {
			asArray[i] = data.charCodeAt(i);
		}

		let blob = new Blob([asArray.buffer], {type: 'image/jpg'});

		saveAs(blob, 'export_' + Date.now() + '.jpg');
	} else if (extention === 'pdf') {
		 let dataURL = canvas.toDataURL("image/jpg", 1.0);	
 
		let doc = new jsPDF({ //  Using defaults: unit=mm, size=A4
			orientation: 'landscape'
		}); 

		let ratio = height/width
		let pageWidth = doc.internal.pageSize.width - 20;    
		let pageHeight = pageWidth* ratio;

		doc.addImage(dataURL, 'JPEG', 0, 0, pageWidth, pageHeight);
		doc.save('myPage.pdf');
	}
}

function isAllowedExtentionForSvgExport(extention) {
	return extention == 'png' || extention == 'jpeg' || extention == 'jpg' || extention == 'pdf' || extention == 'svg' ;
}