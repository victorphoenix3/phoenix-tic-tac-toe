import {rows} from '../assets/globalvariables'
const findWinner=(boxes)=> {
	for (let i = 0; i < rows.length; i++) {
		const [a, b, c] = rows[i]
		if (boxes[a] && boxes[a] === boxes[b] && boxes[a] === boxes[c]) {
			return boxes[a]
		}
	}
	return null
}
const areAllBoxesClicked=(boxes)=> {
	let count = 0
	boxes.forEach(function (item) {
		if (item !== null) {
			count++
		}
	})
	if(count === 9) {
		return true
	} else {
		return false
	}
}
export {findWinner,areAllBoxesClicked}
