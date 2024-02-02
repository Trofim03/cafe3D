import { 
    FPS, 
    FRAMES, 
    FRAME_ANIMATION_TIME, 
    IFrame, 
    IFrameElement 
} from "./constants"

// ===============АНИМАЦИЯ ПО СОСТОЯНИЮ СКРОЛЛА===============

// export const getPercentOfValue = (minScrollValue: number, maxScrollValue: number, currentScroll: number, valueObjFrom: IFrameElement, valueObjTo: IFrameElement) => {
// 	const changedCoords = Object.keys(valueObjFrom).map(key => {
// 		const typedKey = key as keyof IFrameElement
// 		const diffOfValue = valueObjTo[typedKey] - valueObjFrom[typedKey]
// 		const diffOfScroll = maxScrollValue - minScrollValue
		
// 		const scrollPercent = (currentScroll - minScrollValue) / (diffOfScroll / 100)

// 		const currentValuePercent = (diffOfValue / 100) * scrollPercent

// 		if (currentValuePercent) {
// 			return valueObjFrom[typedKey] + currentValuePercent
// 		} else {
// 			return valueObjFrom[typedKey]
// 		}
// 	})

// 	return changedCoords
// }

// export const setCameraPosition = (camera: THREE.PerspectiveCamera) => {
// 	const scroll = window.scrollY
// 	const fullPageHeight = document.body.scrollHeight

// 	const heightFragmentHeight = fullPageHeight / FRAMES.length

// 	const currentFrame = scroll / heightFragmentHeight

// 	const startFrameIndex = Math.floor(currentFrame)
// 	const endFrameIndex = Math.min(Math.ceil(currentFrame), FRAMES.length - 1)

// 	const [posX, posY, posZ] = getPercentOfValue(
// 		startFrameIndex * heightFragmentHeight, 
// 		endFrameIndex * heightFragmentHeight,
// 		scroll,
// 		FRAMES[startFrameIndex].position,
// 		FRAMES[endFrameIndex].position,
// 		)

// 	const [rotationX, rotationY, rotationZ] = getPercentOfValue(
// 		startFrameIndex * heightFragmentHeight, 
// 		endFrameIndex * heightFragmentHeight,
// 		scroll,
// 		FRAMES[startFrameIndex].rotation,
// 		FRAMES[endFrameIndex].rotation,
// 		)

// 		camera.position.set(posX, posY, posZ)
// 		camera.rotation.set(rotationX, rotationY, rotationZ)
// }

// =================== АНИМАЦИЯ ПО ФРЕЙМАМ ===================

// const lastScrollState = {
// 	lastFrameIndex: 0,
// 	lastScrollValue: 0,
// 	lastScrolledPoint: 0,
// 	animationIsPlay: false
// }

// export const setCameraPosition = (camera: THREE.PerspectiveCamera, rerenderFn: (camera: THREE.PerspectiveCamera) => void) => {
// 	const scroll = window.scrollY
// 	const fullPageHeight = document.body.scrollHeight

// 	const heightFragmentHeight = fullPageHeight / FRAMES.length

// 	const currentFrameIndex = ((scroll + window.innerHeight) / heightFragmentHeight) - 1

// 	const startFrameIndex = Math.floor(currentFrameIndex)
// 	const endFrameIndex = Math.min(Math.ceil(currentFrameIndex), FRAMES.length - 1)

// 	const scrollToBottom = lastScrollState.lastScrollValue < scroll

// 	const nextFrame = lastScrollState.lastFrameIndex < endFrameIndex
// 	const prevFrame = lastScrollState.lastFrameIndex > startFrameIndex

// 	if (scrollToBottom) {
// 		if (nextFrame) {
// 			lastScrollState.lastFrameIndex = endFrameIndex
// 			startFrameAnimation(
// 				camera,
// 				rerenderFn,
// 				FRAMES[startFrameIndex],
// 				FRAMES[endFrameIndex],
// 			)
// 		}

// 		lastScrollState.lastScrollValue = scroll
// 	} else {
// 		if (prevFrame) {
// 			lastScrollState.lastFrameIndex = startFrameIndex
// 			startFrameAnimation(
// 				camera,
// 				rerenderFn,
// 				FRAMES[startFrameIndex],
// 				FRAMES[endFrameIndex],
// 				false
// 			)
// 		}
		
// 		lastScrollState.lastScrollValue = scroll
// 	}
// }

// export const startFrameAnimation = (
// 	camera: THREE.PerspectiveCamera, 
// 	rerenderFn: (camera: THREE.PerspectiveCamera) => void, 
// 	frameFrom: IFrame, frameTo: IFrame,
// 	nextFrame: boolean = true
// ) => {
// 	const timeStep = FRAME_ANIMATION_TIME / FPS
// 	const maxSteps = FRAME_ANIMATION_TIME / timeStep
// 	let currentStep = 0

// 	if (!lastScrollState.animationIsPlay) {
// 		lastScrollState.animationIsPlay = true
// 		document.body.style.overflow = 'hidden'

// 		const positionXDiff = frameTo.position.x - frameFrom.position.x
// 		const positionYDiff = frameTo.position.y - frameFrom.position.y
// 		const positionZDiff = frameTo.position.z - frameFrom.position.z

// 		const rotationXDiff = frameTo.rotation.x - frameFrom.rotation.x
// 		const rotationYDiff = frameTo.rotation.y - frameFrom.rotation.y
// 		const rotationZDiff = frameTo.rotation.z - frameFrom.rotation.z

// 		const interval = setInterval(() => {
// 			if (currentStep <= maxSteps) {
// 				const currentAnimationPercent = currentStep / (maxSteps / 100)

// 				const xPercentPosValue = (positionXDiff / 100) * currentAnimationPercent
// 				const yPercentPosValue = (positionYDiff / 100) * currentAnimationPercent
// 				const zPercentPosValue = (positionZDiff / 100) * currentAnimationPercent

// 				const xPercentRotValue = (rotationXDiff / 100) * currentAnimationPercent
// 				const yPercentRotValue = (rotationYDiff / 100) * currentAnimationPercent
// 				const zPercentRotValue = (rotationZDiff / 100) * currentAnimationPercent

// 				if (nextFrame) {
// 					camera.position.set(frameFrom.position.x + xPercentPosValue, frameFrom.position.y + yPercentPosValue, frameFrom.position.z + zPercentPosValue)
// 					camera.rotation.set(frameFrom.rotation.x + xPercentRotValue, frameFrom.rotation.y + yPercentRotValue, frameFrom.rotation.z + zPercentRotValue)
// 				} else {
// 					camera.position.set(frameTo.position.x - xPercentPosValue, frameTo.position.y - yPercentPosValue, frameTo.position.z - zPercentPosValue)
// 					camera.rotation.set(frameTo.rotation.x - xPercentRotValue, frameTo.rotation.y - yPercentRotValue, frameTo.rotation.z - zPercentRotValue)
// 				}

// 				rerenderFn(camera)

// 				++currentStep
// 			}
// 		}, timeStep)

// 		setTimeout(() => {
// 			clearInterval(interval)
// 			document.body.removeAttribute('style')

// 			if (nextFrame) {
// 				camera.position.set(frameTo.position.x, frameTo.position.y, frameTo.position.z)
// 				camera.rotation.set(frameTo.rotation.x, frameTo.rotation.y, frameTo.rotation.z)
// 			} else {
// 				camera.position.set(frameFrom.position.x, frameFrom.position.y, frameFrom.position.z)
// 				camera.rotation.set(frameFrom.rotation.x, frameFrom.rotation.y, frameTo.rotation.z)
// 			}

// 			rerenderFn(camera)

// 			lastScrollState.animationIsPlay = false
// 		}, FRAME_ANIMATION_TIME)

// 	}
// }