import React from 'react';

interface INums {
    a: number,
    b: number
}

export const MySum: React.FC<INums> = (props: INums) => {
    return (
        <div>
            {props.a + props.b}
        </div>
    )
}