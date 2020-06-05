import React from 'react';

function Book( props ){
    const { thumbnail, authors, title, snippet} = props
    return(
        <div>
            <h1>{title}</h1>
            <img src={thumbnail} />
            <h3>Authors:</h3>
            <ul>
                {authors && authors.map(a => <li key={a}>{a}</li>)}
            </ul>
            <p>{snippet}</p>
        </div>
    );
}

export default Book;