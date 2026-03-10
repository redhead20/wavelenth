let targetAngle = 0
let targetVisible = false
let needleLocked = false
let currentAngle = 0

const zones = document.getElementById("zones")
const needle = document.getElementById("needle")
const dial = document.getElementById("dial")

function newRound(){

targetAngle = Math.random()*180 - 90
zones.innerHTML = ""
targetVisible = false
needleLocked = false
currentAngle = 0

needle.setAttribute("transform",`rotate(0 250 250)`)

}

function toggleTarget(){

if(targetVisible){

// hide target
zones.innerHTML = ""
targetVisible = false

// allow adjustments again
needleLocked = false

}else{

// show target
zones.innerHTML = ""

createZone(0,40,"#ff4d4d")
createZone(10,30,"#ff9f43")
createZone(20,20,"#ffe95e")
createZone(28,10,"#00ff95")

targetVisible = true

// freeze guess while viewing
needleLocked = true

}

}

function createZone(radiusOffset,width,color){

let start = targetAngle - width/2
let end = targetAngle + width/2

let rOuter = 200
let rInner = 200 - radiusOffset

let startRad = (start+90)*Math.PI/180
let endRad = (end+90)*Math.PI/180

let cx = 250
let cy = 250

let x1 = cx + rOuter*Math.cos(startRad)
let y1 = cy - rOuter*Math.sin(startRad)

let x2 = cx + rOuter*Math.cos(endRad)
let y2 = cy - rOuter*Math.sin(endRad)

let x3 = cx + rInner*Math.cos(endRad)
let y3 = cy - rInner*Math.sin(endRad)

let x4 = cx + rInner*Math.cos(startRad)
let y4 = cy - rInner*Math.sin(startRad)

let path = `
M ${x1} ${y1}
A ${rOuter} ${rOuter} 0 0 1 ${x2} ${y2}
L ${x3} ${y3}
A ${rInner} ${rInner} 0 0 0 ${x4} ${y4}
Z
`

let zone = document.createElementNS("http://www.w3.org/2000/svg","path")
zone.setAttribute("d",path)
zone.setAttribute("fill",color)

zones.appendChild(zone)

}

document.addEventListener("mousemove", e => {

if(needleLocked) return

let rect = dial.getBoundingClientRect()

let cx = rect.left + rect.width/2
let cy = rect.bottom

let dx = e.clientX - cx
let dy = cy - e.clientY

currentAngle = Math.atan2(dx,dy) * 180/Math.PI
currentAngle = Math.max(-90,Math.min(90,currentAngle))

needle.setAttribute("transform",`rotate(${currentAngle} 250 250)`)

})