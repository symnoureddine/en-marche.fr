import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

function TextArea(props) {
    return (
        <div className="text-area">
            <div className="text-area__input-wrapper">
                <textarea
                    className={classNames('text-area__input', {
                        'text-area__input--error': props.error,
                    })}
                    disabled={props.disabled}
                    id={props.id}
                    maxLength={props.maxlength}
                    name={props.name}
                    onChange={(e) => {
                        const { value } = e.target;
                        if (!props.maxLength || (props.maxLength && value.length <= props.maxLength)) {
                            props.onChange(e.target.value);
                        }
                    }}
                    placeholder={props.placeholder}
                    value={props.value}
                    autoFocus={props.autofocus}
                >
                    {props.value}
                </textarea>
                {props.maxLength && (
                    <div className="text-area__counter">{`${props.value.length}/${props.maxLength}`}</div>
                )}
            </div>
            {props.error && <p className="text-area__error">{props.error}</p>}
        </div>
    );
}

TextArea.defaultProps = {
    id: '',
    disabled: false,
    maxLength: undefined,
    placeholder: '',
    autofocus: false,
    value: '',
    name: '',
    error: '',
};

TextArea.propTypes = {
    id: PropTypes.string,
    maxLength: PropTypes.number,
    name: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    autofocus: PropTypes.bool,
    value: PropTypes.string,
    error: PropTypes.string,
};

export default TextArea;
