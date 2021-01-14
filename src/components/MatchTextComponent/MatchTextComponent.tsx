import React from 'react';

interface MatchTextComponentProps extends React.HTMLAttributes<any> {
  /** the component to use as the root component */
  use: 'p' | 'span';

  /** needles to look for */
  needles: string[];

  /** this is where needles are searched for */
  haystack: string;
}

/**
 * This component is meant to highlight the first needle in props.needles found
 * in props.haystack. Other needles that match will not be highlighted.
 *
 * Note that you may override the highlight styles by defining the css
 * class 'match-text-highlight'
 */
const MatchTextComponent: React.FC<MatchTextComponentProps> = (props) => {
  const haystack = props.haystack;
  let tokens: (string | JSX.Element)[] = [ haystack ];

  for (let i = 0; i < props.needles.length; i++) {
    const needle = props.needles[i].toLowerCase();
    const targetIndex = haystack.toLowerCase().indexOf(needle);

    if (targetIndex !== -1) {
      tokens = [
        haystack.substring(0, targetIndex),
        <strong key={ 0 } className='match-text-highlight'>
          { haystack.substring(targetIndex, targetIndex + needle.length) }
        </strong>,
        haystack.substring(targetIndex + needle.length)
      ];
      break;
    }
  }

  return React.createElement(props.use, props, (<>{ tokens }</>));
};

export default MatchTextComponent;