import { useReducer, useEffect, useLayoutEffect } from 'react';
import simpleReducer from '../../../../assets/simpleReducer';

// Could be passed in as an argument
const TRIGGER_THRESHOLD = window.innerWidth / 1.8;
const MAX_OFFSET = window.innerWidth;
const MIN_OFFSET = 10;

export const DIRECTION = {
    NONE: "NONE",
    LEFT: "LEFT",
    RIGHT: "RIGHT",
}

const bgColor = {
    danger: "var(--danger)",
    confirm: "var(--success)",
    none: "initial"
}

const inititalState = {
    direction: DIRECTION.NONE,
    touchStart: [-1, -1],
    offsetX: -1,
    // Might be clearer if this was also a direction
    trigger: false,
    block: false,
}

export default function useSwipe(item, background, onLeftSwipe, onRightSwipe) {
    const [state, setState] = useReducer(simpleReducer, inititalState);

    // Block swipe if refs not present
    useEffect(() => {
        setState({ block: (!item || !background) ? true : false });
    }, [item, background])

    // Animate offset
    useEffect(() => {
        if (item && background && item) {
            const { offsetX } = state;

            item.style.transform = `translateX(${offsetX}px)`;
            background.style.opacity = (Math.abs(offsetX) / TRIGGER_THRESHOLD);
        }
    }, [state.offsetX]);

    // Handle direction change
    useEffect(() => {
        if (state.direction !== DIRECTION.NONE && item && background) {
            const swipingLeft = state.direction === DIRECTION.LEFT;

            // Toggle background color if callback provided
            swipingLeft
                ? background.style.backgroundColor = onLeftSwipe ? bgColor.danger : bgColor.none
                : background.style.backgroundColor = onRightSwipe ? bgColor.success : bgColor.none
        }
    }, [state.direction])

    // Touch start
    const onTouchStart = (e) => {
        if (state.block) return;

        const { clientX, clientY } = e.changedTouches[0];
        setState({
            touchStart: [clientX, clientY]
        })
    }

    // Touch move
    const onTouchMove = (e) => {
        if (state.block) return;

        const { clientX, clientY } = e.changedTouches[0];

        let offsetX = -(state.touchStart[0] - clientX);
        const offsetY = -(state.touchStart[1] - clientY);
        const abs = Math.abs;

        if (abs(offsetX) < MIN_OFFSET) {
            return;
        }
        // Block swipe if user is scrolling Y
        else if (abs(offsetX) < abs(offsetY) && offsetY > MIN_OFFSET) {
            setState({ block: true });
            reset();
            return;
        }

        const swipingLeft = offsetX < 0;
        // Could probably do without this
        const unsetMax = 100;

        if (!onRightSwipe && !swipingLeft) {
            offsetX = offsetX > unsetMax ? unsetMax : offsetX;
        }
        else if (!onLeftSwipe && swipingLeft) {
            offsetX = offsetX < -unsetMax ? -unsetMax : offsetX;
        }

        setState({
            offsetX,
            direction: swipingLeft ? DIRECTION.LEFT : DIRECTION.RIGHT,
            trigger: abs(offsetX) > TRIGGER_THRESHOLD
        });
    }

    // Touch end
    const onTouchEnd = () => {
        if (!state.trigger) {
            reset();
            return;
        }

        state.direction === DIRECTION.LEFT
            ? onLeftSwipe && onLeftSwipe()
            : onRightSwipe && onRightSwipe()

        reset();
    }

    const reset = () => {
        if (!item) {
            return;
        };

        item.style.transition = "all .2s";
        item.style.transform = "translateX(-1px)";

        setTimeout(() => {
            item.style.transition = "none";
            setState(inititalState);
        }, 300)
    }

    return {
        onTouch: { onTouchStart, onTouchMove, onTouchEnd },
        direction: state.direction,
        trigger: state.trigger,
    }
}