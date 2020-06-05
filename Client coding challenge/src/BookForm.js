import React, { useRef } from 'react'

function BookForm( props ){
    const inputRef = useRef()
    return (
        <div>
            <form onSubmit={ev => {
                ev.preventDefault()
                props.onSearch(inputRef.current.value)
            }}>
                <label>
                    Name of the book:
                    <input ref={inputRef} />
                </label>
                <button>Submit</button>
            </form>
        </div>
    );
}

export default BookForm;