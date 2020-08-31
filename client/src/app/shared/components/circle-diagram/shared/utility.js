import { isPhoneViewport, isTabletViewport } from '../../../../../utils'

const circleDiagramOptions = {
    width: 'width',
    height: 'height',
    radius: 'radius',
    innerRadius: 'innerRadius',
    padAngle: 'padAngle'
}

const { width, height, radius, innerRadius, padAngle } = circleDiagramOptions

const smOptions = {
    [width]: 104,
    [height]: 104,
    [radius]: 50,
    [innerRadius]: 32,
    [padAngle]: 0.03
}

const mdOptions = {
    [width]: 160,
    [height]: 160,
    [radius]: 80,
    [innerRadius]: 65,
    [padAngle]: 0.02
}

const lgOptions = {
    [width]: 256,
    [height]: 256,
    [radius]: 128,
    [innerRadius]: 112,
    [padAngle]: 0.01
}

const setOption = (prop) => {

    if (isPhoneViewport()) {
        return smOptions[prop]
    }

    if (isTabletViewport()) {
        return mdOptions[prop]
    }

    return lgOptions[prop]

}

export const setOptions = () => ({
    [width]: setOption(width),
    [height]: setOption(height),
    [radius]: setOption(radius),
    [innerRadius]: setOption(innerRadius),
    [padAngle]: setOption(padAngle)
})
