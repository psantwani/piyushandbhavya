// select elements to reference
const sceneryBounds = select('#scenery-bounds');
const frame = select('#frame');
const insetT = select('#inset-top');
const insetL = select('#inset-left');
const insetL2 = select('#inset-left-2');
const edgeR = select('#edge-right-top');
const edgeB = select('#edge-bottom');
const scenery = select('#scenery');
const people = select('#people');
const indArm = select('#ind-arm');
const indThumb = select('#ind-thumb');
const coupArmM = select('#coup-arm-m');
const coupArmL = select('#coup-arm-l');
const famArmM = select('#fam-arm-m');
const famArmL = select('#fam-arm-l');

// animation vars
var sceneTl, indTl, coupTl, famTl;
const dur = .5;
const ease = Back.easeOut.config(1);
var curNum = 3;

// set initial appearance and properties
TweenMax.set(sceneryBounds, {transformOrigin: "100% 100%"});
TweenMax.set(frame, {transformOrigin: "100% 100%"});
TweenMax.set(insetT, {transformOrigin: "100% 50%"});
TweenMax.set(indArm, {rotation: "10deg", transformOrigin: "56px 0px"});
TweenMax.set(coupArmM, {transformOrigin: "0% 0%"});
TweenMax.set(coupArmL, {transformOrigin: "83% 14%"});
TweenMax.set(famArmM, {transformOrigin: "100% 0%"});
TweenMax.set(famArmL, {transformOrigin: "32% 0%"});
TweenMax.set(sceneryBounds, {scaleX: 1.571, scaleY: 1.25, transformOrigin: "100% 100%"});
TweenMax.set(frame, {scaleX: 1.444, scaleY: 1.19, transformOrigin: "100% 100%"});
TweenMax.set(insetT, {y: -80, scaleX: 1.571, transformOrigin: "100% 50%"});
TweenMax.set(insetL, {x: -200, y: -80});
TweenMax.set(insetL2, {x: -200});
TweenMax.set(edgeB, {x: -200});
TweenMax.set(edgeR, {y: -80});
TweenMax.set(scenery, {x: -1470});
TweenMax.set(people, {x: -1425});

// build timelines for secondary motion
indTl = new TimelineMax({paused: true});
indTl
	.fromTo(indArm, .8, {rotation: "12deg"}, {rotation: "0deg", ease: Quad.easeOut}, ".4")
	.fromTo(indThumb, .8, {x: -20, y: 6, rotation: "10deg"}, {x: 0, y: 0, rotation: "0deg", ease: Quad.easeOut}, ".4")
;
coupTl = new TimelineMax({paused: true});
coupTl
	.fromTo(coupArmL, .8, {rotation: "15deg"}, {rotation: "0deg", ease: Quad.easeOut}, ".4")
	.fromTo(coupArmM, .8, {rotation: "15deg"}, {rotation: "0deg", ease: Quad.easeOut}, ".2")
;
famTl = new TimelineMax({paused: true});
famTl
	.fromTo(famArmL, .8, {rotation: "10deg"}, {rotation: "0deg", ease: Quad.easeOut}, ".4")
	.fromTo(famArmM, 1.2, {rotation: "-20deg"}, {rotation: "0deg", ease: Quad.easeOut}, "0")
;
famTl.progress(1);

// function called to change the scene
function changeScene(newScene) {
	// make sure a different option was selected
	if(newScene == curNum) {return;}
	
	// some temp vars
	let frameSX,frameSY,sceneSX,sceneSY,distL,distT,sceneX,peopleX;
	
	// create new scene timeline
	sceneTl = new TimelineMax({paused: true, repeat: 0});
	
	// see which state we're changing to
	switch(newScene) {
		// change portrait to individual
		case 1:
			// set individual vars
			frameSX = 1;
			frameSY = 1;
			sceneSX = 1;
			sceneSY = 1;
			distL = 0;
			distT = 0;
			sceneX = 0;
			peopleX = 0;
			// add individual timeline of secondary motion
			sceneTl.fromTo(indTl, indTl.duration(), {progress: 0}, {progress: 1, ease: Linear.easeNone}, "0")
			break;
		// change portrait to couple
		case 2:
			// set couple vars
			frameSX = 1.222;
			frameSY = 1.095;
			sceneSX = 1.286;
			sceneSY = 1.125;
			distL = -100;
			distT = -40;
			sceneX = -770;
			peopleX = -725;
			// add couple timeline of secondary motion
			sceneTl.fromTo(coupTl, coupTl.duration(), {progress: 0}, {progress: 1, ease: Linear.easeNone}, "0")
			break;
		// change portrait to family
		case 3:
			// set family vars
			frameSX = 1.444;
			frameSY = 1.19;
			sceneSX = 1.571;
			sceneSY = 1.25;
			distL = -200;
			distT = -80;
			sceneX = -1470;
			peopleX = -1425;
			// add family timeline of secondary motion
			sceneTl.fromTo(famTl, famTl.duration(), {progress: 0}, {progress: 1, ease: Linear.easeNone}, "0")
			break;
	}
	
	// set var to reflect what scene we're showing
	curNum = newScene;
	
	// build scene timeline with vars from above
	sceneTl
		.to(scenery, .85, {x: sceneX, ease: Power2.easeOut}, "0")
		.to(people, 1, {x: peopleX, ease: Power2.easeOut}, "0")
		.to(frame, dur, {scaleX: frameSX, scaleY: frameSY, ease: ease}, "0")
		.to(sceneryBounds, dur, {scaleX: sceneSX, scaleY: sceneSY, ease: ease}, "0")
		.to(insetT, dur, {y: distT, scaleX: sceneSX, ease: ease}, "0")
		.to(insetL, dur, {x: distL, y: distT, ease: ease}, "0")
		.to(insetL2, dur, {x: distL, ease: ease}, "0")
		.to(edgeB, dur, {x: distL, ease: ease}, "0")
		.to(edgeR, dur, {y: distT, ease: ease}, "0")
	;
	// play the timeline
	sceneTl.play();
	
}

// utility function to select elements
function select(targ) {return document.querySelector(targ);}




/* demo button functionality */
var individualBtn = select('#individual-btn');
var coupleBtn = select('#couple-btn');
var familyBtn = select('#family-btn');

individualBtn.addEventListener('click', () => {changeScene(1);} );
coupleBtn.addEventListener('click', () => { changeScene(2); });
familyBtn.addEventListener('click', () => { changeScene(3); });

coupleBtn.click();