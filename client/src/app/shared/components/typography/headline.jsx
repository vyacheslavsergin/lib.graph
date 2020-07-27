import React from 'react';
import PropTypes from 'prop-types'
import classnames from 'classnames'

import classes from './headline.module.scss'

export const Headline = ({children, mode: Element, theme}) => {
    return (
        <Element className={classnames(classes.title, {
            [classes['h1']]: Element === "h1",
            [classes['h2']]: Element === "h2",
            [theme]: theme
        })}>
            {children}
        </Element>
    )
}

Headline.propTypes = {
    children: PropTypes.node,
    mode: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5']),
    theme: PropTypes.string
}

Headline.defaultProps = {
    mode: 'h1',
    theme: ''
}

Headline.displayName = 'Typography.Headline'
