import { useEffect, useState, RefObject } from 'react';

interface ResizeOptions {
  dragRef?: RefObject<HTMLElement>;
  defaultOffset: { x: number; y: number };
  defaultSize: { width: number; height: number };
  boundary: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  resizable?: boolean;
  resizeThreshold?: number;
  constraintSize?: number;
}

function useElementResize(ref: RefObject<HTMLElement>, options: ResizeOptions) {
  const {
    defaultOffset,
    defaultSize,
    boundary,
    resizable = true,
    resizeThreshold = 10,
    constraintSize = 200,
  } = options;
  const [offset, setOffset] = useState(defaultOffset);
  const [size, setSize] = useState(defaultSize);
  const cursorPos = useCursor(ref, resizeThreshold, resizable);

  useEffect(() => {
    const target = ref.current;
    if (!target) return;
    const dragTarget = options.dragRef && options.dragRef.current;
    const cover = document.createElement('div');
    cover.style.position = 'fixed';
    cover.style.top = '0';
    cover.style.left = '0';
    cover.style.right = '0';
    cover.style.bottom = '0';
    const previousOffset = { ...offset };
    const previousSize = { ...size };
    let _boundary: typeof boundary;
    let originMouseX: number;
    let originMouseY: number;
    let shouldCover = false;

    function onDragging(e: MouseEvent) {
      if (shouldCover && !document.body.contains(cover)) {
        document.body.appendChild(cover);
      }
      const { pageX, pageY } = getComputedPagePosition(e, _boundary);
      const x = pageX - originMouseX + previousOffset.x;
      const y = pageY - originMouseY + previousOffset.y;
      setOffset({ x, y });
    }
    function onDragEnd(e: MouseEvent) {
      cover.remove();
      shouldCover = false;
      const { pageX, pageY } = getComputedPagePosition(e, _boundary);
      previousOffset.x += pageX - originMouseX;
      previousOffset.y += pageY - originMouseY;
      window.removeEventListener('mousemove', onDragging);
      window.removeEventListener('mouseup', onDragEnd);
    }
    function onDragStart(e: MouseEvent) {
      window.addEventListener('mousemove', onDragging);
      window.addEventListener('mouseup', onDragEnd);
    }
    function onDraggingTop(e: MouseEvent) {
      const { pageY } = getComputedPagePosition(e, _boundary);
      const { x } = previousOffset;
      const y = pageY - originMouseY + previousOffset.y;
      setOffset({ x, y });
    }
    function onDragEndTop(e: MouseEvent) {
      const { pageY } = getComputedPagePosition(e, _boundary);
      previousOffset.y += pageY - originMouseY;
      window.removeEventListener('mousemove', onDraggingTop);
      window.removeEventListener('mouseup', onDragEndTop);
    }
    function onDragStartTop(e: MouseEvent) {
      window.addEventListener('mousemove', onDraggingTop);
      window.addEventListener('mouseup', onDragEndTop);
    }
    function onDraggingLeft(e: MouseEvent) {
      const { pageX } = getComputedPagePosition(e, _boundary);
      const x = pageX - originMouseX + previousOffset.x;
      const { y } = previousOffset;
      setOffset({ x, y });
    }
    function onDragEndLeft(e: MouseEvent) {
      const { pageX } = getComputedPagePosition(e, _boundary);
      previousOffset.x += pageX - originMouseX;
      window.removeEventListener('mousemove', onDraggingLeft);
      window.removeEventListener('mouseup', onDragEndLeft);
    }
    function onDragStartLeft(e: MouseEvent) {
      window.addEventListener('mousemove', onDraggingLeft);
      window.addEventListener('mouseup', onDragEndLeft);
    }
    function onResizingRight(e: MouseEvent) {
      const { pageX } = getComputedPagePosition(e, _boundary);
      const width = pageX - originMouseX + previousSize.width;
      const { height } = previousSize;
      setSize({ width, height });
    }
    function onResizeEndRight(e: MouseEvent) {
      const { pageX } = getComputedPagePosition(e, _boundary);
      previousSize.width += pageX - originMouseX;
      window.removeEventListener('mousemove', onResizingRight);
      window.removeEventListener('mouseup', onResizeEndRight);
    }
    function onResizeStartRight(e: MouseEvent) {
      window.addEventListener('mousemove', onResizingRight);
      window.addEventListener('mouseup', onResizeEndRight);
    }
    function onResizingBottom(e: MouseEvent) {
      const { pageY } = getComputedPagePosition(e, _boundary);
      const { width } = previousSize;
      const height = pageY - originMouseY + previousSize.height;
      setSize({ width, height });
    }
    function onResizeEndBottom(e: MouseEvent) {
      const { pageY } = getComputedPagePosition(e, _boundary);
      previousSize.height += pageY - originMouseY;
      window.removeEventListener('mousemove', onResizingBottom);
      window.removeEventListener('mouseup', onResizeEndBottom);
    }
    function onResizeStartBottom(e: MouseEvent) {
      window.addEventListener('mousemove', onResizingBottom);
      window.addEventListener('mouseup', onResizeEndBottom);
    }
    function onResizingLeft(e: MouseEvent) {
      const { pageX } = getComputedPagePosition(e, _boundary);
      const width = -pageX + originMouseX + previousSize.width;
      const { height } = previousSize;
      setSize({ width, height });
    }
    function onResizeEndLeft(e: MouseEvent) {
      const { pageX } = getComputedPagePosition(e, _boundary);
      previousSize.width += -pageX + originMouseX;
      window.removeEventListener('mousemove', onResizingLeft);
      window.removeEventListener('mouseup', onResizeEndLeft);
    }
    function onResizeStartLeft(e: MouseEvent) {
      window.addEventListener('mousemove', onResizingLeft);
      window.addEventListener('mouseup', onResizeEndLeft);
    }
    function onResizingTop(e: MouseEvent) {
      const { pageY } = getComputedPagePosition(e, _boundary);
      const height = -pageY + originMouseY + previousSize.height;
      const { width } = previousSize;
      setSize({ width, height });
    }
    function onResizeEndTop(e: MouseEvent) {
      const { pageY } = getComputedPagePosition(e, _boundary);
      previousSize.height += -pageY + originMouseY;
      window.removeEventListener('mousemove', onResizingTop);
      window.removeEventListener('mouseup', onResizeEndTop);
    }
    function onResizeStartTop(e: MouseEvent) {
      window.addEventListener('mousemove', onResizingTop);
      window.addEventListener('mouseup', onResizeEndTop);
    }
    function onResizingTopLeft(e: MouseEvent) {
      const { pageX, pageY } = getComputedPagePosition(e, _boundary);
      const width = -pageX + originMouseX + previousSize.width;
      const height = -pageY + originMouseY + previousSize.height;
      setSize({ width, height });
    }
    function onResizeEndTopLeft(e: MouseEvent) {
      const { pageX, pageY } = getComputedPagePosition(e, _boundary);
      previousSize.width += -pageX + originMouseX;
      previousSize.height += -pageY + originMouseY;
      window.removeEventListener('mousemove', onResizingTopLeft);
      window.removeEventListener('mouseup', onResizeEndTopLeft);
    }
    function onResizeStartTopLeft(e: MouseEvent) {
      window.addEventListener('mousemove', onResizingTopLeft);
      window.addEventListener('mouseup', onResizeEndTopLeft);
    }
    function onResizingTopRight(e: MouseEvent) {
      const { pageX, pageY } = getComputedPagePosition(e, _boundary);
      const width = pageX - originMouseX + previousSize.width;
      const height = -pageY + originMouseY + previousSize.height;
      setSize({ width, height });
    }
    function onResizeEndTopRight(e: MouseEvent) {
      const { pageX, pageY } = getComputedPagePosition(e, _boundary);
      previousSize.width += pageX - originMouseX;
      previousSize.height += -pageY + originMouseY;
      window.removeEventListener('mousemove', onResizingTopRight);
      window.removeEventListener('mouseup', onResizeEndTopRight);
    }
    function onResizeStartTopRight(e: MouseEvent) {
      window.addEventListener('mousemove', onResizingTopRight);
      window.addEventListener('mouseup', onResizeEndTopRight);
    }
    function onResizingBottomLeft(e: MouseEvent) {
      const { pageX, pageY } = getComputedPagePosition(e, _boundary);
      const width = -pageX + originMouseX + previousSize.width;
      const height = pageY - originMouseY + previousSize.height;
      setSize({ width, height });
    }
    function onResizeEndBottomLeft(e: MouseEvent) {
      const { pageX, pageY } = getComputedPagePosition(e, _boundary);
      previousSize.width += -pageX + originMouseX;
      previousSize.height += pageY - originMouseY;
      window.removeEventListener('mousemove', onResizingBottomLeft);
      window.removeEventListener('mouseup', onResizeEndBottomLeft);
    }
    function onResizeStartBottomLeft(e: MouseEvent) {
      window.addEventListener('mousemove', onResizingBottomLeft);
      window.addEventListener('mouseup', onResizeEndBottomLeft);
    }
    function onResizingBottomRight(e: MouseEvent) {
      const { pageX, pageY } = getComputedPagePosition(e, _boundary);
      const width = pageX - originMouseX + previousSize.width;
      const height = pageY - originMouseY + previousSize.height;
      setSize({ width, height });
    }
    function onResizeEndBottomRight(e: MouseEvent) {
      const { pageX, pageY } = getComputedPagePosition(e, _boundary);
      previousSize.width += pageX - originMouseX;
      previousSize.height += pageY - originMouseY;
      window.removeEventListener('mousemove', onResizingBottomRight);
      window.removeEventListener('mouseup', onResizeEndBottomRight);
    }
    function onResizeStartBottomRight(e: MouseEvent) {
      window.addEventListener('mousemove', onResizingBottomRight);
      window.addEventListener('mouseup', onResizeEndBottomRight);
    }
    function onMouseDown(e: MouseEvent) {
      originMouseX = e.pageX;
      originMouseY = e.pageY;
      _boundary = { ...boundary };
      if (dragTarget && e.target === dragTarget) {
        shouldCover = true;
        return onDragStart(e);
      }
      if (e.target !== target || !resizable) return;
      switch (cursorPos) {
        case 'topLeft':
          _boundary.right = originMouseX + previousSize.width - constraintSize;
          _boundary.bottom =
            originMouseY + previousSize.height - constraintSize;
          onResizeStartTopLeft(e);
          onDragStart(e);
          break;
        case 'left':
          _boundary.right = originMouseX + previousSize.width - constraintSize;
          onResizeStartLeft(e);
          onDragStartLeft(e);
          break;
        case 'bottomLeft':
          _boundary.right = originMouseX + previousSize.width - constraintSize;
          _boundary.top = originMouseY - previousSize.height + constraintSize;
          onResizeStartBottomLeft(e);
          onDragStartLeft(e);
          break;
        case 'top':
          _boundary.bottom =
            originMouseY + previousSize.height - constraintSize;
          onResizeStartTop(e);
          onDragStartTop(e);
          break;
        case 'topRight':
          _boundary.bottom =
            originMouseY + previousSize.height - constraintSize;
          _boundary.left = originMouseX - previousSize.width + constraintSize;
          onDragStartTop(e);
          onResizeStartTopRight(e);
          break;
        case 'right':
          _boundary.left = originMouseX - previousSize.width + constraintSize;
          onResizeStartRight(e);
          break;
        case 'bottomRight':
          _boundary.top = originMouseY - previousSize.height + constraintSize;
          _boundary.left = originMouseX - previousSize.width + constraintSize;
          onResizeStartBottomRight(e);
          break;
        case 'bottom':
          _boundary.top = originMouseY - previousSize.height + constraintSize;
          onResizeStartBottom(e);
          break;
        default:
      }
    }
    target.addEventListener('mousedown', onMouseDown);
    return () => {
      target.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onDraggingLeft);
      window.removeEventListener('mousemove', onDraggingTop);
      window.removeEventListener('mousemove', onDragging);
      window.removeEventListener('mouseup', onDragEndTop);
      window.removeEventListener('mouseup', onDragEndLeft);
      window.removeEventListener('mouseup', onDragEnd);
      window.removeEventListener('mousemove', onResizingTop);
      window.removeEventListener('mousemove', onResizingRight);
      window.removeEventListener('mousemove', onResizingBottom);
      window.removeEventListener('mousemove', onResizingLeft);
      window.removeEventListener('mousemove', onResizingBottomLeft);
      window.removeEventListener('mousemove', onResizingTopLeft);
      window.removeEventListener('mousemove', onResizingTopRight);
      window.removeEventListener('mousemove', onResizingBottomRight);
      window.removeEventListener('mouseup', onResizeEndTop);
      window.removeEventListener('mouseup', onResizeEndRight);
      window.removeEventListener('mouseup', onResizeEndBottom);
      window.removeEventListener('mouseup', onResizeEndLeft);
      window.removeEventListener('mouseup', onResizeEndBottomLeft);
      window.removeEventListener('mouseup', onResizeEndTopLeft);
      window.removeEventListener('mouseup', onResizeEndTopRight);
      window.removeEventListener('mouseup', onResizeEndBottomRight);
      cover.remove();
    };
  }, [boundary.top, boundary.right, boundary.bottom, boundary.left, cursorPos, offset, size]);
  return { offset, size };
}

function useCursor(ref: RefObject<HTMLElement>, threshold: number, resizable: boolean) {
  const [position, setPosition] = useState('');
  useEffect(() => {
    const target = ref.current;
    if (!target || !resizable) return;
    const cover = document.createElement('div');
    cover.style.position = 'fixed';
    cover.style.top = '0';
    cover.style.left = '0';
    cover.style.right = '0';
    cover.style.bottom = '0';
    let lock = false;
    function _setPosition(p: string) {
      setPosition(p);
      target.style.cursor = getCursorStyle(p);
      cover.style.cursor = getCursorStyle(p);
    }
    function onMouseDown(e: MouseEvent) {
      if (e.target !== target) return;
      onHover(e);
      lock = true;
      document.body.appendChild(cover);
      window.addEventListener('mouseup', onMouseUp);
    }
    function onMouseUp(e: MouseEvent) {
      lock = false;
      cover.remove();
      window.removeEventListener('mouseup', onMouseUp);
    }
    function onHoverEnd(e: MouseEvent) {
      if (lock) return;
      _setPosition('');
    }
    function onHover(e: MouseEvent) {
      if (lock) return;
      if (e.target !== target) return _setPosition('');
      const { offsetX, offsetY } = e as any;
      const { width, height } = target.getBoundingClientRect();
      if (offsetX < threshold) {
        if (offsetY < threshold) {
          _setPosition('topLeft');
        } else if (height - offsetY < threshold) {
          _setPosition('bottomLeft');
        } else {
          _setPosition('left');
        }
      } else if (offsetY < threshold) {
        if (width - offsetX < threshold) {
          _setPosition('topRight');
        } else {
          _setPosition('top');
        }
      } else if (width - offsetX < threshold) {
        if (height - offsetY < threshold) _setPosition('bottomRight');
        else _setPosition('right');
      } else if (height - offsetY < threshold) {
        _setPosition('bottom');
      } else {
        _setPosition('');
      }
    }
    target.addEventListener('mouseleave', onHoverEnd);
    target.addEventListener('mousemove', onHover);
    target.addEventListener('mousedown', onMouseDown);
    return () => {
      cover.remove();
      target.removeEventListener('mouseleave', onHoverEnd);
      target.removeEventListener('mousemove', onHover);
      target.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, []);
  return position;
}

function getComputedPagePosition(e: MouseEvent, boundary?: typeof boundary) {
  let { pageX, pageY } = e;
  if (!boundary) return { pageX, pageY };
  const { top, right, bottom, left } = boundary;
  if (pageX <= left) pageX = left;
  else if (pageX >= right) pageX = right;
  if (pageY <= top) pageY = top;
  else if (pageY >= bottom) pageY = bottom;
  return { pageX, pageY };
}

function getCursorStyle(pos: string) {
  switch (pos) {
    case 'top':
      return 'n-resize';
    case 'topRight':
      return 'ne-resize';
    case 'right':
      return 'e-resize';
    case 'bottomRight':
      return 'se-resize';
    case 'bottom':
      return 's-resize';
    case 'bottomLeft':
      return 'sw-resize';
    case 'left':
      return 'w-resize';
    case 'topLeft':
      return 'nw-resize';
    default:
      return 'auto';
  }
}

export default useElementResize;