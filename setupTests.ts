import "jsdom-global/register";
import * as Enzyme from "enzyme";
import * as EnzymeAdapter from "enzyme-adapter-react-16";

// at the top of file , even  , before importing react

// Setup enzyme"s react adapter
Enzyme.configure({ adapter: new EnzymeAdapter() });

function doNothing() {
	// nothing
}

function addListenerFun(): MediaQueryList {
	return {
		matches: false,
		addListener: () => { doNothing(); },
		removeListener: () => { doNothing(); },
		media: ""
	};
}

window.requestAnimationFrame = function(callback) {
	setTimeout(callback, 0);
  };

window.matchMedia = window.matchMedia || addListenerFun;