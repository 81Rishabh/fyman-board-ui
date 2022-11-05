import React, { useState } from 'react'

function Tooltip({ idx, parentId, setdata, text,color, setcolor }) {
    const [list, setlist] = useState([
        {
            attr: 'UNDERSTOOD',
            text: 'UNDERSTOOD'
        },
        {
            attr: 'SOME-UNDERSTOOD',
            text: 'SOME UNDERSTOOD'
        },
        {
            attr: 'NOT-CLEAR',
            text: 'NOT CLEAR'
        },
        {
            attr: 'WHAT-RUBBISH',
            text: 'WHAT RUBBISH'
        },

    ])
    function setAppearance() {
        if (parentId != null && idx === parseInt(parentId)) {
            return {
                display: 'block',
            }
        }
        return { display: 'none' }
    }


    function setUnderstading(text, level) {
        let point = 0;
        let action;

        if (level === 'UNDERSTOOD') {
            point = 4;
            action = 'UNDERSTOOD';
            setcolor("rgb(24, 235, 24)");
        }
        else if (level === 'SOME UNDERSTOOD') {
            point = 3;
            action = 'SOME UNDERSTOOD';
            setcolor("rgb(231, 68, 9)");
        }
        else if (level === 'NOT CLEAR') {
            point = 2;
            action = 'NOT CLEAR';
            setcolor("rgb(12, 134, 186)");
        }
        else if (level === 'WHAT RUBBISH') {
            point = 1;
            action = 'WHAT RUBBISH';
            setcolor("rgb(255, 71, 71)");
        }
        else {
            point = 0;
        }

        let obj = { text: text, point: point, action: action };
        setdata({ ...obj });
    }
   
    function handleAction(e  , item) {
        setUnderstading(text, item.text);
        console.log(color);
        e.target.parentElement.parentElement.parentElement.lastChild.style.border =  `1px solid ${color}`;
        e.target.parentElement.parentElement.parentElement.lastChild.style.color =  `${color}`;
    }
    return (
        <div className="tooltip-container" style={setAppearance()}>
            <ul>
                {
                    list.map((item, idx) => {
                        return (
                            <li
                                data-attr={item.attr}
                                key={idx}
                                onClick={(e) => handleAction(e, item)}
                            >
                                {item.text}
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default Tooltip;