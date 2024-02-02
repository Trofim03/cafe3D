export const FRAME_ANIMATION_TIME = 1000
export const FPS = 60

export const FRAMES: IFrame[] = [
	{
		position: {
			x: 5,
			y: 5,
			z: 15
		},
		rotation: {
			x: 0,
			y: 0,
			z: 0
		}
	},
	{
		position: {
			x: 5,
			y: 5,
			z: 10
		},
		rotation: {
			x: 0,
			y: 0,
			z: 0
		}
	},
	{
		position: {
			x: 5,
			y: 5,
			z: 10
		},
		rotation: {
			x: 0,
			y: 1.5,
			z: 0
		}
	},
	{
		position: {
			x: 1,
			y: 5,
			z: 10
		},
		rotation: {
			x: 0,
			y: 1.5,
			z: 0
		}
	},
	{
		position: {
			x: 1,
			y: 5,
			z: 15
		},
		rotation: {
			x: 0,
			y: 0,
			z: 0
		}
	},
]

export interface IFrame {
    position: IFrameElement,
    rotation: IFrameElement
}

export interface IFrameElement {
    x: number,
    y: number,
    z: number
}