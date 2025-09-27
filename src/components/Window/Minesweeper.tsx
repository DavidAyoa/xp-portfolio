import React, { useReducer, useEffect, useState, useRef } from 'react';
import clsx from 'clsx';
import { WindowDropDowns } from './WindowDropDowns';

// Import all assets like winxp-example
import dead from '/minesweeper/dead.png';
import smile from '/minesweeper/smile.png';
import win from '/minesweeper/win.png';
import ohh from '/minesweeper/ohh.png';
import empty from '/minesweeper/empty.png';
import open1 from '/minesweeper/open1.png';
import open2 from '/minesweeper/open2.png';
import open3 from '/minesweeper/open3.png';
import open4 from '/minesweeper/open4.png';
import open5 from '/minesweeper/open5.png';
import open6 from '/minesweeper/open6.png';
import open7 from '/minesweeper/open7.png';
import open8 from '/minesweeper/open8.png';
import flag from '/minesweeper/flag.png';
import mine from '/minesweeper/mine-ceil.png';
import mineDeath from '/minesweeper/mine-death.png';
import misFlagged from '/minesweeper/misflagged.png';
import question from '/minesweeper/question.png';
import digit0 from '/minesweeper/digit0.png';
import digit1 from '/minesweeper/digit1.png';
import digit2 from '/minesweeper/digit2.png';
import digit3 from '/minesweeper/digit3.png';
import digit4 from '/minesweeper/digit4.png';
import digit5 from '/minesweeper/digit5.png';
import digit6 from '/minesweeper/digit6.png';
import digit7 from '/minesweeper/digit7.png';
import digit8 from '/minesweeper/digit8.png';
import digit9 from '/minesweeper/digit9.png';
import digit_ from '/minesweeper/digit-.png';

// Game configuration
const Config = {
  Beginner: {
    rows: 9,
    columns: 9,
    ceils: 81,
    mines: 10,
  },
  Intermediate: {
    rows: 16,
    columns: 16,
    ceils: 256,
    mines: 40,
  },
  Expert: {
    rows: 16,
    columns: 30,
    ceils: 480,
    mines: 99,
  },
};

// Types
type Difficulty = 'Beginner' | 'Intermediate' | 'Expert';
type Status = 'new' | 'started' | 'died' | 'won';
type CeilState = 'cover' | 'flag' | 'unknown' | 'open' | 'die' | 'misflagged' | 'mine';

interface Ceil {
  state: CeilState;
  minesAround: number;
  opening: boolean;
}

interface GameState {
  difficulty: Difficulty;
  status: Status;
  rows: number;
  columns: number;
  mines: number;
  ceils: Ceil[];
}

// Digit images mapping
const digits = [
  digit0,
  digit1,
  digit2,
  digit3,
  digit4,
  digit5,
  digit6,
  digit7,
  digit8,
  digit9,
];

// Utility functions
function renderDigits(number: number) {
  let numberStr: string;
  if (number < 0) {
    const _number = -number % 100;
    if (_number === 0) {
      numberStr = '00';
    } else if (_number < 10) {
      numberStr = '0' + _number;
    } else {
      numberStr = String(_number);
    }
    return (
      <>
        <img src={digit_} alt="-" />
        {numberStr.split('').map((n, i) => (
          <img src={digits[parseInt(n)]} key={i} alt={n} />
        ))}
      </>
    );
  }

  numberStr = number < 999 ? String(number) : '999';
  if (number < 10) numberStr = '00' + numberStr;
  else if (number < 100) numberStr = '0' + numberStr;
  return numberStr
    .split('')
    .map((n, i) => <img key={i} src={digits[parseInt(n)]} alt={n} />);
}

function getTextImg(index: number) {
  return [empty, open1, open2, open3, open4, open5, open6, open7, open8][index];
}

function sampleSize<T>(array: T[], size: number): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result.slice(0, size);
}

function getNearIndexes(index: number, rows: number, columns: number): number[] {
  if (index < 0 || index >= rows * columns) return [];
  const row = Math.floor(index / columns);
  const column = index % columns;
  return [
    index - columns - 1,
    index - columns,
    index - columns + 1,
    index - 1,
    index + 1,
    index + columns - 1,
    index + columns,
    index + columns + 1,
  ].filter((_, arrayIndex) => {
    if (row === 0 && arrayIndex < 3) return false;
    if (row === rows - 1 && arrayIndex > 4) return false;
    if (column === 0 && [0, 3, 5].includes(arrayIndex)) return false;
    if (column === columns - 1 && [2, 4, 7].includes(arrayIndex)) return false;
    return true;
  });
}

function getInitState(difficulty: Difficulty = 'Beginner'): GameState {
  return {
    difficulty,
    status: 'new',
    ...genGameConfig(Config[difficulty]),
  };
}

function genGameConfig(config: typeof Config.Beginner) {
  const { rows, columns, mines } = config;
  const ceils: Ceil[] = Array(rows * columns)
    .fill(null)
    .map(() => ({
      state: 'cover' as CeilState,
      minesAround: 0,
      opening: false,
    }));
  return {
    rows,
    columns,
    ceils,
    mines,
  };
}

function insertMines(config: typeof Config.Beginner & { exclude: number }, originCeils: Ceil[]) {
  const { rows, columns, mines, exclude } = config;
  const ceils = originCeils.map(ceil => ({ ...ceil }));
  if (rows * columns !== ceils.length)
    throw new Error('rows and columns not equal to ceils');
  const indexArray = [...Array(rows * columns).keys()];
  sampleSize(
    indexArray.filter(i => i !== exclude),
    mines,
  ).forEach(chosen => {
    ceils[chosen].minesAround = -10;
    getNearIndexes(chosen, rows, columns).forEach(nearIndex => {
      ceils[nearIndex].minesAround += 1;
    });
  });
  return {
    rows,
    columns,
    ceils,
    mines,
  };
}

function autoCeils(state: GameState, index: number): number[] {
  const { rows, columns } = state;
  const ceils = state.ceils.map(ceil => ({
    ...ceil,
    walked: false,
  }));

  function walkCeils(index: number): number[] {
    const ceil = ceils[index] as Ceil & { walked: boolean };
    if (ceil.walked || ceil.minesAround < 0 || ceil.state === 'flag') return [];
    ceil.walked = true;
    if (ceil.minesAround > 0) return [index];
    return [
      index,
      ...getNearIndexes(index, rows, columns).reduce(
        (lastIndexes, ceilIndex) => {
          return [...lastIndexes, ...walkCeils(ceilIndex)];
        },
        [] as number[],
      ),
    ];
  }

  return walkCeils(index);
}

// Dropdown menu data
function genDropDownData(difficulty: Difficulty) {
  const Game = [
    { type: 'item' as const, text: 'New', hotkey: 'F2' },
    { type: 'separator' as const },
    { type: 'item' as const, text: 'Beginner', symbol: difficulty === 'Beginner' ? 'check' : undefined },
    { type: 'item' as const, text: 'Intermediate', symbol: difficulty === 'Intermediate' ? 'check' : undefined },
    { type: 'item' as const, text: 'Expert', symbol: difficulty === 'Expert' ? 'check' : undefined },
    { type: 'item' as const, text: 'Custom...', disable: true },
    { type: 'separator' as const },
    { type: 'item' as const, text: 'Marks (?)', symbol: 'check' },
    { type: 'item' as const, text: 'Color', symbol: 'check' },
    { type: 'item' as const, text: 'Sound', disable: true },
    { type: 'separator' as const },
    { type: 'item' as const, text: 'Best Times...', disable: true },
    { type: 'separator' as const },
    { type: 'item' as const, text: 'Exit' },
  ];

  const Help = [
    { type: 'item' as const, text: 'Contents', hotkey: 'F1', disable: true },
    { type: 'item' as const, text: 'Search for Help on...', disable: true },
    { type: 'item' as const, text: 'Using Help', disable: true },
    { type: 'separator' as const },
    { type: 'item' as const, text: 'About Minesweeper', disable: true },
  ];

  return { Game, Help };
}

// Timer hook
function useTimer(status: Status) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    switch (status) {
      case 'started':
        timer = setInterval(() => setSeconds(sec => sec + 1), 1000);
        break;
      case 'new':
        setSeconds(0);
        break;
      default:
        break;
    }
    return () => clearInterval(timer);
  }, [status]);

  return seconds;
}

// Reducer
type GameAction =
  | { type: 'CLEAR_MAP'; payload?: Difficulty }
  | { type: 'START_GAME'; payload: number }
  | { type: 'OPEN_CEIL'; payload: number }
  | { type: 'CHANGE_CEIL_STATE'; payload: number }
  | { type: 'GAME_OVER'; payload: number }
  | { type: 'WON' }
  | { type: 'OPENING_CEIL'; payload: number }
  | { type: 'OPENING_CEILS'; payload: number };

function reducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'CLEAR_MAP':
      const difficulty = action.payload || state.difficulty;
      return getInitState(difficulty);
    case 'START_GAME':
      const exclude = action.payload;
      return {
        ...state,
        ...insertMines({ ...Config[state.difficulty], exclude }, state.ceils),
        status: 'started',
      };
    case 'OPEN_CEIL': {
      const indexes = autoCeils(state, action.payload);
      const ceils = [...state.ceils];
      indexes.forEach(i => {
        const ceil = ceils[i];
        ceils[i] = { ...ceil, state: 'open' };
      });
      return {
        ...state,
        ceils,
      };
    }
    case 'CHANGE_CEIL_STATE': {
      const index = action.payload;
      const ceils = [...state.ceils];
      const ceil = state.ceils[index];
      let newState: CeilState;
      switch (ceil.state) {
        case 'cover':
          newState = 'flag';
          break;
        case 'flag':
          newState = 'unknown';
          break;
        case 'unknown':
          newState = 'cover';
          break;
        default:
          throw new Error(`Unknown ceil state ${ceil.state}`);
      }
      ceils[index] = { ...ceil, state: newState };
      return {
        ...state,
        ceils,
      };
    }
    case 'GAME_OVER': {
      const ceils = state.ceils.map(ceil => {
        if (ceil.minesAround < 0 && ceil.state !== 'flag') {
          return {
            ...ceil,
            state: 'mine' as CeilState,
          };
        } else if (ceil.state === 'flag' && ceil.minesAround >= 0) {
          return {
            ...ceil,
            state: 'misflagged' as CeilState,
          };
        } else {
          return {
            ...ceil,
            opening: false,
          };
        }
      });
      ceils[action.payload].state = 'die';
      return {
        ...state,
        status: 'died',
        ceils,
      };
    }
    case 'WON': {
      const ceils = state.ceils.map(ceil => {
        if (ceil.minesAround >= 0) {
          return {
            ...ceil,
            state: 'open' as CeilState,
          };
        } else {
          return {
            ...ceil,
            state: 'flag' as CeilState,
          };
        }
      });
      return {
        ...state,
        status: 'won',
        ceils,
      };
    }
    case 'OPENING_CEIL': {
      const ceil = state.ceils[action.payload];
      const ceils = state.ceils.map(ceil => ({
        ...ceil,
        opening: false,
      }));
      ceils[action.payload] = { ...ceil, opening: true };
      return {
        ...state,
        ceils,
      };
    }
    case 'OPENING_CEILS': {
      const indexes = getNearIndexes(action.payload, state.rows, state.columns);
      const ceils = state.ceils.map(ceil => ({
        ...ceil,
        opening: false,
      }));
      [...indexes, action.payload].forEach(index => {
        const ceil = { ...ceils[index] };
        ceil.opening = true;
        ceils[index] = ceil;
      });
      return {
        ...state,
        ceils,
      };
    }
    default:
      return state;
  }
}

// Cell components - exactly like winxp-example
const CeilBackgroundCover: React.FC = () => (
  <div className="absolute w-4 h-4 border-l-[2px] border-t-[2px] border-r-[2px] border-b-[2px] border-l-[rgb(245,245,245)] border-t-[rgb(245,245,245)] border-r-[rgb(128,128,128)] border-b-[rgb(128,128,128)]" />
);

const CeilBackgroundOpen: React.FC = () => (
  <div className="absolute w-4 h-4 border-l border-t border-l-[rgb(128,128,128)] border-t-[rgb(128,128,128)]" />
);

const Die: React.FC = () => (
  <>
    <CeilBackgroundOpen />
    <img alt="death" src={mineDeath} className="absolute w-4 h-4 pointer-events-none" />
  </>
);

const MisFlagged: React.FC = () => (
  <>
    <CeilBackgroundOpen />
    <img alt="misFlagged" src={misFlagged} className="absolute w-4 h-4 pointer-events-none" />
  </>
);

const Flag: React.FC = () => (
  <>
    <CeilBackgroundCover />
    <img alt="flag" src={flag} className="absolute w-4 h-4 pointer-events-none" />
  </>
);

const MinesAround: React.FC<{ mines: number }> = ({ mines }) => (
  <>
    <CeilBackgroundOpen />
    <img alt="mines-around" src={getTextImg(mines)} className="absolute w-4 h-4 pointer-events-none" />
  </>
);

const Question: React.FC = () => (
  <>
    <CeilBackgroundCover />
    <img alt="question" src={question} className="absolute w-4 h-4 pointer-events-none" />
  </>
);

const QuestionOpen: React.FC = () => (
  <>
    <CeilBackgroundOpen />
    <img alt="question" src={question} className="absolute w-4 h-4 pointer-events-none" />
  </>
);

const Mine: React.FC = () => (
  <>
    <CeilBackgroundOpen />
    <img alt="mine" src={mine} className="absolute w-4 h-4 pointer-events-none" />
  </>
);

// Ceils component
function Ceils({ ceils }: { ceils: Ceil[] }) {
  function renderContent(ceil: Ceil) {
    const { state, minesAround, opening } = ceil;
    switch (state) {
      case 'open':
        return <MinesAround mines={minesAround} />;
      case 'flag':
        return <Flag />;
      case 'misflagged':
        return <MisFlagged />;
      case 'mine':
        return <Mine />;
      case 'die':
        return <Die />;
      case 'unknown':
        return opening ? <QuestionOpen /> : <Question />;
      default:
        return opening ? <CeilBackgroundOpen /> : <CeilBackgroundCover />;
    }
  }

  return ceils.map((ceil, index) => (
    <div key={index} className="relative">
      {renderContent(ceil)}
    </div>
  ));
}

// PRESENTATION COMPONENT - exactly like winxp-example
function MineSweeperView({
  ceils,
  changeCeilState,
  onReset,
  openCeil,
  openCeils,
  mines,
  status,
  seconds,
  onClose,
  difficulty,
  openingCeil,
  openingCeils,
  columns,
  rows,
}: {
  ceils: Ceil[];
  changeCeilState: (index: number) => void;
  onReset: (difficulty?: Difficulty) => void;
  openCeil: (index: number) => void;
  openCeils: (index: number) => void;
  mines: number;
  status: Status;
  seconds: number;
  onClose?: () => void;
  difficulty: Difficulty;
  openingCeil: (index: number) => void;
  openingCeils: (index: number) => void;
  columns: number;
  rows: number;
}) {
  const face = useRef<HTMLButtonElement>(null);
  const [mouseDownContent, setMouseDownContent] = useState(false);
  const [openBehavior, setOpenBehavior] = useState({ index: -1, behavior: '' });

  function remainMines() {
    return (
      mines -
      ceils.filter(ceil => ceil.state === 'flag' || ceil.state === 'misflagged').length
    );
  }

  function statusFace() {
    if (mouseDownContent) return <img alt="ohh" src={ohh} />;
    switch (status) {
      case 'died':
        return <img alt="dead" src={dead} />;
      case 'won':
        return <img alt="win" src={win} />;
      default:
        return <img alt="smile" src={smile} />;
    }
  }

  function onMouseDownContent(e: React.MouseEvent) {
    if (e.button !== 0) return;
    if (
      face.current?.contains(e.target as Node) ||
      status === 'won' ||
      status === 'died'
    )
      return;
    setMouseDownContent(true);
  }

  useEffect(() => {
    const { index, behavior } = openBehavior;
    switch (behavior) {
      case 'single':
        return openingCeil(index);
      case 'multi':
        return openingCeils(index);
      default:
        openingCeil(-1);
    }
  }, [openBehavior.index, openBehavior.behavior]);

  function onMouseDownCeils(e: React.MouseEvent) {
    const target = e.target as HTMLElement;
    const ceilElement = target.closest('.mine__ceil');
    const parent = e.currentTarget;
    const index = ceilElement ? Array.prototype.indexOf.call(parent.children, ceilElement) : -1;

    if (e.button === 2 && e.buttons === 2 && index !== -1) {
      changeCeilState(index);
    } else if (e.button === 0 && e.buttons === 1) {
      setOpenBehavior({
        index,
        behavior: 'single',
      });
    } else if (e.buttons === 3) {
      setOpenBehavior({
        index,
        behavior: 'multi',
      });
    }
  }

  function onMouseOverCeils(e: React.MouseEvent) {
    const target = e.target as HTMLElement;
    const ceilElement = target.closest('.mine__ceil');
    const parent = e.currentTarget;
    const index = ceilElement ? Array.prototype.indexOf.call(parent.children, ceilElement) : -1;

    setOpenBehavior({
      index,
      behavior: openBehavior.behavior,
    });
  }

  function onMouseUpCeils() {
    const { behavior, index } = openBehavior;
    if (index === -1) return;
    if (behavior === 'single') {
      openCeil(index);
    } else if (behavior === 'multi') {
      openCeils(index);
    }
  }

  function onClickOptionItem(item: string) {
    switch (item) {
      case 'Exit':
        onClose?.();
        break;
      case 'Beginner':
      case 'Intermediate':
      case 'Expert':
        onReset(item as Difficulty);
        break;
      case 'New':
        onReset();
        break;
      default:
    }
  }

  useEffect(() => {
    function onMouseUp() {
      setOpenBehavior({ index: -1, behavior: '' });
      setMouseDownContent(false);
    }

    window.addEventListener('mouseup', onMouseUp);
    return () => {
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, []);

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${columns}, 16px)`,
    gridTemplateRows: `repeat(${rows}, 16px)`,
  };

  // Tight calculations matching winxp-example exactly
  const gridWidth = columns * 16; // mine field cells
  const gridHeight = rows * 16; // mine field cells
  const contentWidth = gridWidth + 6; // grid + 3px borders left/right
  const contentHeight = 34 + 5 + gridHeight + 6; // score bar + margin + grid + borders
  const totalWidth = contentWidth + 10; // content + minimal padding
  const totalHeight = 20 + contentHeight; // header(20px) + content

  return (
    <div
      className="block relative overflow-visible bg-[rgb(192,192,192)]"
      style={{ width: `${totalWidth}px`, height: `${totalHeight}px` }}
      onContextMenu={e => e.preventDefault()}
    >
      {/* Compact header - 20px height */}
      <div className="w-full h-5 bg-[rgb(236,233,216)] flex-shrink-0">
        <WindowDropDowns
          items={genDropDownData(difficulty)}
          onClickItem={onClickOptionItem}
        />
      </div>

      {/* Main content area - tight spacing */}
      <div
        className="border-l-[3px] border-t-[3px] border-l-[rgb(245,245,245)] border-t-[rgb(245,245,245)] bg-[rgb(192,192,192)] p-[5px]"
        style={{ width: `${contentWidth}px`, height: `${contentHeight}px` }}
        onMouseDown={onMouseDownContent}
      >
        {/* Compact score bar */}
        <div className="h-[34px] border-[2px] border-t-[rgb(128,128,128)] border-l-[rgb(128,128,128)] border-r-[rgb(245,245,245)] border-b-[rgb(245,245,245)] mb-1 flex items-center justify-between px-2">
          {/* Mine counter */}
          <div className="w-10 h-6 border border-gray-600 bg-black flex items-center justify-center text-center">
            {renderDigits(remainMines())}
          </div>
          {/* Face button */}
          <button
            ref={face}
            className="w-6 h-6 bg-[rgb(192,192,192)] border-[2px] border-[rgb(245,245,245)] border-r-[rgb(128,128,128)] border-b-[rgb(128,128,128)] flex items-center justify-center outline-none active:border active:border-[rgb(128,128,128)] active:[&>img]:translate-x-px active:[&>img]:translate-y-px active:[&>img:first-child]:hidden active:[&>img:last-child]:block [&>img:last-child]:hidden"
            onClick={() => onReset()}
          >
            {statusFace()}
            <img alt="smile" src={smile} className="pointer-events-none" />
          </button>
          {/* Timer */}
          <div className="w-10 h-6 border border-gray-600 bg-black flex items-center justify-center text-center">
            {renderDigits(seconds)}
          </div>
        </div>

        {/* Mine field - fills remaining space */}
        <div
          className="border-[3px] border-t-[rgb(128,128,128)] border-l-[rgb(128,128,128)] border-r-[rgb(245,245,245)] border-b-[rgb(245,245,245)]"
          style={gridStyle}
          onMouseDown={onMouseDownCeils}
          onMouseOver={onMouseOverCeils}
          onMouseUp={onMouseUpCeils}
        >
          <Ceils ceils={ceils} />
        </div>
      </div>
    </div>
  );
}

// CONTAINER COMPONENT - exactly like winxp-example
function MineSweeper({ defaultDifficulty, onClose }: { defaultDifficulty?: Difficulty; onClose?: () => void }) {
  const [state, dispatch] = useReducer(
    reducer,
    getInitState(defaultDifficulty),
  );
  const seconds = useTimer(state.status);

  function changeCeilState(index: number) {
    const ceil = state.ceils[index];
    if (ceil.state === 'open' || ['won', 'died'].includes(state.status)) return;
    dispatch({ type: 'CHANGE_CEIL_STATE', payload: index });
  }

  function openCeil(index: number) {
    switch (state.status) {
      case 'new':
        dispatch({ type: 'START_GAME', payload: index });
        dispatch({ type: 'OPEN_CEIL', payload: index });
        break;
      case 'started':
        const ceil = state.ceils[index];
        if (['flag', 'open'].includes(ceil.state)) {
          break;
        } else if (ceil.minesAround < 0) {
          dispatch({ type: 'GAME_OVER', payload: index });
        } else {
          dispatch({ type: 'OPEN_CEIL', payload: index });
        }
        break;
      default:
    }
  }

  function openCeils(index: number) {
    const ceil = state.ceils[index];
    if (
      ceil.state !== 'open' ||
      ceil.minesAround <= 0 ||
      state.status !== 'started'
    )
      return;
    const indexes = getNearIndexes(index, state.rows, state.columns);
    const nearCeils = indexes.map(i => state.ceils[i]);
    if (
      nearCeils.filter(ceil => ceil.state === 'flag').length !==
      ceil.minesAround
    )
      return;
    const mineIndex = indexes.find(
      i => state.ceils[i].minesAround < 0 && state.ceils[i].state !== 'flag',
    );
    if (mineIndex !== undefined) {
      dispatch({ type: 'GAME_OVER', payload: mineIndex });
    } else {
      indexes.forEach(i => dispatch({ type: 'OPEN_CEIL', payload: i }));
    }
  }

  useEffect(() => {
    if (state.status === 'started' && checkRemains() === 0) {
      dispatch({ type: 'WON' });
    }
  });

  function onReset(difficulty?: Difficulty) {
    dispatch({ type: 'CLEAR_MAP', payload: difficulty });
  }

  function checkRemains() {
    const safeCeils = state.ceils
      .filter(ceil => ceil.state !== 'open')
      .filter(ceil => ceil.minesAround >= 0);
    return safeCeils.length;
  }

  function openingCeil(index: number) {
    if (['died', 'won'].includes(state.status)) return;
    dispatch({ type: 'OPENING_CEIL', payload: index });
  }

  function openingCeils(index: number) {
    if (['died', 'won'].includes(state.status)) return;
    dispatch({ type: 'OPENING_CEILS', payload: index });
  }

  return (
    <MineSweeperView
      {...state}
      onClose={onClose}
      changeCeilState={changeCeilState}
      openCeil={openCeil}
      openCeils={openCeils}
      onReset={onReset}
      seconds={seconds}
      openingCeil={openingCeil}
      openingCeils={openingCeils}
    />
  );
}

export default MineSweeper;