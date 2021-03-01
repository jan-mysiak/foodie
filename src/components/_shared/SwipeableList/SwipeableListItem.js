import { useEffect, useRef, useReducer, Fragment } from 'react';
import styles from './SwipeableList.module.css';
import { DIRECTION, START_THRESHOLD } from './contants';
import PropTypes from 'prop-types';
import { FaTrash, FaCheck } from 'react-icons/fa';
import simpleReducer from '../../../assets/simpleReducer';

const initialState = {
    direction: DIRECTION.none,
    trigger: DIRECTION.none,
    swipeStart: [0, 0],
    isSwiping: false,
}

// Could be made more generic in the future
// Currently tightly coupled to the passed item
// Maybe pass in React nodes instead of hardcoding them here
export default function SwipeableListItem(props) {
    const { item, onLeftSwipe, onRightSwipe, triggerAt = 50 } = props;
    const [state, setState] = useReducer(simpleReducer, initialState);

    // REFS
    const contentRef = useRef(null);
    const itemRef = useRef(null);
    const bgRef = useRef(null);
    const triggerThreshold = useRef(300);

    useEffect(() => {
        if (itemRef.current) {
            triggerThreshold.current = (itemRef.current.offsetWidth / 100) * triggerAt
        }
    }, [itemRef, triggerAt])

    useEffect(() => {
        if (bgRef.current) {
            if (state.direction === DIRECTION.left && onLeftSwipe) {
                bgRef.current.className = styles.bg_left;
            }
            else if (state.direction === DIRECTION.right && onRightSwipe) {
                bgRef.current.className = styles.bg_right;
            }
            else {
                bgRef.current.className = styles.bg;
            }
        }
    }, [state.direction, bgRef, onRightSwipe, onLeftSwipe])

    // EVENT HANDLERS
    // Swipe start
    const onSwipeStart = (e) => {
        if (state.isSwiping) {
            return;
        }

        const { clientX, clientY } = e;

        contentRef.current.className = styles.content_active;

        setState({
            direction: DIRECTION.none,
            trigger: false,
            swipeStart: [clientX, clientY],
            isSwiping: true,
        })
    }

    // Swipe move
    const onSwipeMove = (e) => {
        if (!state.isSwiping) {
            return;
        }

        const { clientX, clientY } = e;
        const [startX, startY] = state.swipeStart;

        const offsetX = clientX - startX;
        const offsetY = clientY - startY;
        const absX = Math.abs(offsetX);
        const absY = Math.abs(offsetY);

        // Minimum threshold reached
        if (absX > START_THRESHOLD) {
            // User is scrolling Y axis
            if (absY > absX) {
                reset();
                return;
            }

            setState({
                direction: offsetX < 0 ? DIRECTION.left : DIRECTION.right,
                trigger: absX > triggerThreshold.current ? true : false
            });

            // Should request animation frame
            setContentPosition(offsetX);
            setBackgroundOpacity((absX / triggerThreshold.current).toFixed(2));
        }
    }

    // Swipe end
    const onSwipeEnd = () => {
        if (!state.isSwiping) {
            return;
        }
        else if (state.trigger) {
            if (state.direction === DIRECTION.left && onLeftSwipe) {
                removeListItem();
                setTimeout(() => {
                    onLeftSwipe();
                }, 600);
            }
            else if (state.direction === DIRECTION.right && onRightSwipe) {
                // NEVER USED
            }
        }

        reset();
    }

    const setContentPosition = (offset) => {
        if (contentRef.current) {
            contentRef.current.style.transform = `translateX(${offset}px)`;
        }
    }

    const setBackgroundOpacity = (opacity) => {
        if (bgRef.current) {
            bgRef.current.style.opacity = opacity;
        }
    }

    const removeListItem = () => {
        if (itemRef.current) {
            itemRef.current.className = styles.listItem_remove;
        }
    }

    const reset = () => {
        if (!contentRef.current) {
            return;
        }

        contentRef.current.className = styles.content_reset;
        setState({ isSwiping: false });
        setContentPosition(0);

        setTimeout(() => {
            if (contentRef.current) {
                contentRef.current.className = styles.content;
                setState(initialState);
            }
        }, 300)
    }

    // EVENTS
    const swipeEvents = {
        // Touch
        onTouchStart: (e) => onSwipeStart(e.changedTouches[0]),
        onTouchMove: (e) => onSwipeMove(e.changedTouches[0]),
        onTouchEnd: () => onSwipeEnd(),
        onTouchCancel: () => reset(),
        // Mouse
        onMouseDownCapture: (e) => onSwipeStart(e),
        onMouseMove: (e) => onSwipeMove(e),
        onMouseUp: () => onSwipeEnd(),
        onMouseLeave: () => reset(),
    }

    return (
        <div
            className={styles.listItem}
            ref={itemRef}
            {...swipeEvents}
        >
            <div ref={bgRef} className={styles.bg}>
                {state.direction === DIRECTION.left && onLeftSwipe &&
                    <Fragment>
                        <p className={styles.bgText}>
                            Ta bort "{item.name}"?
                        </p>
                        <FaTrash
                            className={state.trigger ? styles.bgIcon_wobble : styles.bgIcon}
                        />
                    </Fragment>
                }
                {state.direction === DIRECTION.right && onRightSwipe &&
                    <Fragment>
                        <FaCheck
                            className={state.trigger ? styles.bgIcon_wobble : styles.bgIcon}
                        />
                        <p className={styles.bgText}>
                            Bekräfta "{item.name}"?
                        </p>
                    </Fragment>
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
    deleted: PropTypes.bool,
})

SwipeableListItem.propTypes = {
    item: listItemPropType.isRequired,
    onLeftSwipe: PropTypes.func,
    onRightSwipe: PropTypes.func,
}

// FOR REFERENCE
// const SwipePropType = PropTypes.shape({
//     action: () => console.log(),
//     content: <div></div>,
//     animation: ??
// })


