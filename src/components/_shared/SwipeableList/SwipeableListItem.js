import React from 'react';
import styles from './SwipeableList.module.css';
import { DIRECTION, START_THRESHOLD, TRIGGER_THRESHOLD } from './contants';
import PropTypes from 'prop-types';
import { FaTrash, FaCheck } from 'react-icons/fa';
import simpleReducer from '../../../assets/simpleReducer';

const initialState = {
    direction: DIRECTION.none,
    trigger: DIRECTION.none,
    swipeStart: [0, 0],
    isSwiping: false,
    distance: 0,
}

// Could be made more generic in the future
// Currently tightly coupled to the passed item
// Could pass in React nodes instead of hardcoding them here, but makes animations harder to manage
export default function SwipeableListItem(props) {
    const { item, onLeftSwipe, onRightSwipe } = props;
    const [state, setState] = React.useReducer(simpleReducer, initialState);

    // REFS
    const contentRef = React.useRef(null);
    const itemRef = React.useRef(null);
    const bgRef = React.useRef(null);

    // LIFECYCLE
    // On swipe distance change
    React.useLayoutEffect(() => {
        const animateItem = () => {
            // Animate X position
            contentRef.current.style.transform = `translateX(${state.distance}px)`;

            // Animate background
            const bgOpacity = Math.abs(state.distance / TRIGGER_THRESHOLD).toFixed(2);
            bgRef.current.style.opacity = bgOpacity;
        }

        if (bgRef.current && contentRef.current) {
            animateItem();
        }
    }, [state.distance, bgRef, contentRef]);

    // On swipe direction change
    React.useEffect(() => {
        const updateClass = (className) => {
            bgRef.current.className = className;
        }

        if (bgRef.current) {
            if (state.direction === DIRECTION.left && onLeftSwipe) {
                updateClass(styles.bg_left);
            }
            else if (state.direction === DIRECTION.right && onRightSwipe) {
                updateClass(styles.bg_right);
            }
            else {
                updateClass(styles.bg);
            }
        }
    }, [state.direction, bgRef, onLeftSwipe, onRightSwipe]);

    // EVENT HANDLERS
    // Swipe start
    const onSwipeStart = (e) => {
        if (!e && !state.swipeStart[0]) {
            return;
        }

        const { clientX, clientY } = e;

        let startState = initialState;
        startState.swipeStart = [clientX, clientY];
        startState.isSwiping = true;

        setState(startState);
    }

    // Swipe move
    const onSwipeMove = (e) => {
        if (!e || !state.isSwiping) {
            return;
        }

        const { clientX, clientY } = e;
        const [startX, startY] = state.swipeStart;
        let { trigger, distance, direction } = state;

        const offsetX = clientX - startX;
        const offsetY = clientY - startY;
        const absX = Math.abs(offsetX);
        const absY = Math.abs(offsetY);

        // Start threshold reached
        if (absX > START_THRESHOLD) {
            // Scrolling Y axis
            if (absY > absX) {
                resetContent();
                return;
            }

            // Trigger threshold reached
            trigger = absX > TRIGGER_THRESHOLD ? direction : DIRECTION.none;

            direction = offsetX < 0 ? DIRECTION.left : DIRECTION.right;
            distance = offsetX;

            setState({ trigger, distance, direction });
        }
    }

    // Swipe end
    const onSwipeEnd = () => {
        const { trigger } = state;

        if (onLeftSwipe && trigger === DIRECTION.left) {
            onLeftSwipe();
            removeItem();
        }
        else if (onRightSwipe && trigger === DIRECTION.right) {
            onRightSwipe();
            // removeItem();
        }
        else {
            resetContent();
        }
    }

    const resetContent = () => {
        if (contentRef.current && state.distance) {
            contentRef.current.className = styles.content_reset;

            setTimeout(() => {
                setState(initialState);
                contentRef.current.className = styles.content;
            }, 300)
        }
    }

    const removeItem = () => {

    }

    // EVENT OBJECT
    const swipeEvents = {
        // Touch
        onTouchStart: (e) => onSwipeStart(e.changedTouches[0]),
        onTouchMove: (e) => onSwipeMove(e.changedTouches[0]),
        onTouchEnd: () => onSwipeEnd(),
        onTouchCancel: () => onSwipeEnd(),
        // Mouse
        onMouseDown: (e) => onSwipeStart(e),
        onMouseMove: (e) => onSwipeMove(e),
        onMouseUp: () => onSwipeEnd(),
        onMouseLeave: () => onSwipeEnd(),
    }

    return (
        <div ref={itemRef} className={styles.listItem}>
            <div ref={bgRef} className={styles.bg}>
                {state.direction === DIRECTION.left && onLeftSwipe &&
                    <React.Fragment>
                        <p className={styles.bgText}>
                            Ta bort '{item.name}'?
                        </p>
                        <FaTrash
                            className={state.trigger === DIRECTION.left ? styles.bgIcon_wobble : styles.bgIcon}
                        />
                    </React.Fragment>
                }
                {state.direction === DIRECTION.right && onRightSwipe &&
                    <React.Fragment>
                        <FaCheck
                            className={state.trigger === DIRECTION.left ? styles.bgIcon_wobble : styles.bgIcon}
                        />
                        <p className={styles.bgText}>
                            Bekräfta '{item.name}'?
                        </p>
                    </React.Fragment>
                }
            </div>

            <div
                ref={contentRef}
                className={styles.content}
                {...swipeEvents}
            >
                <div className={styles.contentText}>
                    <h3 className={styles.name}>
                        {item.name}
                    </h3>
                    <p className={styles.description}>
                        {item.description}
                    </p>
                </div>

                <div className={styles.categoryColor} style={{ background: item.colorHex }} />
            </div>
        </div>
    )
}

const listItemPropType = PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    colorHex: PropTypes.string.isRequired,
    description: PropTypes.string,
})

SwipeableListItem.propTypes = {
    item: listItemPropType.isRequired,
    onLeftSwipe: PropTypes.func,
    onRightSwipe: PropTypes.func,
}

// FOR REFERENCE
// const SwipePropType = PropTypes.shape({
//     action: () => console.log("Something"),
//     content: <div>Hello</div>,
//     animation: ??
// })


